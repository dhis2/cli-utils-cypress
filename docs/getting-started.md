# Introduction

The cypress utilities is a collection of npm modules that help with running
cypress, cucumber/gherkin feature files and provide some commands for a more
convenient test development process.

## Install the cli tool

First up, add the tool as a development dependency in your project. It is
required to execute the tests.

```
yarn add --dev @dhis2/cli-utils-cypress
```

From here, it is possible to use Yarn/npx to execute the tool:

```
yarn d2-utils-cypress

npx --no-install d2-utils-cypress
```

## Install the cypress commands

When using the cli tool's `install` command, this will be handled for you.
Please refer to the [**Setup Cypress for your
project**](guides/setting-up-cli-tool) guide for more detailed information. If
you need to install the commands manually, then you can do so by running:

```
yarn add --dev @dhis2/cypress-commands
# or
npm install -D @dhis2/cypress-commands
```

If you're just interested in the commands, you just need to import the file in
your support file

```js
// support files, defaults to cypress/support/index.js
import '@dhis2/cypress-commands'
```

For setup helpers, please have a look at the documentation for the available
setup functionality.
