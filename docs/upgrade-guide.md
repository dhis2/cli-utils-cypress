# Upgrade guide

## Version 10

If you've used cypress and some of dhis2's cypress tools (which required the
Cypress version to be 8), you'll have to make some modifications.
The cypress team releases a migration guide for every new version. The guides
can be found [here](https://docs.cypress.io/guides/references/migration-guide).

Here's a short list of thing that need to be updated:

* Uninstall `@dhis2/cli-utils-cypress` if you're still using it
* Cypress needs to be upgraded to version ^12.7.0
* Cypress now uses `cypress.config.js` instead of `cypress.json`
* If you're using cucumber, the `cypress-cucumber-preprocessor` package has to
  be replaced with `@badeball/cypress-cucumber-preprocessor`
  * This also means that you'll have to change the module import in the files
    with step definitions, e.g. `import from
    'cypress-cucumber-preprocessor/steps' -> import from
    '@badeball/cypress-cucumber-preprocessor'`
  * The plugin provided by `@dhis2/cypress-plugins` has to be called in the
    `setupNodeEvents` function in cypress' config file. Make sure it's the
    first call in the file as otherwise it won't work! (For more information,
    see the ["Using cucumber with feature files"](./guides/using-cucumber.md)
    guide)
* Plugins have to be configues in the configuration file instead of
  `cypress/plugins/index.js`.
* The old plugins file and folder can be deleted
* The `cypress/integration` folder has been renamed to `cypress/e2e` (in case
  you were doing end-to-end tests; For component testing, please refer to the
  official documentation)
* The `cypress/support/index.js` should be renamed to `cypress/support/e2e.js`
