(function () {
    "use strict";
    var delay, jitter, blacklist, whitelist;

    safari.application.addEventListener('message', function (event) {
        if (event.name === 'getSettings') {
            delay = safari.extension.settings.delay;
            jitter = safari.extension.settings.jitter;
            blacklist = safari.extension.settings.blacklist;
            whitelist = safari.extension.settings.whitelist;

            if (jitter) {
                delay -= jitter;
                delay += 2 * jitter * Math.random();
            }
            delay *= 1000;

            blacklist = blacklist.split(/\s+/).filter(function (hostname) {
                return hostname.toLowerCase();
            });

            whitelist = whitelist.split(/\s+/).filter(function (hostname) {
                return hostname.toLowerCase();
            });

            event.target.page.dispatchMessage('settings', {
                'blacklist': blacklist,
                'delay': delay,
                'timer': safari.extension.settings.timer,
                'whitelist': whitelist,
            });
        }
    }, false);
}());
