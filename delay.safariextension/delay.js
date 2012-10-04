(function () {
  "use strict";

  safari.application.addEventListener('message', function (event) {
    if (event.name === 'requestSettings') {
      return requestSettings(event);
    }
  }, false);

  function requestSettings (event) {
    var settings = safari.extension.settings,
      jitter, delay, blacklist, whitelist;

    jitter = parseInt(settings.jitter, 10);
    if (isNaN(jitter) || jitter < 0) {
      jitter = 0;
    }

    delay = parseInt(settings.delay, 10);
    if (isNaN(delay) || delay < 0) {
      delay = 0;
    }
    delay = 1000 * ((delay - jitter) + (2 * jitter * Math.random()));

    if (settings.mode === 'blacklist') {
      blacklist = settings.blacklist.toLowerCase().split(/\s+/);
    }
    else {
      whitelist = settings.whitelist.toLowerCase().split(/\s+/);
    }

    event.target.page.dispatchMessage('receiveSettings', {
      'blacklist': blacklist,
      'delay': delay,
      'timer': settings.timer,
      'whitelist': whitelist
    });
  }
}());
