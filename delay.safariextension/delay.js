(function () {
    "use strict";

    safari.application.addEventListener('message', function (event) {
        if (event.name === 'getSettings') {
            event.target.page.dispatchMessage('settings', {
                'delay': safari.extension.settings.delay,
                'jitter': safari.extension.settings.jitter,
                'blacklist': safari.extension.settings.blacklist.split(/\s+/).filter(function (hostname) { return hostname.toLowerCase(); }),
            });
        }
    }, false);
}());
