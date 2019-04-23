self.addEventListener('install', (event) => {
    event.waitUntil(async function () {
        const cache = await caches.open('ts-static-v3');
        await cache.addAll([
            "/favicon.ico",
            "/index.html",
            "/*.css",
            "/*.js",
            "/assets/**",
            "/*.md",
            "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]);
    }());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(async function() {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    }());
  });