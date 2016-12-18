(global => {
    'use strict';
    importScripts('node_modules/sw-toolbox/sw-toolbox.js');
    global.toolbox.options.debug = false;

    var vesrion = "1",
        cacheNamePrefix = "Snakes_cache_";
    var precacheItems = [
        "assets/WebApp/manifest.json",
        "assets/WebApp/icon.png",
    ];
    global.toolbox.precache(precacheItems);
    global.toolbox.router.get("/sw.js", global.toolbox.networkFirst);
    global.toolbox.router.get("/reg.js", global.toolbox.networkFirst);
    global.toolbox.router.get('/assets/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'asset-cache-v1',
            maxEntries: 20
        }
    });
    global.toolbox.router.get("/", global.toolbox.networkFirst, {
        cache: {
            name: buildCacheName("html")
        }
    });

    global.addEventListener('install',
        event => event.waitUntil(global.skipWaiting()));

    global.addEventListener('activate',
        event => event.waitUntil(global.clients.claim().then(clearCache)));

    global.addEventListener('push', function (event) {

        event.waitUntil(

            self.registration.showNotification("ُSnake and ladders game", {
                body: "Do you like it buddy?!",
                icon: "assets/WebApp/icon.png",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                actions: [
                    { action: 'like', title: 'Yes'},
                    { action: 'dislike', title: 'Nope'},
                ]
                ,
            })
        );
    });

    function buildCacheName(e) {
        return cacheNamePrefix + e + "_" + vesrion
    };


    function clearCache() {
        return caches.keys().then(function (e) {
            return Promise.all(e.map(function (e) {
                var o = new RegExp(cacheNamePrefix);
                var t = new RegExp(vesrion);
                if (o.test(e)) {
                    if (!t.test(e)) {
                        return caches.delete(e)
                    }
                }
            }))
        })
    }


})(self);