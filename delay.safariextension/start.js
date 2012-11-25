(function () {
  'use strict';
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
    var delay = event.message.delay, elapsed = 0, timer = event.message.timer,
        intervalID;

    active = event.message.active;

    document.documentElement.setAttribute('delay',
      timer ? Math.round(delay / 1000) : '\u231b');

    intervalID = window.setInterval(function () {
      if (!active) {
        return;
      }

      elapsed += 1000;

      if (timer) {
        document.documentElement.setAttribute('delay',
          Math.round((delay - elapsed) / 1000));
      }

      if (delay - elapsed < 500) {
        document.documentElement.removeAttribute('delay');
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
}());
