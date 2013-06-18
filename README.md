# Delay

A Safari extension that delays the loading of time-wasting websites.

Inspired by [xkcd #862, "Let Go"][1].

## Settings

- **Delay**: Number of seconds to delay blocked sites.
  Default: 30 seconds.
- **Jitter**: Maximum number of seconds to randomly change the delay.
  Default: 5 seconds.
- **Show timer**: Show a countdown timer while blocked sites are delayed.
  Default: enabled.
- **Blacklist**: List of hostnames to block.
  Default: `news.ycombinator.com *.reddit.com`.
- **Whitelist**: List of hostnames to allow.
  Default: `www.google.com *.wikipedia.org`.
- **Mode**: Which list (black or white) to use for blocking.
  Default: blacklist.
- **Grace period**: Number of seconds to allow links on the same site.
  Default: 5 seconds.

The black- and whitelists both support [globbing][2].

## Changelog

- v1.7
  * Add a toolbar button.
- v1.6
  * Add a grace period.
- v1.5
  * Mark background tabs as inactive.
- v1.4
  * Prevent showing "0" on the timer.
  * Add a whitelist.
  * Allow user-supplied delay and jitter values.
  * Allow globbing patterns.
- v1.3
  * Add a setting to hide the timer.
- v1.2
  * Add a countdown timer.
- v1.1
  * Prevent skipping delay with inactive windows.
- v1.0
  * Initial release.

[1]: http://xkcd.com/862/
[2]: http://en.wikipedia.org/wiki/Glob_(programming)
