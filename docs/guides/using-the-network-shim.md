# Using the Network Shim

#### Table of contents

-   **[About](#about)**
-   **[Quick setup](#quick-setup)**
-   **[General workflow](#general-workflow)**
-   **[Configuration](#configuration)**
    -   **[Cypress](#cypress)**
        -   **[Environment variables](#environment-variables)**
        -   **[Plugins file](#plugins-file)**
        -   **[Support file](#support-file)**
    -   **[Package scripts and dependencies](#package-scripts-and-dependencies)**
    -   **[GitHub workflow](#github-workflow)**

## About

The Network Shim makes it possible to record and play back network traffic during a cypress tests run. This means no live network requests need to be made when running e2e tests on CI, which is generally considered an anti-pattern as it can lead to flaky tests.

It consists of a cypress plugin as well as a setup utility to be placed in cypress' support file. These have to be used in conjunction. Under the hood it uses the cypress `cy.intercept()` API to intercept network traffic during a test run. It has three different _modes_:

-   `capture`: when operating in this mode, the Network Shim will allow all outgoing network traffic to the specified hosts and and store each response as a fixture (JSON file).
-   `stub`: in this mode the Network Shim intercepts all outgoing requests to the specified hosts. It will reply with the responses from previously recorded fixtures.
-   `live`: the Network Shim does not interfere with any network traffic when this mode is enabled. All network traffic is live.

By recording fixtures during a _capture run_ and then using these fixtures during a _stub run_ a full cypress test suite can be executed without a live backend. This is especially useful when running cypress tests on CI. Since it is no longer necessary to have a network connection and a backend, the cypress tests on CI can be more stable. One caveat is that the tests are slightly less realistic, since the network traffic is mocked, so the developer will have to make sure that the recorded fixtures are kept up-to-date.

A capture or stub run is executed for a specific DHIS2 api version and individual fixtures for each version are recorded/played-back during a run. This makes it easier to do cross-version testing for _feature-toggling_ apps.

## Quick setup

The command-line-tool in the package `@dhis2/cli-utils-cypress` comes with an `install` command which generates most of the configuration files documented below. See the [Setup Cypress for your project](https://cli-utils-cypress.dhis2.nu/#/guides/setting-up-cli-tool) guide for more info on how to do this.

To get up-and-running quickly do the following:

1.  Follow the getting started guide to install and configure cypress
1.  Add user credentials to a `<root>/cypress.env.json`:

    ```json
    {
        "dhis2Username": "USERNAME", // secret
        "dhis2Password": "PASSWORD", // secret
        "dhis2BaseUrl": "DHIS2_BASE_URL" // machine specific
    }
    ```

    Ensure to git-ignore the `./cypress.env.json` file
    <br/>

1.  Install tools needed to run the scripts in `package.json`:

    ```bash
    yarn install -D start-server-and-test
    ```

    <br/>

1.  Create scripts `package.json` as demonstrated [here](#package-scripts-and-dependencies)
    <br/>

1.  Perform a capture run to generate fixtures and commit the generated files:

    ```bash
    yarn cy:capture
    ```

    <br/>

1.  Copy-paste GitHub Actions job from [here](https://github.com/dhis2/workflows/blob/master/ci/dhis2-verify-app.yml#L73-L105) into the app's workflow to enable running e2e tests on CI
    <br/>

## General workflow

Once the Network Shim is up-and-running, the general steps required get a cypress test-suite running on CI are as follows:

1. Ensure a live backend is up and running
1. Ensure a fully passing cypress test-suite is in place
1. Ensure the CI workflow includes a job that runs the cypress test suite in stub mode
1. Execute a capture run, which will produce fixture files
1. Commit the generated fixture files and push to the remote
1. The test suite will now execute on CI

To setup cross-version testing essentially means taking some of the steps above multiple times:

-   Perform multiple capture runs against different versions of the live backend, so network fixtures are created for all these versions
-   Define multiple jobs in the GitHub workflow that execute a stub run against these different versions

## Configuration

A workflow as described above consists of a few moving parts, which are described in more details below. **However, running the `d2-utils-cypress install` command should create all required files**.

### Cypress

#### Environment variables

The Network Shim depends on a few cypress environment variables. These can be set using the `--env` flag when interacting with the cypress CLI, but base values should be provided as well in via the following configuration files, see the [cypress docs](https://docs.cypress.io/guides/guides/environment-variables) for more information.

##### `./cypress.config.js`

This file is meant to be checked into source control, so should not contain any sensitive or machine-specific information.

```js
module.exports = defineConfig({
    experimentalInteractiveRunEvents: true,
    projectId: 'PROJECT_ID',
    video: false,
    e2e: {
        setupNodeEvents: (on, config) => config,
        baseUrl: 'http://localhost:3000',
    },
    env: {
        dhis2DataTestPrefix: 'DATA_TEST_PREFIX',
        networkMode: 'live', // default mode for the Network Shim
        dhis2ApiVersion: 'value_from_prompt',
    },
})
```

_Notes:_

-   _Only the `env` fields are required directly by the Network Shim, but other fields are included in this example since they are required to have a working cypress setup._
-   _Interactive runs are not formally supported by the Network Shim, because `cypress open` (interactive mode) and `cypress run` have different behaviour regarding the plugin events. However, cypress is attempting to smooth things over and by setting `experimentalInteractiveRunEvents` to `true` it should theoretically be possible to at at least use stub mode in interactive mode._

##### `./cypress.env.json`

This file is meant to be git-ignored and we can use this to set local environment variable that may contain sensitive or machine-dependent information.

```json
{
    "dhis2Username": "USERNAME", // secret
    "dhis2Password": "PASSWORD", // secret
    "dhis2BaseUrl": "DHIS2_BASE_URL" // machine specific
}
```

_Note that `dhis2Username` and `dhis2Password` are not required directly by the Network Shim, but by the `enableAutologin` setup. They are included in this example since they will be needed for most use-cases._

#### Plugin setup

The `networkShim` plugin should be imported and initialised in the
setupNodeEvents function in the cypress config file (for more information about
the config file, see [Getting started](../getting-started.md)):

```js
import { networkShim } from '@dhis2/cypress-plugins'

// ...

async function setupNodeEvents(on, config) {
    // ...

    networkShim(on, config)

    // ...
}

// ...
```

The `networkShim` plugin accepts a second `options` argument. For most DHIS2
platform apps the options passed to `setupNodeEvents` will be correct so there
will be no need to pass a second argument.

For most DHIS2 Cypress test suites the `enableAutoLogin` plugin can help reduce
repetitive login steps in tests. In turn, the `enableAutoLogin` setup utility
requires the `chromeAllowXSiteCookies` plugin when using Chrome. So a typical
DHIS2 app will use those plugin alongside the `networkShim`.

Below is an example of a cypress config file with `options` supplied to the
`networkShim` and used in conjunction with `chromeAllowXSiteCookies`:

```js
const {
    networkShim,
    chromeAllowXSiteCookies,
} = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')

const networkShimOptions = {
    hosts: ['https://main-api.com', 'https://secondary-api.com'],
    staticResources: [
        '/endpoint-which-always-returns-the-same-data',
        '/another-endpoint-which-always-returns-the-same-data',
    ],
}

async function setupNodeEvents(on, config) {
    chromeAllowXSiteCookies(on, config)
    networkShim(on, {
        ...config,
        ...networkShimOptions,
    })

    return config
}

module.exports = defineConfig({
    experimentalInteractiveRunEvents: true,
    e2e: {
        setupNodeEvents,
        baseUrl: 'http://localhost:3000',
    },
})
```

#### Support file

The `enableNetworkShim` setup should be imported and executed in the [cypress support file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file). This function accepts no arguments. Typically, in a DHIS2 platform app, the `enableAutoLogin` setup is required so individual tests don't require login steps, which means the file should look like this:

```js
import { enableAutoLogin, enableNetworkShim } from '@dhis2/cypress-commands'

enableAutoLogin()
enableNetworkShim()
```

### Package scripts and dependencies

##### `./package.json`

The following `devDependencies` are required:

```json
"devDependencies": {
    "@dhis2/cypress-commands": "^#.#.#",
    "@dhis2/cypress-plugins": "^#.#.#",
},
```

And it is recommended to add some convenience commands to the `scripts` section, for example:

```json
"scripts": {
    "cy:start": "REACT_APP_NODE_ENV=test BROWSER=none yarn start",

    "cy:prepare": "start-server-and-test 'yarn cy:start' http://localhost:3000",
    "cy:open: "yarn cy:prepare 'yarn cypress open --env networkMode=live'",
    "_cy:live": "yarn cypress run --env networkMode=live",
    "cy:live: "yarn cy:prepare 'yarn _cy:live'",
    "_cy:capture": "yarn cypress run --env networkMode=capture",
    "cy:capture": "yarn cy:prepare 'yarn _cy:capture'",
    "_cy:stub": "yarn cypress run --env networkMode=stub",
    "cy:stub": "yarn cy:prepare 'yarn _cy:stub'",
},
```

The reason to keep `cy:live` and `_cy:live` separate is to be able to run
`_cy:live` again and again during development without having to wait for the app
to start every time you want to run the tests on the cli again.

_Note that `cy:stub` here is meant to perform a local stub-run, the stub run on CI should be configured differently as explained in the [GitHub workflow](#github-workflow) section._

Some notes:

1. These example scripts assume `start-server-and-test` is available. If this is not the case, run:
    ```bash
    yarn add --dev start-server-and-test
    ```
1. Setting `BROWSER=none` before running `yarn start` simply means that no browser tab is going to be opened/activated once the app is ready.
1. In the example above no `dhis2ApiVersion` is passed as a cypress env variable, even though the Network Shim relies on this. This works because that variable is declared in `./cypress.env.json` so that value is used. See the [cypress docs](https://docs.cypress.io/guides/guides/environment-variables) for more info.
1. The example above only takes into account testing against a single backend version. If an additional v36 version of DHIS2 core was available on `http://localhost:8081` and the test-suite should be executed against that backend as well, the following scripts could be added:
    ```json
    "_cy:capture-36": "yarn cypress run --env networkMode=capture,dhis2BaseUrl=http://localhost:8081,dhis2ApiVersion=36",
    "cy:capture-36: "yarn cy:prepare 'yarn _cy:capture-36'",
    "_cy:stub-36": "yarn cypress run --env networkMode=stub,dhis2BaseUrl=http://localhost:8081,dhis2ApiVersion=36",
    "cy:stub-36: "yarn cy:prepare 'yarn _cy:stub-36'",
    ```

### GitHub workflow

At DHIS2 we use GitHub Actions for CI/CD, and we provide a workflow template for DHIS2 platform apps [here](https://github.com/dhis2/workflows/blob/master/ci/dhis2-verify-app.yml#L73-L105). A typical DHIS2 platform-app will probably use the full `dhis2-verify-app` workflow and store this in `./.github/workflows/dhis2-verify-app.yml`. Once the Network Shim has been configured and a capture run has been executed, all that is needed is to uncomment the e2e job.

Below is an illustration of such a job to provide some additional info:

-   The job uses the `cypress-io/github-action@v2` GitHub action.
-   The required environment variables are set via the `env` parameter, note that:
    -   They need to be prefixed with `CYPRESS_`.
    -   The `dhis2Username` and `dhis2Password` variables are not needed because we only do a stub run on CI.
-   To perform cross-version testing, more steps like this could be added, specifying a different value for `CYPRESS_dhis2BaseUrl` and `CYPRESS_dhis2ApiVersion`.
-   In the example below `record` and `parallel` have been enabled. This will only work if the project has been registered at the cypress dashboard and has a valid record key.

```yml
e2e:
    runs-on: ubuntu-latest
    if: "!github.event.push.repository.fork && github.actor != 'dependabot[bot]'"
    strategy:
        fail-fast: false
        matrix:
            containers: [1, 2, 3, 4]
    steps:
        - name: Checkout
            uses: actions/checkout@v2
        - uses: actions/setup-node@v1
            with:
                node-version: 16.x
        - name: End-to-End tests
            uses: cypress-io/github-action@v2
            with:
                start: yarn cy:start
                wait-on: 'http://localhost:3000'
                wait-on-timeout: 300
                record: true
                parallel: true
            env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
                CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
                CYPRESS_dhis2BaseUrl: http://localhost:8080
                CYPRESS_dhis2ApiVersion: 37
                CYPRESS_networkMode: stub
```

Github actions were used as an example in these docs, but it is also possible to setup cypress test-runs with these plugins on other CI solutions.
