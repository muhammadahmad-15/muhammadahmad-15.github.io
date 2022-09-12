'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "7d0b89b8cc48854a3da63ff47c5aaa72",
"/": "7d0b89b8cc48854a3da63ff47c5aaa72",
"main.dart.js": "43aa830b7f386fbdfb2312e6552ed806",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"assets/AssetManifest.json": "7994709c7bbaecbeb31a69853ae3e24e",
"assets/NOTICES": "a81b20da20a80f6be022f0c762e1b13c",
"assets/FontManifest.json": "e55189cfbcef0fceff767d2d6bfefaf5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "c41235c57645286d040b19e234cac089",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/img/sm-menu.png": "72106aaa0756ad96a08ed9534341ef74",
"assets/assets/img/store-details.png": "e335ee147a2542a3f36eda994fc6a518",
"assets/assets/img/sm-records.png": "eb61da92462f9e635678ffb4709c5cf1",
"assets/assets/img/twitter-dark.svg": "e7a6cfef9ca0d34ae3a641b890040975",
"assets/assets/img/github-dark.svg": "5eca19e8c927cb5cae4e9a9d0611c09a",
"assets/assets/img/github-ico.png": "2817e6e2806c046e3d35d48052739a13",
"assets/assets/img/twitter-ico.png": "1a2925968edce98bfb901ccb8390176e",
"assets/assets/img/medium.png": "9e61b478e8435d0ec422b01859b7d2fc",
"assets/assets/img/mediumIcon.png": "148721579879b80662345d9b06f12217",
"assets/assets/img/store-login.png": "2792da1b18adb37ccff45cb49e440aa2",
"assets/assets/img/comenzi.jpg": "d60133543130b05dd356c96c83954414",
"assets/assets/img/book-dark.svg": "55abd071b6b4a23e4bf2b4dcc1717c9b",
"assets/assets/img/sm-type.png": "43c408e1ec402e4e7e4ade94ea27032a",
"assets/assets/img/linkedin-dark.svg": "9e40031f9d4b81e16c9bb9b49c56cff4",
"assets/assets/img/app-store.png": "98c922e36b7da7d0b23d00975a5aeb00",
"assets/assets/img/yt-ico.png": "a476039410a4002071440b581ff88dcf",
"assets/assets/img/playstore.png": "18fab95d924ef304111a8efd2620c0a6",
"assets/assets/img/ahmad.jpeg": "25ab5fd4ee8ad52a39ce734b892d96c9",
"assets/assets/img/linkedin-ico.png": "6f847de3d2eb75384bce36891e9b0975",
"assets/assets/img/yt-dark.svg": "8b6e47d534d13061c836f2f3b8585ef7",
"assets/assets/img/Payplus.png": "5e1fe7af76e975c1f15c937516029bfe",
"assets/assets/img/mediumIcon.svg": "0f123ac1fdee308ad27a57557b3ecaba",
"assets/assets/img/store-customers.png": "d5669dae7f4f6bfdafc6bb6e36194e5d",
"assets/assets/img/etom-partner.png": "52ed92b8a16e25a604b6cde66e2245b3",
"assets/assets/img/store-orders.png": "6178d8abebb642f965def0a33a098bab",
"assets/assets/img/etom.png": "07a9fbbf7865a77c9333ebd72aa47f77",
"assets/assets/fonts/source-sans-pro/SourceSansPro-Regular.ttf": "982386e2d4b16d8a061d83647e35c39c",
"assets/assets/fonts/source-sans-pro/SourceSansPro-Bold.ttf": "760cda86de964d7e344fe4c2cce1c357",
"assets/assets/fonts/source-sans-pro/SourceSansPro-Semibold.ttf": "ce8a7a5d8c76d57e5a384baa25fe6342",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
