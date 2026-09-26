import re,sys,os,hashlib
# Third pass, a different question again: what a STUDENT sees. All markup and all scripts removed,
# leaving the visible text of the served page.
def txt(p):
    t=open(p,encoding='utf8').read()
    t=re.sub(r'<script[^>]*>.*?</script>','',t,flags=re.S)
    t=re.sub(r'<style[^>]*>.*?</style>','',t,flags=re.S)
    t=re.sub(r'<!--.*?-->','',t,flags=re.S)
    t=re.sub(r'<[^>]+>',' ',t)
    return re.sub(r'\s+',' ',t).strip()
a,b=sys.argv[1],sys.argv[2]
bad=0
for f in sorted(os.listdir(a)):
    x,y=txt(os.path.join(a,f)),txt(os.path.join(b,f))
    same=x==y
    print(('SAME-TEXT' if same else 'TEXT-DIFF'),f,len(x),len(y),hashlib.sha256(x.encode()).hexdigest()[:16])
    if not same and 'market-failure' not in f:
        bad+=1
        i=next((k for k in range(min(len(x),len(y))) if x[k]!=y[k]), min(len(x),len(y)))
        print('   before:',repr(x[max(0,i-140):i+140]))
        print('   after :',repr(y[max(0,i-140):i+140]))
print('other-page visible-text differences:',bad)
