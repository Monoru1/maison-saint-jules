import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [reportsDirectory = '.lighthouseci', output = 'lighthouse-summary.json'] =
  process.argv.slice(2);

const reportFiles = readdirSync(reportsDirectory).filter(
  (name) => name.startsWith('lhr-') && name.endsWith('.json'),
);

if (reportFiles.length === 0) {
  throw new Error(`Aucun rapport Lighthouse dans ${reportsDirectory}`);
}

const reports = reportFiles.map((name) =>
  JSON.parse(readFileSync(resolve(reportsDirectory, name), 'utf8')),
);

const median = (values) => {
  const ordered = [...values].sort((a, b) => a - b);
  return ordered[Math.floor(ordered.length / 2)];
};

const metric = (report, audit) => report.audits[audit]?.numericValue ?? 0;
const grouped = new Map();
for (const report of reports) {
  const rawPathname = new URL(report.finalUrl).pathname;
  const pathname = rawPathname.endsWith('/') ? rawPathname : `${rawPathname}/`;
  grouped.set(pathname, [...(grouped.get(pathname) ?? []), report]);
}

const routes = Object.fromEntries(
  [...grouped.entries()].map(([pathname, runs]) => [
    pathname,
    {
      runs: runs.length,
      performance: median(
        runs.map((report) => report.categories.performance.score * 100),
      ),
      accessibility: median(
        runs.map((report) => report.categories.accessibility.score * 100),
      ),
      lcpMs: Math.round(
        median(
          runs.map((report) => metric(report, 'largest-contentful-paint')),
        ),
      ),
      cls: Number(
        median(
          runs.map((report) => metric(report, 'cumulative-layout-shift')),
        ).toFixed(4),
      ),
      tbtMs: Math.round(
        median(runs.map((report) => metric(report, 'total-blocking-time'))),
      ),
    },
  ]),
);

writeFileSync(output, `${JSON.stringify({ routes }, null, 2)}\n`);
console.log(JSON.stringify({ routes }, null, 2));
