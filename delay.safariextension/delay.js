(function () {
  "use strict";
  var delay, jitter, timer, list, blacklist, whitelist;

  safari.application.addEventListener('message', function (event) {
    if (event.name === 'getSettings') {
      delay = safari.extension.settings.delay;
      jitter = safari.extension.settings.jitter;
      timer = safari.extension.settings.timer;
      list = safari.extension.settings.list;
      blacklist = safari.extension.settings.blacklist;
      whitelist = safari.extension.settings.whitelist;

      delay = parseInt(delay, 10);
      if (isNaN(delay) || delay < 0) {
        delay = 0;
      }
      jitter = parseInt(jitter, 10);
      if (isNaN(jitter) || jitter < 0) {
        jitter = 0;
      }
      if (jitter) {
        delay -= jitter;
        delay += 2 * jitter * Math.random();
      }
      delay *= 1000;

      blacklist = blacklist.split(/\s+/).filter(function (hostname) {
        return hostname.toLowerCase();
      });

      whitelist = whitelist.split(/\s+/).filter(function (hostname) {
        return hostname.toLowerCase();
      });

      event.target.page.dispatchMessage('settings', {
        'blacklist': blacklist,
        'delay': delay,
        'list': list,
        'timer': timer,
        'whitelist': whitelist,
      });
    }
  }, false);
}());
