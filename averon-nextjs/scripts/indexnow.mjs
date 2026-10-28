// Tells Bing (and the other IndexNow search engines) that the site's pages
// changed, so they re-crawl within hours instead of days. ChatGPT search
// leans on Bing's index, so this is how new content reaches it quickly.
//
// Reads the live sitemap and submits every URL in it. Run after a
// production deploy (the "IndexNow" GitHub workflow does this on its own):
//   node scripts/indexnow.mjs
// The key must match public/<key>.txt, which proves we own the domain.
const HOST = 'averon.agency';
const KEY = 'a23adbc15eff77b17e807cbf49a9217b';

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned ${r.status}`);
  return r.text();
});
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
if (urlList.length === 0) throw new Error('no URLs found in sitemap.xml');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

// 200 = accepted, 202 = accepted, key still being verified.
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
