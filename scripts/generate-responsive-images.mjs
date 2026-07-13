import { readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = new URL('../public/images/', import.meta.url).pathname;
const widths = [640, 1024];

function visit(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) {
      visit(path);
      continue;
    }
    if (extname(path) !== '.webp' || /-(640|1024)\.webp$/.test(path)) continue;

    for (const width of widths) {
      const output = path.replace(/\.webp$/, `-${width}.webp`);
      const result = spawnSync(
        'convert',
        [path, '-strip', '-resize', `${width}x>`, '-quality', '80', output],
        { stdio: 'inherit' },
      );
      if (result.status !== 0) process.exit(result.status ?? 1);
      if (statSync(output).size === 0) {
        console.error(`Image responsive vide : ${output}`);
        process.exit(1);
      }
    }
  }
}

visit(root);
