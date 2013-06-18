(function () {
  'use strict';
  var graces = {}, tick = 1000;

  safari.application.addEventListener('message', function (event) {
    if (event.name === 'requestSettings') {
      requestSettings(event);
    }
    else if (event.name === 'finishedDelaying') {
      finishedDelaying(event);
    }
  }, false);

  function requestSettings (event) {
    var settings = safari.extension.settings, delay, grace, jitter, list, now,
      then;

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

    grace = cleanInt(settings.grace);
    if (grace) {
      grace *= tick;
      then = graces[event.message.location.hostname];
      now = new Date();
      if (now - then < grace) {
        graces[event.message.location.hostname] = now;
        return;
      }
    }

    jitter = cleanInt(settings.jitter);
    delay = cleanInt(settings.delay);
    if (jitter) {
      delay = (delay - jitter) + (2 * jitter * Math.random());
    }
    delay *= tick;

    if (Math.round(delay / tick) <= 0) {
      return;
    }

    event.target.page.dispatchMessage('receiveSettings', {
      'active': event.message.location.href ===
        safari.application.activeBrowserWindow.activeTab.url,
      'delay': delay,
      'tick': tick,
      'timer': settings.timer
    });
  }

  function finishedDelaying (event) {
    graces[event.message.location.hostname] = new Date();
  }

  function cleanInt (value) {
    value = parseInt(value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    return value;
  }

  function cleanList (value) {
    value = value.replace(/[-\[\]\/{}()+\\^$|]/g, '\\$&');
    value = value.replace(/[.]/g, '[.]').replace(/([?*])/g, '.$1');
    return new RegExp('^(' + value.split(/\s+/).join('|') + ')$', 'i');
  }
}());
