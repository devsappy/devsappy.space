// Tell Bing (and every IndexNow engine: Yandex, Seznam, Naver…) that pages changed.
// Bing's index also feeds ChatGPT search and Copilot. Run after each deploy:
//   npm run indexnow
const KEY = '515efbbfe117106685d639cf0e4eed8f';
const HOST = 'www.devsappy.space';

const res = await fetch(`https://${HOST}/sitemap.xml`);
if (!res.ok) throw new Error(`Couldn't fetch the sitemap: ${res.status}`);
const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} ${r.statusText} — submitted ${urls.length} URLs`);
