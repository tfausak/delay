# Delay

A Safari extension that delays the loading of time-wasting websites.

Inspired by [xkcd #862, "Let Go"][1].

## Settings

-   **Delay**: Number of seconds to wait before loading a blacklisted
    site. Ranges from 1 to 60 seconds. Default: 30 seconds.
-   **Jitter**: Maximum number of seconds to randomly add or subtract
    from the delay. Ranges from 0 to 10 seconds. Default: 5 seconds.
-   **Blacklist**: List of hostnames to delay. Delimited by whitespace
    and case-insensitive. Default: `news.ycombinator.com www.reddit.com`.

[1]: http://xkcd.com/862/
