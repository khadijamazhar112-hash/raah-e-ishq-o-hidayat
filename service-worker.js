/**
 * Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت) — Service Worker
 * Version: 1.0.0
 * Provides offline support, static asset caching, and resilient network fallback.
 * Strictly avoids caching private auth, sensitive journal data, or unverified content.
 */

'use strict';

const CACHE_NAME = 'raah-e-ishq-v1.0.0';

const PRECACHE_ASSETS = [
  './',
  'index.html',
  'quran.html',
  'azkar.html',
  'duas.html',
  'topics.html',
  'journal.html',
  'journey.html',
  'settings.html',
  'offline.html',
  'css/style.css',
  'css/responsive.css',
  'js/main.js',
  'js/quran.js',
  'js/azkar.js',
  'js/duas.js',
  'js/topics.js',
  'js/journal.js',
  'js/journey.js',
  'js/settings.js',
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// Sensitive or dynamic routes that must NEVER be cached
const SENSITIVE_URL_PATTERNS = [
  '/api/auth',
  '/api/journal'
];

/* ============================================================
   1. INSTALL EVENT
   ============================================================ */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching offline essentials...');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Pre-cache non-fatal warning:', err);
      });
    })
  );
});

/* ============================================================
   2. ACTIVATE EVENT (CLEANUP OLD CACHES)
   ============================================================ */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[PWA SW] Deleting outdated cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* ============================================================
   3. FETCH EVENT & CACHING STRATEGY
   ============================================================ */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // 2. Never cache private auth or sensitive journal data
  const isSensitive = SENSITIVE_URL_PATTERNS.some((pattern) => url.pathname.includes(pattern));
  if (isSensitive) {
    return;
  }

  // 3. Audio streaming from EveryAyah: Network-only (prevent filling device storage)
  if (url.hostname.includes('everyayah.com')) {
    return;
  }

  // 4. HTML Navigation Requests (Network-First, Cache fallback, Offline page fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If valid response, update cache in background
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // If network failed, look in cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to offline.html
          return caches.match('offline.html');
        })
    );
    return;
  }

  // 5. Static Assets (CSS, JS, Fonts, Images): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network offline, do nothing
      });

      return cachedResponse || fetchPromise;
    })
  );
});
