(function () {
    "use strict";
    var settings, id;

    if (window !== window.top) {
        return;
    }

    safari.self.tab.dispatchMessage('getSettings');

    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settings') {
            settings = event.message;

            if (settings.blacklist.indexOf(window.location.hostname) !== -1) {
                id = document.firstChild.id || '';
                document.firstChild.id += ' delay';
                window.setTimeout(function () {
                    document.firstChild.id = id;
                }, 1000 * (settings.delay - settings.jitter + (Math.random() * 2 * settings.jitter)));
            }
        }
    }, false);
}());
