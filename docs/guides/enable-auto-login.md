# Enabling auto login

If you don't need to handle different users, the auto login setup provided by
the cypress commands library will add some hooks, using the `cy.login` command,
that's also provided by the same library, to ensure that each time the correct
user is being logged in.

## Setting up the auto login

### enabling the auto login

First you need to enable the functionality. This can be done by running the
appropriate function in the support file (the default is
`cypress/support/index.js`)

```js
import { enableAutoLogin } from '@dhis2/cypress-commands'

enableAutoLogin()
```

### Providing the login data

The setup function uses three environment variables to login:

1. `dhis2_base_url`
1. `dhis2_username`
1. `dhis2_password`

There are various ways how to add enviroment variables to your cypress setup,
please refer to the official docs to get an overview.

**NOTE:** Putting login credentials into your codebase could be a security
risk. Please make sure that you're not exposing secrets.

One way would be to have a file ignore by git, for example the
`cypress.env.json`. It would allow different developers to use different login
credentials without having to change a versioned file.

There are also alternative ways to provide [enviroment
variables](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables)
and [encrypted
secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
to GitHub actions.

Here is an example what the environment file could look like

```json
{
    "dhis2_base_url": "https://localhost:8080",
    "dhis2_username": "admin",
    "dhis2_password": "district"
}
```
