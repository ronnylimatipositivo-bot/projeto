self.addEventListener('install', (ev)=>{ self.skipWaiting(); });
self.addEventListener('activate', (ev)=>{ self.clients.claim(); });
self.addEventListener('fetch', (ev)=>{
// cache-first for static assets could be implemented aqui
});