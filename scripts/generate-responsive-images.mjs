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

const portraitSource = join(root, 'hotel/threshold-dawn-portrait.webp');
for (const [suffix, resize] of [
  ['', null],
  ['-640', 'scale=640:-2'],
]) {
  const output = portraitSource.replace(/\.webp$/, `${suffix}.avif`);
  const args = ['-y', '-loglevel', 'error', '-i', portraitSource];
  if (resize) args.push('-vf', resize);
  args.push('-c:v', 'libaom-av1', '-crf', '38', '-still-picture', '1', output);
  const result = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
  if (statSync(output).size === 0) {
    console.error(`Image responsive vide : ${output}`);
    process.exit(1);
  }
}
