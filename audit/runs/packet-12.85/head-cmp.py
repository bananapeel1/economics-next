import re,sys,glob,os
def parts(f):
    s=open(f).read()
    ld=re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>',s,re.S)
    title=re.findall(r'<title>(.*?)</title>',s,re.S)
    canon=re.findall(r'<link rel="canonical"[^>]*>',s)
    desc=re.findall(r'<meta name="description"[^>]*>',s)
    og=re.findall(r'<meta property="og:[^"]*"[^>]*>',s)
    return dict(ld=ld,title=title,canon=canon,desc=desc,og=og)
bad=0
for b in sorted(glob.glob(sys.argv[1]+'/*.html')):
    a=os.path.join(sys.argv[2],os.path.basename(b))
    if not os.path.exists(a): print('MISSING',a); bad+=1; continue
    pb,pa=parts(b),parts(a)
    diffs=[k for k in pb if pb[k]!=pa[k]]
    print(os.path.basename(b).ljust(62), 'ld-blocks',len(pb['ld']), 'IDENTICAL' if not diffs else 'DIFF '+','.join(diffs))
    bad+=bool(diffs)
print('pages with a head/JSON-LD difference:',bad)
