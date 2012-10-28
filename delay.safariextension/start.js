(function () {
  "use strict";
  var active = false;

  if (window === window.top) {
    safari.self.tab.dispatchMessage('requestSettings', {
      'location': window.location
    });
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

    active = settings.active;

    if (settings.blacklist) {
      delay = settings.blacklist.test(window.location.hostname);
    }
    else {
      delay = !settings.whitelist.test(window.location.hostname);
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
      document.documentElement.setAttribute('delay', '\u231b');
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
        document.documentElement.setAttribute('delay', '\u231b');
      }

      if (delay - elapsed < 500) {
        document.documentElement.removeAttribute('delay');
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
}());
