import subprocess, json, hashlib, sys, os
V = os.path.dirname(os.path.abspath(__file__)); C = V + '/cur'
MD = C + '/content/data-response/econ-u1-market-failure.md'
DATA = C + '/data/modelAnswersData.js'
md0 = open(MD).read(); data0 = open(DATA).read()
sha = lambda s: hashlib.sha256(s.encode()).hexdigest()[:10]
def run():
    p = subprocess.run(['node', 'audit/scripts/validate-model-answers.mjs', '--json'], cwd=C, capture_output=True, text=True)
    j = json.loads(p.stdout); return p.returncode, j['findings']
def summ(fs):
    from collections import Counter
    c = Counter((f['rule'] + (('(' + f['detail'][1] + ')') if f['rule'] == 'R13' and f['detail'].startswith('(') else '')) for f in fs)
    return ' '.join(f'{k}x{v}' for k, v in sorted(c.items())) or '0'
def md_case(name, new, expect):
    assert new != md0, name
    open(MD, 'w').write(new); rc, fs = run(); open(MD, 'w').write(md0)
    ok = (expect is None and not fs) or (expect is not None and any(expect in (f['rule'] + f['detail'][:3]) for f in fs))
    print(f'| {name} | md {sha(new)} | {summ(fs)} | {"PASS" if ok else "**MISS**"} | {(fs[0]["detail"][:110] if fs else "")} |'); sys.stdout.flush()
def bank_case(name, js, expect):
    new = data0 + '\n;(() => { const xs = MODEL_ANSWERS; ' + js + ' })();\n'
    open(DATA, 'w').write(new); rc, fs = run(); open(DATA, 'w').write(data0)
    ok = (expect is None and not fs) or (expect is not None and any(expect in (f['rule'] + f['detail'][:3]) for f in fs))
    print(f'| {name} | bank {sha(new)} | {summ(fs)} | {"PASS" if ok else "**MISS**"} | {(fs[0]["detail"][:110] if fs else "")} |'); sys.stdout.flush()
def ins_before(anchor, text, s=None):
    s = s or md0; assert s.count(anchor) >= 1, anchor; return s.replace(anchor, text + anchor, 1)
