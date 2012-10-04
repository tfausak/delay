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
  Default: `news.ycombinator.com www.reddit.com`.
- **Whitelist**: List of hostnames to allow.
  Default: `en.wikipedia.org www.google.com`.
- **Mode**: Which list (black or white) to use for blocking.
  Default: blacklist.

[1]: http://xkcd.com/862/
