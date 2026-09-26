# Verify B (E053): visible-text A/B, a different comparer from e053/compare.mjs (which diffs markup).
# BEFORE = e053/before/*.html (b1942fe render); AFTER = curl of restarted remediation-dev :3001 ?draft=1.
# Text nodes outside script/style/template/noscript, whitespace-collapsed, one line per node.
import sys, os, difflib, html.parser
SKIP = {'script','style','template','noscript'}
class P(html.parser.HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.stack=[]; s.out=[]; s.mid=0; s.midtxt=[]
    def handle_starttag(s,t,a):
        a=dict(a)
        if t in ('br','img','meta','link','input','hr','source','wbr','path','circle','line','rect','polyline','polygon','use','ellipse'): return
        cls=a.get('class') or ''
        s.stack.append((t,'lab-details-midband' in cls))
    def handle_endtag(s,t):
        for i in range(len(s.stack)-1,-1,-1):
            if s.stack[i][0]==t: del s.stack[i:]; return
    def handle_data(s,d):
        if any(t in SKIP for t,_ in s.stack): return
        d=' '.join(d.split())
        if not d: return
        if any(m for _,m in s.stack): s.midtxt.append(d)
        s.out.append(('M ' if any(m for _,m in s.stack) else '  ')+d)
def parse(f):
    p=P(); p.feed(open(f,encoding='utf-8').read()); return p
root=sys.argv[1]; pages=[l.strip() for l in open(sys.argv[2]) if l.strip()]
tot={'same':0,'panel-only':0,'other':0}
for pg in pages:
    f=pg.replace('/','_')+'.html'
    if 'market-failure' in pg: print('skip  shell page', pg); continue
    b=parse(os.path.join(root,'e053/before',f)); a=parse(os.path.join(root,'verify-b-fix/curl',f))
    if b.out==a.out: tot['same']+=1; print('SAME  text identical (panel nodes before %d after %d)'%(len(b.midtxt),len(a.midtxt)), pg); continue
    d=[l for l in difflib.ndiff(b.out,a.out) if l[:2] in ('- ','+ ')]
    removed_panel=[l for l in d if l.startswith('- M ')]; other=[l for l in d if not l.startswith('- M ')]
    if not other and len(removed_panel)==len(b.midtxt) and not a.midtxt:
        tot['panel-only']+=1; print('DIFF  only the panel removed (%d text nodes, starts "%s")'%(len(removed_panel),removed_panel[0][4:60]), pg)
    else:
        tot['other']+=1; print('FAIL  %d other diffs'%len(other), pg); [print('      ',l[:140]) for l in other[:8]]
print('31 non-shell pages:', tot)
