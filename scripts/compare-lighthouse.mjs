import { readFileSync, writeFileSync } from 'node:fs';

const [baselinePath, currentPath, outputPath = 'lighthouse-comparison.md'] =
  process.argv.slice(2);

if (!baselinePath || !currentPath) {
  throw new Error('Deux résumés Lighthouse sont requis.');
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8')).routes;
const current = JSON.parse(readFileSync(currentPath, 'utf8')).routes;
const routes = [
  ...new Set([...Object.keys(baseline), ...Object.keys(current)]),
];
const signed = (value) => `${value > 0 ? '+' : ''}${value}`;

const lines = [
  '# Comparatif Lighthouse mobile',
  '',
  '| Route | Perf. avant → après | Access. avant → après | LCP avant → après | CLS avant → après | TBT avant → après |',
  '|---|---:|---:|---:|---:|---:|',
];

for (const route of routes) {
  const before = baseline[route];
  const after = current[route];
  if (!before || !after) {
    lines.push(`| ${route} | Donnée manquante | — | — | — | — |`);
    continue;
  }
  lines.push(
    `| ${route} | ${before.performance} → ${after.performance} (${signed(after.performance - before.performance)}) | ${before.accessibility} → ${after.accessibility} (${signed(after.accessibility - before.accessibility)}) | ${before.lcpMs} → ${after.lcpMs} ms (${signed(after.lcpMs - before.lcpMs)}) | ${before.cls} → ${after.cls} (${signed(Number((after.cls - before.cls).toFixed(4)))}) | ${before.tbtMs} → ${after.tbtMs} ms (${signed(after.tbtMs - before.tbtMs)}) |`,
  );
}

const markdown = `${lines.join('\n')}\n`;
writeFileSync(outputPath, markdown);

if (process.env.GITHUB_STEP_SUMMARY) {
  writeFileSync(process.env.GITHUB_STEP_SUMMARY, markdown, { flag: 'a' });
}

console.log(markdown);
