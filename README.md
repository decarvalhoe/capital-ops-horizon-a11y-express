# A11y Express — one-click WCAG 2.2 quick checks (bookmarklet)

[Version française](README.fr.md)

Free, MIT, runs in your browser: **no data is sent**. Page and install: https://decarvalhoe.github.io/capital-ops-horizon-a11y-express/

Checks: `lang`, images without `alt`, `h1` and skipped heading levels, links/buttons without an accessible name, form fields without a label,
duplicate ids, targets smaller than 24×24 px (WCAG 2.2 · 2.5.8), skip link / `main` landmark. Findings can be copied as JSON.

**Try it without a real site:** open the [synthetic test page](https://decarvalhoe.github.io/capital-ops-horizon-a11y-express/examples/synthetic-page.html)
(fictional content, deliberate defects) and click the bookmarklet. Nine findings are expected and listed on the page.

## Feedback and support

Voluntary feedback goes through [GitHub Issues](https://github.com/decarvalhoe/capital-ops-horizon-a11y-express/issues/new/choose)
(bug report or feedback form). Best effort, no guaranteed response time. See [SUPPORT.md](SUPPORT.md).

**Do not send private data.** Issues are public: no non-public URLs, user data, cookies, tokens or screenshots with personal information.
Reproduce with a synthetic example such as the test page above.

## Limits

Partial automated checks, not a full WCAG audit. Reference: [WCAG 2.2 (W3C, 12 Dec 2024)](https://www.w3.org/TR/WCAG22/).

Tests: `node --test test.mjs` (including ids containing quotes, brackets and backslashes).

2026-09-24 fix (operator review): label ↔ field association through the DOM `labels` property or strict comparison of `for`, without building a
CSS selector; an id containing a quote no longer throws. Free public test of the Horizon betting league (24 Sep 2026): measurement = GitHub
traffic only, no trackers.
