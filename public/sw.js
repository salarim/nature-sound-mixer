const CACHE_NAME = "nature-sound-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/sounds/ocean.mp3",
  "/sounds/thunder.mp3",
  "/sounds/wind.mp3",
  "/sounds/rain.mp3",
  "/sounds/birds.mp3",
  "/sounds/leaves.mp3",
  "/sounds/fire.mp3",
  "/sounds/coffee.mp3",
  "/sounds/night.mp3",
  "/sounds/stream.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        if (response.ok && event.request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
