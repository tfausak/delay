(function () {
  "use strict";
  var active = true;

  if (window === window.top) {
    safari.self.tab.dispatchMessage('requestSettings');
    window.onblur = function () {
      active = false;
    };
    window.onfocus = function () {
      active = true;
    };
  }

  safari.self.addEventListener('message', function (event) {
    if (event.name === 'receiveSettings') {
      return receiveSettings(event);
    }
  }, false);

  function receiveSettings (event) {
    var settings = event.message, delay;

    if (settings.blacklist) {
      delay = settings.blacklist.indexOf(window.location.hostname) !== -1;
    }
    else {
      delay = settings.whitelist.indexOf(window.location.hostname) === -1;
    }

    if (delay) {
      delayPage(settings.delay, settings.timer);
    }
  }

  function delayPage (delay, timer) {
    var intervalID, elapsed = 0;

    if (timer) {
      document.documentElement.setAttribute('delay',
        Math.round(delay / 1000));
    }
    else {
      document.documentElement.setAttribute('delay', '');
    }

    intervalID = window.setInterval(function () {
      if (active) {
        elapsed += 1000;
      }

      if (timer) {
        document.documentElement.setAttribute('delay',
          Math.round((delay - elapsed) / 1000));
      }
      else {
        document.documentElement.setAttribute('delay', '');
      }

      if (delay - elapsed < 500) {
        document.documentElement.removeAttribute('delay');
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
}());
