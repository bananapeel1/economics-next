import re,sys,os,hashlib
def norm(p):
    t=open(p,encoding='utf8').read()
    t=re.sub(r'<script[^>]*>.*?</script>','',t,flags=re.S)   # RSC flight payload + dev chunk urls
    t=re.sub(r'<script[^>]*/?>','',t)
    t=re.sub(r'/_next/static/[^"\']+','',t)                  # dev chunk hashes in link/preload
    t=re.sub(r'\s+',' ',t).strip()
    return t
a,b=sys.argv[1],sys.argv[2]
bad=0
for f in sorted(os.listdir(a)):
    x,y=norm(os.path.join(a,f)),norm(os.path.join(b,f))
    same = x==y
    print(('IDENTICAL' if same else 'DIFFERS  '), f, len(x), len(y), hashlib.sha256(x.encode()).hexdigest()[:12], hashlib.sha256(y.encode()).hexdigest()[:12])
    if not same and 'market-failure' not in f:
        bad+=1
        # first divergence
        i=next((k for k in range(min(len(x),len(y))) if x[k]!=y[k]), min(len(x),len(y)))
        print('   before:', repr(x[max(0,i-120):i+120]))
        print('   after :', repr(y[max(0,i-120):i+120]))
print('other-page differences:',bad)
