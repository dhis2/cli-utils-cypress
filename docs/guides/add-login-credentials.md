# Adding login credentials

The cypress utility expects three values to be present in that file:

1. `dhis2BaseUrl`
1. `dhis2Username`
1. `dhis2Password`

There are various ways how to add enviroment variables to your cypress setup,
please refer to the official docs to get an overview.

**NOTE:** Putting login credentials into your codebase could be a security
risk. Please make sure that you're not exposing secrets.

One way would be to have a file ignore by git, for example the
`cypress.env.json`. It would allow different developers to use different login
credentials without having to change a versioned file.

Here is an example what a `cypress.env.json` could look like

```json
{
    "dhis2BaseUrl": "https://localhost:8080",
    "dhis2Username": "admin",
    "dhis2Password": "district"
}
```

There are also alternative ways to provide [enviroment
variables](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables)
and [encrypted
secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
to GitHub actions.
