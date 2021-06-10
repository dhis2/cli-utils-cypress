# Troubleshooting

## Clearing cached dependencies

After upgrading cypress versions or changing the project structure it is possible some cached dependencies remain and prevent things from working correctly. The steps below ensure that alle cached dependencies are cleared and reinstalled.

Empty the cypress cache:

```bash
cypress cache clear
# or if the cypress CLI is not available
npx --no-install cypress cache clear
```

Clear all the node modules:

```bash
find ./ -iname node_modules -type d | xargs rm -r
```

Install again:

```bash
yarn install
```

Then try a command to see if things are fixed, i.e.

```bash
yarn workspace testing-network-shim-app cy:capture
```

## Executing a network-shim capture-run in the platform-app (example-app)

There is a bug in the app-shell which causes the data-engine to get an incorrect reference to the webapi base url during a cypress run. To workaround this bug, we are explicitly setting the `REACT_APP_DHIS2_BASE_URL` and `REACT_APP_DHIS2_API_VERSION` environment variables in the `cy:start` command in `./examples/platform-app/package.json`.

The consequence of this is that if you want to execute the platform-app capture-run against a different URL than `http://localhost:8080` or for another version than `37`, you will need to update this information in two places:

-   `examples/platform-app/package.json`
-   `examples/platform-app/cypress.env.json`
