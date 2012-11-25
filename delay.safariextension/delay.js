(function () {
  'use strict';
  var tick = 1000;

  safari.application.addEventListener('message', function (event) {
    if (event.name === 'requestSettings') {
      return requestSettings(event);
    }
  }, false);

  function requestSettings (event) {
    var settings = safari.extension.settings, delay, jitter, list;

    if (settings.mode === 'blacklist') {
      list = cleanList(settings.blacklist);
      if (!list.test(event.message.location.hostname)) {
        return;
      }
    }
    else {
      list = cleanList(settings.whitelist);
      if (list.test(event.message.location.hostname)) {
        return;
      }
    }

    jitter = cleanInt(settings.jitter);
    delay = cleanInt(settings.delay);
    if (jitter > 0) {
      delay = (delay - jitter) + (2 * jitter * Math.random());
    }
    delay *= tick;

    event.target.page.dispatchMessage('receiveSettings', {
      'active': event.message.location.href ===
        safari.application.activeBrowserWindow.activeTab.url,
      'delay': delay,
      'tick': tick,
      'timer': settings.timer
    });
  }

  function cleanInt (value) {
    value = parseInt(value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    return value;
  }

  function cleanList (value) {
    value = value.replace(/[.]/g, '[.]').replace(/([?*])/g, '.$1').split(/\s+/);
    return new RegExp('^(' + value.join('|') + ')$', 'i');
  }
}());
