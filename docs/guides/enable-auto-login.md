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

Please refer to [Adding login credentials](./add-login-credentials.md) and
add the required data for logging in.
