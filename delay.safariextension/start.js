(function () {
  'use strict';
  var active = false, attribute = 'data-delay';

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
      receiveSettings(event);
    }
  }, false);

  function receiveSettings (event) {
    var delay, elapsed, intervalID, tick, timer;

    active = event.message.active;

    delay = event.message.delay;
    elapsed = 0;
    tick = event.message.tick;
    timer = event.message.timer;

    document.documentElement.setAttribute(attribute,
      timer ? Math.round(delay / tick) : '\u231b');

    intervalID = window.setInterval(function () {
      if (!active) {
        return;
      }

      elapsed += tick;

      if (timer) {
        document.documentElement.setAttribute(attribute,
          Math.round((delay - elapsed) / tick));
      }

      if (Math.round((delay - elapsed) / tick) === 0) {
        document.documentElement.removeAttribute(attribute);
        window.clearInterval(intervalID);

        safari.self.tab.dispatchMessage('finishedDelaying', {
          'location': window.location
        });
      }
    }, tick);
  }
}());
