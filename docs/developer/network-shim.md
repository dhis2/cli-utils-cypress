# Network shim - Developer documentation

The network shim consists of both commands (`@dhis2/cypress-commands`) as well
as a plugin (`@dhis2/cypress-plugins`).

## The state of the network shim

The JSDocs detail the properties of the state, you can find it in the
[`createState.js`](../../packages/cypress-plugins/src/plugins/networkShim/createState.js).

The state manages which requests have been made, which of them were static or
non-deterministic. It also contains the fixture file names of the recorded
responses.

The state also contains some configuration options for the network shim like
the server's minor version, hosts, static resources and the capture mode.

## The plugin

The plugin needs the `on` callback provided by the root plugin function
supplied to cypress, it does not need the config.

The plugin operates on three different runtime events:

-   `before:run`
-   `task`
-   `after:run`

### `before:run`

Before the run, the network shim's state is initialized with the help of the
`createState` function.

### `task`

See [`task reference`](https://docs.cypress.io/api/commands/task#Syntax).
Tasks are triggered by the tests themselves during the run.
The plugin provides two tasks:

-   `getNetworkShimState`
    -   Just returns the whole state
-   `setNetworkShimState`
    -   Overwrites the entire state

### `after:run`

This one is only used during capture mode. The recorded responses will be
written to fixture files, the state is not being mutated at this stage.

## The commands setup

The network shim has to be enabled by using the setup function.
It registers several hooks:

-   `before`
    -   Validates the server minor version in capture mode
-   `beforeEach`
    -   Retrieves the network shim's state and creates a cypress alias for it
    -   Initializes capturing requests in capture mode
    -   Initializes stubbing requests in stub mode
-   `afterEach`
    -   Writes the updated state during capture mode using the cypress-alias and
        the `setNetworkShimState` task

### Capturing requests

The network shim uses `cy.intercept` to catch outgoing requests and to read
the request's information.

For each incoming request, the shim checks if the request has already been
made.

If yes, the response body of the already recorded data changes from a
string to an array to store all possible, different responses. Additionally a
lookup array is added to map the request sequence to the stored responses while
avoiding duplication of the responses. Requests that respond with a 304 status
code are treated as deterministic responses, even if the response body does not
match with the response body of the previous request.

If no, then the response will be added to the requestStubs.

## The test suite

The network shim currently doesn't have any test coverage via unit tests, but it does have a e2e test suite that verifies it is working correctly. Since the network shim is a cypress tool, we have created a test suite via example apps that implement the network shim:

-   Both capture and stub mode are being tested in the `testing-network-shim-app`, since this is using a simple json-server as a backend which can be spun up on CI.
-   The test-suite for the `testing-network-shim-app` verifies that basic capturing and stubbing process works and includes a few particular tests that assert specific behaviour:
    -   Dealing with repeating requests and 304's
    -   Dealing with nonDeterministic responses
    -   Dealing with query parameters
    -   Override behaviour of `cy.intercept`
-   The test-suite in the platform app is only there as a smoke test for DHIS2 platform apps. On CI we can only use stub mode, because we can't access a real stable backend. The captured network fixtures are committed, so stub mode can run on CI.
