(function () {
  "use strict";
  var active = true, block, elapsed = 0, intervalID, settings, tick = 1000;

  if (window === window.top) {
    safari.self.tab.dispatchMessage('getSettings');
    window.onblur = function () { active = false; };
    window.onfocus = function () { active = true; };
  }

  safari.self.addEventListener('message', function (event) {
    if (event.name === 'settings') {
      settings = event.message;

      if (settings.list === 'whitelist') {
        block = settings.whitelist.indexOf(window.location.hostname) === -1;
      }
      else {
        block = settings.blacklist.indexOf(window.location.hostname) !== -1;
      }

      if (block) {
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
          if (settings.delay - elapsed < 500) {
            document.documentElement.removeAttribute('delay');
            window.clearInterval(intervalID);
          }
        }, tick);
      }
    }
  }, false);
}());
