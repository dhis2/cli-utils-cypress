# Logging in and user sessions

* [Important notes!](#)
* [Sessions](#)
* [Adding login credentials](#)
* [What happened to the `enableAutoLogin` setup?](#)

## ⚠️⚠️ Important notes!

Never(!) store user credentials in your repository, as this is a big security
risk, even when repositories are private. Make sure to always either add them
to a file that's ignored by git (e.g. cypress.env.json; you'll have to add that
to the `.gitignore` yourself!) or provided by the system itself via environment
variables.

## Sessions

Cypress introduce a fairly new command, called "session". This allows apps to
define sessions, for example based on user logins. The [session command
docs](https://docs.cypress.io/api/commands/session) explain how the command
works and how it can be used in different scenarios with lots of examples.

In the case of dhis2 a session normally refers to the session particular user.
When writing the function that will log in a user, you can use a command we
provide: `fillInLoginForm`. Here's a simple session for a test with a single
user:

```
describe('Your test description here', () => {
    const name = Cypress.env('dhis2Username')
    const password = Cypress.env('dhis2Password')
    const server = Cypress.env('dhis2BaseUrl')

    beforeEach(() => {
        cy.session(
            'user',
            () => ({
                cy.visit('/')
                cy.fillInLoginForm({})
            }),
            {
                validate: () => {
                    cy.get('h1:contains("Global app headline")').should('exist')
                }
            }
        )
    })

    // ...
})
```

## Adding login credentials

The `fillInLoginForm` command expects an object with three properties:

```ts
{
    name: String
    password: String
    server: String
}
```

In order to store user names, we recommend adding them to a file that is
ignored by git, e.g. `<root>/cypress.env.json`. This way credentials won't be
stored in a repository, preventing accidentally sharing the credentials with a
person who should not have access to them.

**NOTE:** You'll have to add that file to the `<root>/.gitignore` in case it's
not in there already

Here is an example what a `cypress.env.json` could look like

```json
{
    "dhis2BaseUrl": "https://localhost:8080",
    "dhis2Username": "admin",
    "dhis2Password": "district"
}
```

If you want to log in with multple users, the `cypress.env.json` supports
complex structures like this:

```json
{
    "user": {
        "User Name": "@TheUsersPassword~",
        "Another Username": "AnotherPassword123!"
    }
}
```

There are also alternative ways to provide [enviroment
variables](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables)
and [encrypted
secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
to GitHub actions.

## What happened to the `enableAutoLogin` setup?

We have removed the `cy.login` command and `enableAutoLogin` setup.
The reason for this is that we think this should be done by the app as cypress
introduced a new command for managing sessions within and across tests.

As there can be different scenarios (e.g. only one user for all tests or
several users for one/different tests), we want to allow apps to handle
sessions management themselves. If we wrap the `session` command in one of our
commands/setups, either we reduce that possibilities apps have by restricting
the api or we create a duplicate of the `session` command. Either way, we'll
end up with a higher maintenance burden and less transparency to the consumers
of this library. We therefore think it's better for apps to handle session
management themselves while providing a cypress command that helps filling out
and submitting the login form.

As an example of why this is a much more transparent and simpler approach,
consider how `cy.session` works. It can be passed a `validate` function, which
checks whether the "session" is still active. This can be done by checking
whether a certain headline is still present, a certain username is still
displayed (for test suites using multiple users) or by checking the validity of
a third party auth token. If we had our own command, we'd either restrict that
to a particular scenario or we'd simply forward arguments, effectively creating
a clone of `cy.session` with less transparency

### Re-creating the `enableAutoLogin` command in apps

Here is the code you can add to the `<root>/cypress/support/e2e.js` that will
reproduce what we previously provided with the `enableAutoLogin` command:

```js
import { isStubMode } from '@dhi2/cypress-commands'

export const enableAutoLogin = ({ username, password, baseUrl }) => {
    if (isStubMode()) {
        return
    }

    const login = () => {
        cy.visit('/')
        cy.fillInLoginForm({
            name: username,
            password: password,
            server: baseUrl,
        })
    }

    const validateSession = () => {
        cy.get('h1:contains("Please sign in")').should('not.exist')
    }

    const createSession = () => cy.session('user', login, {
        cacheAcrossSpecs: true,
        validate: validateSession,
    })

    before(() => {
        /*
         * At the very start of a capture run the server version
         * is evaluated. This is done by querying the `system/info`
         * endpoint which requires authentication. So if there is no
         * valid session at the start of the run, we'd better log in.
         */
        createSession()
    })

    beforeEach(() => {
        createSession()
    })
}
```
