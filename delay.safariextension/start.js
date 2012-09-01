(function () {
    "use strict";
    var settings, display;

    if (window !== window.top) {
        return;
    }

    safari.self.tab.dispatchMessage('getSettings');

    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settings') {
            settings = event.message;

            if (settings.blacklist.indexOf(window.location.hostname) !== -1) {
                display = document.documentElement.style.display;
                document.documentElement.style.display = 'none';
                window.setTimeout(function () {
                    document.documentElement.style.display = display;
                }, 1000 * (settings.delay - settings.jitter + (Math.random() * 2 * settings.jitter)));
            }
        }
    }, false);
}());
