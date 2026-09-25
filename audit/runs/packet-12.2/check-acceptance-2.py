"""Acceptance check 2, by two different routes.

The page's claim is parsed out of the SERVED HTML; the guard's claim is parsed out of its PRINTED
REPORT, which lists UNEXAMINED leaves. Neither artefact is the data structure the other was built
from, so a shared blind spot in the counting would not cancel out here.
"""
import re, sys

h = open('audit/runs/packet-12.2/curl-market-failure.html', encoding='utf8').read()
nos = re.sub(r'<script[\s\S]*?</script>', '', h)
plain = re.sub(r'<!-- -->', '', nos)
plain = re.sub(r'<[^>]+>', ' ', plain)
plain = re.sub(r'\s+', ' ', plain)

m = re.search(r'This page examines (\d+) of (\d+) requirements', plain)
page_examined, page_leaves = int(m.group(1)), int(m.group(2))
head, _, _ = plain.partition('requirements in 1.3.5 that no question on this page examines')
page_ids = sorted(set(re.findall(r'ECON-1\.3\.5-[0-9a-z-]+', head)))

cli = open('audit/runs/packet-12.2/cli-market-failure.txt', encoding='utf8').read()
row = re.search(r'^market-failure\s+econ\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)%', cli, re.M)
cli_qs, cli_untagged, cli_examined, cli_leaves = (int(g) for g in row.groups()[:4])
cli_unexamined = set(re.findall(r'^\s{2}(ECON-1\.3\.5-[0-9a-z-]+)', cli, re.M))

print(f'page  : {page_examined} of {page_leaves}   ids={page_ids}')
print(f'guard : {cli_examined} of {cli_leaves}   questions={cli_qs} untagged={cli_untagged} '
      f'unexamined listed={len(cli_unexamined)}')

fail = []
if page_leaves != cli_leaves:
    fail.append('denominators disagree')
overlap = [i for i in page_ids if i in cli_unexamined]
if overlap:
    fail.append(f'page claims leaves the guard calls unexamined: {overlap}')
if page_examined > cli_examined:
    fail.append('the page claims more coverage than the whole bank has')
if len(page_ids) != page_examined:
    fail.append('the page lists a different number of ids than it claims')

print('RESULT:', 'PASS' if not fail else 'FAIL ' + '; '.join(fail))
sys.exit(1 if fail else 0)
