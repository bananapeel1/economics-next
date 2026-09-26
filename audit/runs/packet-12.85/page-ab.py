"""Packet 12.85, E072: the 31 model-answer pages other than 1.3.5 change ONLY by E071's removals.
Rendered HTML of every page, before (HEAD's code) and after (this packet), from two dev servers on two
copies of the tree. Scripts other than JSON-LD are dropped (build hashes and the RSC payload differ by
construction; the payload carries the same markup). The rest is tokenised at tag boundaries and diffed.
Every differing hunk must be one of E071's blocks: deleted material may carry only the classes of the
counts line, the method note, the coverage panel, the data-response card and the gradient CTA; inserted
material only the quiet link line that replaces the last two. Anything else is a violation.
usage: python3 page-ab.py <before-dir> <after-dir>"""
import re, sys, glob, os, difflib, json
ALLOWED_DEL = re.compile(r'^(lab-counts|lab-note|lab-coverage[\w-]*|lab-dr-[\w-]+|lab-block|lab-block-head|seo-cta[\w-]*)$')
ALLOWED_INS = re.compile(r'^(lab-quiet-link)$')
def toks(f):
    s = open(f).read()
    b = s[s.index('<body'):s.rindex('</body>')]
    b = re.sub(r'<script(?![^>]*application/ld\+json)[^>]*>.*?</script>', '', b, flags=re.S)
    b = re.sub(r'<!-- -->', '', b)
    b = re.sub(r'<link[^>]*>', '', b)
    return [t for t in re.split(r'(?=<)|(?<=>)', b) if t.strip()]
def classes(ts):
    out = set()
    for t in ts:
        for c in re.findall(r'class="([^"]*)"', t): out.update(c.split())
    return out
def text(ts): return ' '.join(t.strip() for t in ts if not t.startswith('<'))[:160]
report = {}; bad = 0
for bf in sorted(glob.glob(os.path.join(sys.argv[1], '*.html'))):
    name = os.path.basename(bf)
    if 'market-failure-model-answers' in name: continue
    a, b = toks(bf), toks(os.path.join(sys.argv[2], name))
    hunks = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op == 'equal': continue
        d, n = a[i1:i2], b[j1:j2]
        dc, nc = classes(d), classes(n)
        # the coverage panel's own inner classes count as the panel only inside a hunk that removes the panel
        inner = {'lab-details', 'lab-leaf-list'} if 'lab-coverage' in dc else set()
        ok = all(ALLOWED_DEL.match(c) or c in inner for c in dc) and all(ALLOWED_INS.match(c) for c in nc)
        # a hunk with no class at all is bare text or bare tags; it must sit inside an allowed block, which
        # the neighbouring tokens show: require its deleted text to be E071 copy
        # a hunk of closing tags alone is the diff re-aligning block ends around a removal
        if not dc and not nc and all(re.match(r'^</\w+>$', t.strip()) for t in d + n):
            ok = True
        elif not dc and not nc:
            ok = bool(re.search(r'written question|Time estimates|examines|requirement|Now try one|Practise .* in the app|Data response|KAA\+E|Open .* in the Revvy Learn app|Data response:', text(d) + ' ' + text(n)))
        hunks.append({'ok': ok, 'deleted_classes': sorted(dc), 'inserted_classes': sorted(nc), 'deleted_text': text(d), 'inserted_text': text(n)})
    viol = [h for h in hunks if not h['ok']]
    bad += bool(viol)
    report[name] = {'hunks': len(hunks), 'violations': viol, 'deleted_blocks': sorted({c for h in hunks for c in h['deleted_classes'] if c in ('lab-counts','lab-note','lab-coverage','lab-dr-card','seo-cta')}), 'inserted': sorted({c for h in hunks for c in h['inserted_classes']})}
    print(f"{name:62} hunks {len(hunks):2}  removed {','.join(report[name]['deleted_blocks'])}  added {','.join(report[name]['inserted'])}  {'OK' if not viol else 'VIOLATION'}")
print(f'pages compared: {len(report)}, pages with a difference outside E071: {bad}')
json.dump(report, open(os.path.join(os.path.dirname(__file__), 'page-ab.json'), 'w'), indent=1)
