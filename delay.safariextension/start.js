(function () {
    "use strict";
    var active, settings, id, tick, elapsed, intervalID;

    if (window === window.top) {
        safari.self.tab.dispatchMessage('getSettings');

        active = true;
        window.onblur = function (event) {
            active = false;
        };
        window.onfocus = function (event) {
            active = true;
        };
    }

    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settings') {
            settings = event.message;
            if (settings.blacklist.indexOf(window.location.hostname) !== -1) {
                id = document.documentElement.id;
                document.documentElement.id = 'delay';

                tick = 1000;
                elapsed = 0;
                intervalID = window.setInterval(function () {
                    if (active) {
                        elapsed += tick;
                    }
                    if (elapsed >= settings.delay) {
                        document.documentElement.id = id;
                        window.clearInterval(intervalID);
                    }
                }, tick);
            }
        }
    }, false);
}());
