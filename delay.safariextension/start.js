(function () {
    "use strict";
    var settings, visibility;

    if (window !== window.top) {
        return;
    }

    safari.self.tab.dispatchMessage('getSettings');

    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settings') {
            settings = event.message;

            if (settings.blacklist.indexOf(window.location.hostname) !== -1) {
                visibility = document.documentElement.style.visibility;
                document.documentElement.style.visibility = 'hidden';
                window.setTimeout(function () {
                    document.documentElement.style.visibility = visibility;
                }, settings.delay);
            }
        }
    }, false);
}());
