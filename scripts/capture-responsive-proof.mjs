import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const [baseUrl = 'http://127.0.0.1:4173', outputDirectory = 'proofs'] =
  process.argv.slice(2);
const output = resolve(outputDirectory);
mkdirSync(output, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
});

const evidence = {};

async function openAt(width, height, options = {}) {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((hardwareConcurrency) => {
    if (hardwareConcurrency) {
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        configurable: true,
        get: () => hardwareConcurrency,
      });
    }

    window.__cameraWriteCount = 0;
    const nativeSetProperty = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function setProperty(
      property,
      value,
      priority,
    ) {
      if (property === '--house-progress') window.__cameraWriteCount += 1;
      return nativeSetProperty.call(this, property, value, priority);
    };
  }, options.hardwareConcurrency ?? null);
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: options.deviceScaleFactor ?? 1,
    isMobile: width < 768,
    hasTouch: width < 1025,
  });
  if (options.reducedMotion) {
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
  }
  if (options.cpuSlowdown) {
    const session = await page.createCDPSession();
    await session.send('Emulation.setCPUThrottlingRate', {
      rate: options.cpuSlowdown,
    });
  }
  await page.goto(baseUrl, { waitUntil: 'networkidle0' });
  return page;
}

const portrait = await openAt(375, 812);
await portrait.screenshot({ path: resolve(output, 'home-375.png') });
evidence.portrait = await portrait.evaluate(() => {
  const hero = document.querySelector('.world-film-opening-image img');
  const target = document.querySelector('.world-film-position li');
  const rect = target?.getBoundingClientRect();
  const resources = performance
    .getEntriesByType('resource')
    .map((entry) => entry.name)
    .filter((name) => name.includes('/images/'));
  return {
    viewport: [window.innerWidth, window.innerHeight],
    devicePixelRatio: window.devicePixelRatio,
    heroCurrentSrc: hero?.currentSrc ?? null,
    downloadedImages: resources,
    touchTarget: rect ? { width: rect.width, height: rect.height } : null,
  };
});

const hasBooking = await portrait.$('.world-film-booking');
if (hasBooking) {
  await portrait.$eval('.world-film-booking', (element) =>
    element.scrollIntoView({ block: 'start' }),
  );
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 350));
  await portrait.screenshot({ path: resolve(output, 'booking-375.png') });
}

await portrait.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((resolveDelay) => setTimeout(resolveDelay, 150));
const scrollBeforeNavigation = await portrait.evaluate(() => window.scrollY);
// Plusieurs liens vers la Maison existent (navigation mobile, desktop, footer).
// Déclencher le premier Link dans le DOM isole ici le comportement du routeur
// sans rendre la preuve dépendante de la visibilité d'un menu particulier.
await portrait.$eval('a[href="/maison"]', (link) => link.click());
await portrait.waitForFunction(() => window.location.pathname === '/maison');
await new Promise((resolveDelay) => setTimeout(resolveDelay, 50));
evidence.routeScrollReset = {
  from: '/',
  to: await portrait.evaluate(() => window.location.pathname),
  scrollBeforeNavigation,
  scrollAfterNavigation: await portrait.evaluate(() => window.scrollY),
};
await portrait.screenshot({
  path: resolve(output, 'route-scroll-reset-375.png'),
});
await portrait.close();

for (const width of [768, 834]) {
  const tablet = await openAt(width, 1024);
  await tablet.evaluate(() => window.scrollTo(0, 3200));
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 350));
  await tablet.screenshot({ path: resolve(output, `scene-${width}.png`) });
  evidence[`tablet${width}`] = await tablet.evaluate(() => {
    const copy = document.querySelector('.world-film-scene-copy');
    return {
      viewport: [window.innerWidth, window.innerHeight],
      copyPaddingLeft: copy ? getComputedStyle(copy).paddingLeft : null,
      sceneMinHeight: getComputedStyle(
        document.querySelector('.world-film-scene'),
      ).minHeight,
    };
  });
  await tablet.close();
}

const normalMotion = await openAt(375, 812, {
  cpuSlowdown: 4,
  hardwareConcurrency: 2,
});
await normalMotion.evaluate(() => {
  window.__sceneEntryWriteIndexes = [];
  window.__evidenceSceneStyles = [
    ...document.querySelectorAll('.world-film-scene'),
  ].map((item) => item.style);
  const previousSetProperty = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function setProperty(
    property,
    value,
    priority,
  ) {
    if (property === '--scene-entry') {
      const index = window.__evidenceSceneStyles.indexOf(this);
      if (index >= 0 && !window.__sceneEntryWriteIndexes.includes(index)) {
        window.__sceneEntryWriteIndexes.push(index);
      }
    }
    return previousSetProperty.call(this, property, value, priority);
  };
});
await normalMotion.evaluate(() => window.scrollTo(0, 3200));
await new Promise((resolveDelay) => setTimeout(resolveDelay, 350));
await normalMotion.screenshot({ path: resolve(output, 'cpu-4x-375.png') });
evidence.normalMotion = await normalMotion.evaluate(() => {
  const root = document.querySelector('.world-film');
  const scene = document.querySelector('.world-film-scene');
  const scenes = [...document.querySelectorAll('.world-film-scene')];
  return {
    hardwareConcurrency: navigator.hardwareConcurrency,
    cameraWriteCount: window.__cameraWriteCount,
    houseProgressInline: root?.style.getPropertyValue('--house-progress') ?? '',
    sceneBlurInline: scene?.style.getPropertyValue('--scene-blur') ?? '',
    sceneBlurInlineValues: scenes.map((item) =>
      item.style.getPropertyValue('--scene-blur'),
    ),
    styledSceneIndexes: scenes.flatMap((item, index) =>
      item.style.getPropertyValue('--scene-entry') ? [index] : [],
    ),
    sceneEntryWriteIndexesAfterScroll: window.__sceneEntryWriteIndexes,
  };
});
await normalMotion.close();

const reducedMotion = await openAt(375, 812, { reducedMotion: true });
await reducedMotion.evaluate(() => window.scrollTo(0, 3200));
await new Promise((resolveDelay) => setTimeout(resolveDelay, 350));
evidence.reducedMotion = await reducedMotion.evaluate(() => {
  const root = document.querySelector('.world-film');
  const scene = document.querySelector('.world-film-scene');
  return {
    mediaMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
    cameraWriteCount: window.__cameraWriteCount,
    houseProgressInline: root?.style.getPropertyValue('--house-progress') ?? '',
    sceneBlurInline: scene?.style.getPropertyValue('--scene-blur') ?? '',
  };
});
await reducedMotion.screenshot({
  path: resolve(output, 'reduced-motion-375.png'),
});
await reducedMotion.close();

writeFileSync(
  resolve(output, 'responsive-evidence.json'),
  `${JSON.stringify(evidence, null, 2)}\n`,
);
await browser.close();

if (
  process.env.ASSERT_ROUTE_SCROLL_RESET === 'true' &&
  evidence.routeScrollReset.scrollAfterNavigation !== 0
) {
  throw new Error(
    `La nouvelle route conserve un scroll de ${evidence.routeScrollReset.scrollAfterNavigation}px.`,
  );
}
