/* Juggernaut service worker. Ships with 2.1 (build 17.1.0); it must sit in the same folder as index.html.

   One job: keep a copy of the app page so the app opens with a weak signal or none.

   - The app page: network first. If the network has not answered within 2.5 s, or fails, the saved copy is shown,
     and the saved copy is refreshed when the answer does arrive. So with a good signal you always get the page that
     is published, and a new release needs no change to this file.
   - Nothing else passes through here: no other file and no other host. Requests to the Hermes bridge, the coach or
     any other address are left to the browser exactly as if this file did not exist.

   Until 17.1.0 the app tried to register a worker from a blob, which browsers refuse, so no worker ever ran. */
const CACHE = 'juggernaut-page-v1';
const WAIT_MS = 2500;

self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

function pageKey(url){ const u = new URL(url); u.search = ''; u.hash = ''; return u.href; }

function serve(req){
  const key = pageKey(req.url);
  const opened = caches.open(CACHE);
  const net = fetch(req).then(async r => {
    if (r && r.ok && r.type === 'basic'){ try{ (await opened).put(key, r.clone()); }catch(_){} }
    return r;
  });
  const response = (async () => {
    const saved = await (await opened).match(key);
    if (!saved) return net;                                   // first visit: nothing to fall back on yet
    let timer;
    const late = new Promise(res => { timer = setTimeout(() => res('late'), WAIT_MS); });
    try{
      const r = await Promise.race([net, late]);
      clearTimeout(timer);
      if (r !== 'late' && r && r.ok) return r;                // the published page, in time
      return saved;                                           // slow, or the server answered with an error
    }catch(_){ clearTimeout(timer); return saved; }           // no network
  })();
  return { response, settled:net.then(() => {}, () => {}) };  // settled: the refresh has finished, whoever won the race
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.mode !== 'navigate') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  const job = serve(req);
  e.respondWith(job.response);
  e.waitUntil(job.settled);
});

// The page asks for its own address to be saved right after the worker is first installed (the page that installs
// the worker was loaded before the worker existed, so it would otherwise be saved only on the next visit).
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type !== 'save-page' || typeof d.url !== 'string') return;
  let key; try{ if (new URL(d.url).origin !== self.location.origin) return; key = pageKey(d.url); }catch(_){ return; }
  e.waitUntil(caches.open(CACHE).then(c => fetch(key, { cache:'reload' }).then(r => (r && r.ok) ? c.put(key, r) : null)).catch(() => {}));
});
