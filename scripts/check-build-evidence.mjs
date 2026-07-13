import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const [distDirectory = 'dist', output = 'build-evidence.json'] =
  process.argv.slice(2);
const root = resolve(distDirectory);
const files = [];

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) visit(path);
    else files.push(path);
  }
}

visit(root);

const describe = (path) => ({
  path: relative(root, path),
  bytes: statSync(path).size,
});
const webp = files.filter((path) => path.endsWith('.webp')).map(describe);
const avif = files.filter((path) => path.endsWith('.avif')).map(describe);
const evidence = {
  staticRoutes: files
    .filter((path) => path.endsWith('index.html') && !path.includes('/server/'))
    .map((path) => relative(root, path))
    .sort(),
  css: files.filter((path) => /\/assets\/.*\.css$/.test(path)).map(describe),
  webp,
  webpUnder1Kb: webp.filter((file) => file.bytes < 1024),
  avif,
  avifUnder1Kb: avif.filter((file) => file.bytes < 1024),
};

writeFileSync(output, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify(evidence, null, 2));

if (evidence.webpUnder1Kb.length > 0) {
  throw new Error('Un ou plusieurs WebP font moins de 1 kB.');
}
if (evidence.avifUnder1Kb.length > 0) {
  throw new Error('Un ou plusieurs AVIF font moins de 1 kB.');
}
