if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: './'}).then(function (registration) {
        console.log('Service Worker Registered Succesful');
    });
    navigator.serviceWorker.ready.then(function (registration) {
        registration.pushManager.subscribe({userVisibleOnly: true}).then(function (subscription) {
            var isPushEnabled = true;
            console.log("Push notification supported");
        })

    })
}