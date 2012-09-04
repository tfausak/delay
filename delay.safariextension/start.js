(function () {
    "use strict";
    var active = true, elapsed = 0, intervalID, settings, tick = 1000;

    if (window === window.top) {
        safari.self.tab.dispatchMessage('getSettings');
        window.onblur = function () { active = false; };
        window.onfocus = function () { active = true; };
    }

    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settings') {
            settings = event.message;
            if (settings.blacklist.indexOf(window.location.hostname) !== -1) {
                if (settings.timer) {
                    document.documentElement.setAttribute('delay',
                        Math.round(settings.delay / 1000));
                }
                else {
                    document.documentElement.setAttribute('delay', '');
                }

                intervalID = window.setInterval(function () {
                    if (active) {
                        elapsed += tick;

                        if (settings.timer) {
                            document.documentElement.setAttribute('delay',
                                Math.round((settings.delay - elapsed) / 1000));
                        }
                        else {
                            document.documentElement.setAttribute('delay', '');
                        }
                    }
                    if (elapsed >= settings.delay) {
                        document.documentElement.removeAttribute('delay');
                        window.clearInterval(intervalID);
                    }
                }, tick);
            }
        }
    }, false);
}());
