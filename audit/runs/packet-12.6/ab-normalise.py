import re,sys,os,hashlib
# Strictest run. KEEPS the whole RSC flight payload (a serialized copy of the tree and every prop
# the component was handed). Removes exactly two things, each proven below to be per-REQUEST or
# per-BUILD noise and not content:
#   1. Turbopack chunk filenames (a build hash)
#   2. self.__next_r="<21-char id>" — Next's per-request id, different on two curls of the SAME
#      unchanged page (control at the bottom of validator-ab.md)
def norm(p):
    t=open(p,encoding='utf8').read()
    t=re.sub(r'static/chunks/[A-Za-z0-9_%\.\-\[\]~]+\.(js|css)','CHUNK',t)
    t=re.sub(r'self\.__next_r="[^"]+"','self.__next_r="REQID"',t)
    return t
a,b=sys.argv[1],sys.argv[2]
bad=0
for f in sorted(os.listdir(a)):
    x,y=norm(os.path.join(a,f)),norm(os.path.join(b,f))
    same=x==y
    print(('IDENTICAL' if same else 'DIFFERS  '),f,len(x),len(y),hashlib.sha256(x.encode()).hexdigest()[:16],hashlib.sha256(y.encode()).hexdigest()[:16])
    if not same and 'market-failure' not in f:
        bad+=1
        i=next((k for k in range(min(len(x),len(y))) if x[k]!=y[k]), min(len(x),len(y)))
        print('   at',i,'before:',repr(x[max(0,i-150):i+150]))
        print('   at',i,'after :',repr(y[max(0,i-150):i+150]))
print('other-page differences:',bad)
