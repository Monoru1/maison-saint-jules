// @ts-check
/**
 * Pré-rendu statique (SSG) des routes publiques.
 *
 * Étapes du build : build client → build serveur (entry-server) → ce script.
 * Pour chaque route, on rend le HTML de l'application et on l'injecte dans le
 * template produit par Vite, en ajustant titre, description et canonique.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const distDir = join(scriptDir, '..', 'dist');
const SITE_URL = 'https://maison-saint-jules.fr';

const serverEntryUrl = pathToFileURL(
  join(distDir, 'server', 'entry-server.js'),
).href;

/** @type {{ render: (p: string) => Promise<string>, prerenderRoutes: readonly {path:string,title:string,description:string}[] }} */
const { render, prerenderRoutes } = await import(serverEntryUrl);

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const escapeText = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const replaceMetaAttr = (html, selector, content) => {
  const pattern = new RegExp(`(${selector} content=")[\\s\\S]*?("\\s*/>)`);
  return html.replace(pattern, `$1${escapeAttr(content)}$2`);
};

for (const route of prerenderRoutes) {
  const appHtml = await render(route.path);
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;

  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeText(route.title)}</title>`,
  );
  html = replaceMetaAttr(html, '<meta name="description"', route.description);
  html = replaceMetaAttr(html, '<meta property="og:title"', route.title);
  html = replaceMetaAttr(
    html,
    '<meta property="og:description"',
    route.description,
  );
  html = html.replace(
    /(<link rel="canonical" href=")[\s\S]*?(" \/>)/,
    `$1${escapeAttr(canonical)}$2`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  const outputPath =
    route.path === '/'
      ? join(distDir, 'index.html')
      : join(distDir, route.path.replace(/^\//, ''), 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, 'utf-8');
  console.log(`  prerender ✓ ${route.path}`);
}

console.log(`\n${prerenderRoutes.length} route(s) figée(s) en HTML statique.`);
