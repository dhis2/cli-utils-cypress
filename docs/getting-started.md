# Introduction

The cypress utilities provide cypress plugins and command/setups that help with
e.g. running cucumber/gherkin feature files, automatic login before tests or
recording/replaying network requests for CI.

## Setting up dependencies, commands, plugins, etc

### Installing/upgrading cypress
Cypress is just a peer dependency of the npm packages that we provide, so
you'll have to install it yourself. A guide for installing cypress can be found
on cypress' documentation
[here](https://docs.cypress.io/guides/getting-started/installing-cypress).

You should end up with a cypress config (`<root>/cypress.config.js`) which
looks something like this:

```js
const { defineConfig } = require('cypress')

// This function will be modified when we add plugins
async function setupNodeEvents(on, config) {}

module.exports = defineConfig({
  // recommended as this
  // * increases the test run time
  // * should not be done on CI
  // * can be done explicitly with `--config video=false` when needed
  video: false,

  e2e: {
    setupNodeEvents,
    baseUrl: 'http://localhost:3000',
  },
})
```

### Installing the plugins & commands

These can be installed using `npm` and `yarn`:

```bash
npm install --save-dev @dhis2/cypress-plugins @dhis2/cypress-commands
yarn add --dev @dhis2/cypress-plugins @dhis2/cypress-commands
```

### Configuring the plugins & commands

Depending on which functionality you want, there are different precedures you
can follow.

Any plugin will have to be added to the `setupNodeEvents` function, that's been
shown in the base configuration for cypress above like this:

```js
import { pluginName } from '@dhis2/cypress-plugins'

// ...

async function setupNodeEvents(on, config) {
    // ...

    pluginName(on, config)

    // ...
}

// ...
```
