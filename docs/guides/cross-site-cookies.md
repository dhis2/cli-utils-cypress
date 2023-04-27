#### Allowing cross-site cookies with chrome (v93 and below)

**NOTE**: This only works with Chrome/Chromium version 93 and below! Later versions
of the browsers have removed the flag this plugin applies when starting the
browser!

---

If you're using chrome/chromium, you'll have to start the browser with a
setting that enables cross-site cookies. These are what we currently use to
persist the logged-in state in the browser.

In order to enable that, add the following plugin to the `setupNodeEvents`
function:

```js
import { chromeAllowXSiteCookies } from '@dhis2/cypress-plugins'

// ...

async function setupNodeEvents(on, config) {
    // ...

    chromeAllowXSiteCookies(on, config)

    // ...
}

// ...
```
