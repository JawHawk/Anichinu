const fs = require('fs');
const path = require('path');

const BASE = 'https://aniwaves.ru';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
const CONCURRENCY = 8;
const OUT = path.join(
  __dirname,
  '..',
  'src',
  'pages',
  'Newtab',
  'assets',
  'aniwavesData.json'
);

async function fetchText(url, attempt = 1) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 500 * attempt));
      return fetchText(url, attempt + 1);
    }
    throw new Error(`${res.status} on ${url}`);
  }
  return res.text();
}

async function discoverLastPage() {
  const html = await fetchText(`${BASE}/az-list`);
  const matches = [...html.matchAll(/\/az-list\/all\/page\/(\d+)/g)].map((m) =>
    Number(m[1])
  );
  if (!matches.length) throw new Error('No pagination found');
  return Math.max(...matches);
}

function parsePage(html) {
  const items = [];
  const re = /href="(\/watch\/[^"]+)"\s+data-jp="([^"]*)">([^<]+)</g;
  let m;
  while ((m = re.exec(html))) {
    const link = `${BASE}${m[1]}`;
    const name = m[3].trim();
    if (name) items.push({ name, link });
  }
  return items;
}

async function scrapePage(page) {
  const html = await fetchText(`${BASE}/az-list/all/page/${page}`);
  return parsePage(html);
}

async function runPool(tasks, size) {
  const results = new Array(tasks.length);
  let i = 0;
  const workers = Array.from({ length: size }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= tasks.length) return;
      try {
        results[idx] = await tasks[idx]();
        process.stdout.write(`\rscraped ${idx + 1}/${tasks.length}`);
      } catch (err) {
        console.error(`\npage ${idx + 1} failed:`, err.message);
        results[idx] = [];
      }
    }
  });
  await Promise.all(workers);
  process.stdout.write('\n');
  return results;
}

(async () => {
  const lastPage = await discoverLastPage();
  console.log(`Last page: ${lastPage}`);
  const tasks = Array.from({ length: lastPage }, (_, i) => () =>
    scrapePage(i + 1)
  );
  const pages = await runPool(tasks, CONCURRENCY);

  const seen = new Set();
  const all = [];
  for (const items of pages) {
    for (const it of items) {
      if (seen.has(it.link)) continue;
      seen.add(it.link);
      all.push(it);
    }
  }
  all.sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(OUT, JSON.stringify({ Trending_animes: all }, null, 2));
  console.log(`Wrote ${all.length} entries to ${OUT}`);
})();
