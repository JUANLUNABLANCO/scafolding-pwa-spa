if ('serviceWorker' in navigator) {
    // alert('service worker');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./src/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
        self.addEventListener("install", event => {
            console.log("Service worker installed");
        });
        self.addEventListener("activate", event => {
            console.log("Service worker activated");
        });
    });
}