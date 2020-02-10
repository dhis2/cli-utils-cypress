# Install the tool

First up, add the tool as a development dependency in your project.

```
yarn add --dev @dhis2/cli-utils-cypress
```

From here, it is possible to use Yarn/npx to execute the tool:

```
yarn d2-utils-cypress

npx --no-install d2-utils-cypress
```

We are going to use `d2-utils-cypress` in this document, so prefix the
commands with your preference.

# Setup Cypress for your project

The CLI module provides an `install` command, that will set up some
prerequisites for Cypress, and guide you through generating a
configuration and a local environment configuration file.

```
d2-utils-cypress install
```

There are additional options to do more specific configuration as well,
check out all the options with the `--help` command.

E.g. to set up Cypress without the support scripts:

```
d2-utils-cypress install --no-support
```

And to install without the Cypress configuration, for example on a
developer machine:

```
d2-utils-cypress install \
    --no-cypress-config \
    --no-support
```