MA = '## Model Answers'; CM = '## Common Mistakes'; DR = '## Diagram Reference'
TASK = 'Evaluate whether a sugar-content tax would beat the 50% excise.'
print('| # | mutation | applied | findings | verdict | first finding |'); print('|---|---|---|---|---|---|')
rc, fs = run(); print(f'| K0 | control, unmutated clone | - | {summ(fs)} | {"PASS" if not fs else "**MISS**"} | |')
md_case('a1 "## Questions" block restored with a (f) (20 marks) line', ins_before(MA, f'## Questions\n\n**Question (f) (20 marks)** — {TASK}\n\n'), 'R13(a)')
md_case('a2 setext "Questions\\n---" before Model Answers', ins_before(MA, f'Questions\n---------\n\n**(f) (20 marks)** {TASK}\n\n'), 'R13(a)')
md_case('a3 "##   QUESTIONS  ##" (closing hashes, caps)', ins_before(MA, '##   QUESTIONS  ##\n\n'), 'R13(a)')
md_case('b1 "## Further practice" before Common Mistakes, a (20 marks) task', ins_before(CM, f'## Further practice\n\n{TASK} (20 marks)\n\n'), 'R13(b)')
md_case('b2 heading inside a blockquote "> ## Extension (20 marks)"', ins_before(CM, f'> ## Extension (20 marks)\n> {TASK}\n\n'), 'R13(b)')
md_case('b3 heading inside a list item "- ## Extension (20 marks)"', ins_before(CM, f'- ## Extension (20 marks)\n\n'), 'R13(b)')
md_case('b4 "## Stimulus" repeated at the end', md0.rstrip('\n') + f'\n\n## Stimulus\n\n{TASK}\n', 'R13(b)')
md_case('b5 "## Common mistakes" renamed (case)', md0.replace('## Common Mistakes', '## Common mistakes', 1), 'R13(b)')
md_case('b6 H3 "### Question (f) (20 marks)" inside Stimulus', ins_before(MA, f'### Question (f) (20 marks)\n\n{TASK}\n\n'), 'R13(b)')
md_case('b7 H2 in Diagram Reference position "## Task 6"', md0.rstrip('\n') + '\n\n## Task 6\n', 'R13(b)')
md_case('b8 H5 "##### Extension (20 marks)" inside Common Mistakes', ins_before(DR, '##### Extension (20 marks)\n\n'), 'R13(b)')
md_case('bn no-fire: "## Extension" inside a ~~~ fence', ins_before(CM, '~~~\n## Extension (20 marks)\n~~~\n\n'), None)
md_case('bn2 no-fire: "\\## Extension" backslash-escaped (renders as text)', ins_before(CM, '\\## Extension\n\n'), None)
md_case('c1 extra "### Question (f) (20 marks)" at end of Model Answers', ins_before(CM, f'### Question (f) (20 marks)\n\nModel answer.\n\n'), 'R13(c)')
md_case('c2 (d) heading tariff 8 -> 10', md0.replace('### Question (d) (8 marks)', '### Question (d) (10 marks)', 1), 'R13(c)')
md_case('c3 (a) heading removed', md0.replace('### Question (a) (2 marks)\n', '', 1), 'R13(c)')
md_case('c4 (a)/(b) heading letters swapped', md0.replace('### Question (a) (2 marks)', '### Question (X)', 1).replace('### Question (b) (4 marks)', '### Question (a) (2 marks)', 1).replace('### Question (X)', '### Question (b) (4 marks)', 1), 'R13(c)')
md_case('c5 "### Question (F) (20 marks)" upper-case letter', ins_before(CM, '### Question (F) (20 marks)\n\n'), 'R13(c)')
md_case('c6 "#### Extension (20 marks)" inside (e)\'s answer', ins_before(CM, '#### Extension (20 marks)\n\n'), 'R13(c)')
md_case('c7 (e) heading "### Question (e) (14 marks) and (f) (6 marks)"', md0.replace('### Question (e) (14 marks)', '### Question (e) (14 marks) and (f) (6 marks)', 1), 'R13(c)')
md_case('c8 "### Question (c) (6 marks)" duplicated', ins_before(CM, '### Question (c) (6 marks)\n\n'), 'R13(c)')
md_case('c9 setext-free: "### Question (b) (4 marks)" -> "### Question (b) (4 _marks_)"', md0.replace('### Question (b) (4 marks)', '### Question (b) (4 _marks_)', 1), None)
md_case('R residual: free-prose (f) task inside Common Mistakes', ins_before(DR, f'**Question (f) (20 marks)** — {TASK}\n\n'), None)
DQ = "xs.filter(i => i.paper && i.paper.kind === 'data_question')"
bank_case('k1 bank: part (f) 20 marks added (copy of (e))', f"const e = xs.find(i => i.id === 'mf-extract-evaluate-soft-drinks-excise-20'); xs.push({{ ...e, id: 'va-f', marks: 20, question: 'Evaluate X.', paper: {{ ...e.paper, part: 'f' }} }});", 'R13(c)')
bank_case('k2 bank: (d) tariff 8 -> 6', "const d = xs.find(i => i.id === 'mf-extract-examine-bag-charge-optimum-8'); d.marks = 6;", 'R13(c)')
bank_case('k3 bank: (b) and (d) letters swapped', "const b = xs.find(i => i.id === 'mf-extract-explain-tobacco-social-cost-4'); const d = xs.find(i => i.id === 'mf-extract-examine-bag-charge-optimum-8'); b.paper = { ...b.paper, part: 'd' }; d.paper = { ...d.paper, part: 'b' };", 'R13(c)')
bank_case('k4 bank: (c) removed from the data question (paper dropped)', "const c = xs.find(i => i.id === 'mf-extract-analyse-plastic-bag-charge-6'); delete c.paper;", 'R13(c)')
bank_case('k5 bank: (c) stem edited (single source: validator silent by design)', "const c = xs.find(i => i.id === 'mf-extract-analyse-plastic-bag-charge-6'); c.question = c.question.replace('is likely to correct', 'could correct');", None)
SA = "const s = xs.find(i => i.id === 'mf-short-calculate-graduate-social-benefit-4');"
bank_case('t1 R9: context "(0 < |PED| < 1)" then (20 marks) then a later ">" line', SA + " s.paper = { ...s.paper, context: s.paper.context + ' Demand is inelastic (0 < |PED| < 1). Answer this too (20 marks).\\n> quoted' };", 'R9')
bank_case('t2 R9 no-fire: same prose, no tariff', SA + " s.paper = { ...s.paper, context: s.paper.context + ' Demand is inelastic (0 < |PED| < 1). Note.\\n> quoted' };", None)
bank_case('t3 R9: question "if P < MC" ... (20 marks) ... "MR > MC" on one line', "const q = xs.find(i => i.id === 'mf-short-explain-sea-wall-public-good-4'); q.question = q.question + ' If P < MC, say so (20 marks), and if MR > MC too.';", 'R9')
bank_case('t4 R9 (observation): "P<MC ... (20 marks) ... MR>MC" unspaced, one line', "const q = xs.find(i => i.id === 'mf-short-explain-sea-wall-public-good-4'); q.question = q.question + ' If P<MC, say so (20 marks), and if MR>MC too.';", 'R9')
rc, fs = run(); print(f'| K1 | control after restore | md {sha(open(MD).read())} bank {sha(open(DATA).read())} | {summ(fs)} | {"PASS" if not fs and open(MD).read()==md0 and open(DATA).read()==data0 else "**MISS**"} | |')
