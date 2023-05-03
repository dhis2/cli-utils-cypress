## [10.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v10.0.1...v10.0.2) (2023-05-03)


### Bug Fixes

* **cucumber plugin:** require dependencies inside plugin function ([#395](https://github.com/dhis2/cli-utils-cypress/issues/395)) ([fa8c3a7](https://github.com/dhis2/cli-utils-cypress/commit/fa8c3a7794fa4198377ede7051fd1f5247610460))

## [10.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v10.0.0...v10.0.1) (2023-05-01)


### Bug Fixes

* **auto login:** use api to login ([#394](https://github.com/dhis2/cli-utils-cypress/issues/394)) ([8b22e7b](https://github.com/dhis2/cli-utils-cypress/commit/8b22e7b4626c77cba1cd8e509e9bebc1d50ac667))

# [10.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v9.0.2...v10.0.0) (2023-04-27)


### Features

* remove cli util, update cypress to v12 & small conceptual adjustments ([#393](https://github.com/dhis2/cli-utils-cypress/issues/393)) ([855e259](https://github.com/dhis2/cli-utils-cypress/commit/855e259f2ab8dcd01145fdf4e5bd6a661aa99968))


### BREAKING CHANGES

* cypress 12 uses a different naming scheme for folders, files and extensions
* This removes the `d2-utils-cypress` cli tool!

Co-authored-by: Hendrik de Graaf <hendrik@dhis2.org>

## [9.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v9.0.1...v9.0.2) (2022-02-07)


### Bug Fixes

* **create fixtures from state:** use `replace` instead of `replaceAll` ([088a5fc](https://github.com/dhis2/cli-utils-cypress/commit/088a5fcf5c60c7e6a546108b7f7e8b0fc79f1e7d))

## [9.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v9.0.0...v9.0.1) (2021-11-09)


### Bug Fixes

* **network shim:** wait for network idle after tests ([d025422](https://github.com/dhis2/cli-utils-cypress/commit/d025422296fb6e60d8534440bb2b5c433f7c9bfe))

# [9.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.6...v9.0.0) (2021-11-04)


### Bug Fixes

* **network shim:** use "Cypress.currentTest" in "getFeatureName" ([573bd78](https://github.com/dhis2/cli-utils-cypress/commit/573bd78943c4b301b49c9c94ae57eb00e78a3e56))


### chore

* **dependencies:** add cypress@^8.2 as peer dependency ([e0c40e7](https://github.com/dhis2/cli-utils-cypress/commit/e0c40e79c38a99c2e2f5096bd5afb209ddc34197))


### BREAKING CHANGES

* **dependencies:** Adds cypress with min version 8.2 as peer dependency

## [8.0.6](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.5...v8.0.6) (2021-10-28)


### Bug Fixes

* require module in function scope ([#288](https://github.com/dhis2/cli-utils-cypress/issues/288)) ([c51ab5d](https://github.com/dhis2/cli-utils-cypress/commit/c51ab5d6d8d642fa93e8583cb7769146a02160d2))

## [8.0.5](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.4...v8.0.5) (2021-10-27)


### Bug Fixes

* **network-shim:** fix out-of-bound index of non-deterministic requests ([#287](https://github.com/dhis2/cli-utils-cypress/issues/287)) ([ea407a9](https://github.com/dhis2/cli-utils-cypress/commit/ea407a90203153d134d2002c3bb86acb9a5822cb))

## [8.0.4](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.3...v8.0.4) (2021-10-01)


### Bug Fixes

* **network shim:** add missing "experimentalInteractiveRunEvents" ([880c490](https://github.com/dhis2/cli-utils-cypress/commit/880c490b54eb91a84ba7af6ae760af409ff1affb))

## [8.0.3](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.2...v8.0.3) (2021-08-24)


### Bug Fixes

* **network-shim:** ensure 304s are dealt with correctly ([#262](https://github.com/dhis2/cli-utils-cypress/issues/262)) ([c654b9b](https://github.com/dhis2/cli-utils-cypress/commit/c654b9b7708bbd546271828371f10292ae13aea3))

## [8.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.1...v8.0.2) (2021-08-23)


### Bug Fixes

* **network-shim:** handle 304s from different scenarios in the same feature ([#261](https://github.com/dhis2/cli-utils-cypress/issues/261)) ([0242c1e](https://github.com/dhis2/cli-utils-cypress/commit/0242c1ef3ae9fa012f830ca3daa8e95710c21d92))

## [8.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0...v8.0.1) (2021-06-10)


### Bug Fixes

* **install cmd:** use correct env vars for network shim in install command ([#234](https://github.com/dhis2/cli-utils-cypress/issues/234)) ([a91da93](https://github.com/dhis2/cli-utils-cypress/commit/a91da931d8f6c86955f77f67f6a000440d44edcf))

# [8.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v7.0.1...v8.0.0) (2021-06-10)


### Bug Fixes

* **network-shim:** ensure DHIS2_BASE_URL is available in localStorage ([#214](https://github.com/dhis2/cli-utils-cypress/issues/214)) ([741ab4b](https://github.com/dhis2/cli-utils-cypress/commit/741ab4b0a78a9aa889654aaf94fba5385cabc881))
* **network-shim:** ensure in-test fixtures are used instead of shim fixtures ([#176](https://github.com/dhis2/cli-utils-cypress/issues/176)) ([84a1907](https://github.com/dhis2/cli-utils-cypress/commit/84a1907dd629051e268c4b8fe2c21bbd1fcb24c3))
* **network-shim:** fix before hook bug ([#201](https://github.com/dhis2/cli-utils-cypress/issues/201)) ([0e1cd4c](https://github.com/dhis2/cli-utils-cypress/commit/0e1cd4c551f2a5a54ece2b46aa10279e8e6b5335))
* **network-shim:** only incrementally update missing request stub state ([#209](https://github.com/dhis2/cli-utils-cypress/issues/209)) ([e2ccea8](https://github.com/dhis2/cli-utils-cypress/commit/e2ccea84ac867006c412406f2db45d4aa8540a2c))
* **network-shim:** report missing stubs if at least one is found ([#208](https://github.com/dhis2/cli-utils-cypress/issues/208)) ([45b3331](https://github.com/dhis2/cli-utils-cypress/commit/45b3331f866f6c0644e40a7a02c5fbdd40e7b842))
* **network-shim:** use electron instead of chrome for runs ([#213](https://github.com/dhis2/cli-utils-cypress/issues/213)) ([ae73686](https://github.com/dhis2/cli-utils-cypress/commit/ae73686835a5b7aadc4c05dd6f9361502fbd13d5))


### chore

* remove node 10 support ([6245ef2](https://github.com/dhis2/cli-utils-cypress/commit/6245ef22f2df4964e05099939b4f9f821331ebf4))


### Code Refactoring

* **install command:** combine network shim command & plugin options ([4bc9a4e](https://github.com/dhis2/cli-utils-cypress/commit/4bc9a4efe3a956078d82d3cb8101ada88895f2ca))
* drop the app-start flag ([9674d87](https://github.com/dhis2/cli-utils-cypress/commit/9674d870115dd222da46cf2d0dba636b1dbce536))
* simplify cypress-plugin and cli-utils-cypress ([dc58462](https://github.com/dhis2/cli-utils-cypress/commit/dc58462b7e131b5c3aeb49e0f8ba6e520ba89030))
* wait for baseUrl to become available ([745194f](https://github.com/dhis2/cli-utils-cypress/commit/745194fb1be5abf3c3a3b87eb2435a0c3d6576f3))


### Features

* **enable auto login:** add option to install command ([e9dde4e](https://github.com/dhis2/cli-utils-cypress/commit/e9dde4e4f2a977160ae9da7f83667d25f4de20b2))
* **install cmd:** warn about potentially missing peer depds (temporarily) ([c3046aa](https://github.com/dhis2/cli-utils-cypress/commit/c3046aaccf22b152cf6743037c00a1d4fcbdc761))


### BREAKING CHANGES

* **install command:** The two options are merged into one, which is now
called "enableNetworkShim".
* New minimum version for NodeJS is 12.x.
* Drop run and open commands
We want to be consistent with how Cypress runs locally and in CI and
since we cannot use d2-utils-cypress in CI, we shouldn't run it through
d2-utils-cypress locally either.
* Change configuration keys to camelCase.
- dhis2_username => dhis2Username
- dhis2_password => dhis2Password
- dhis2_base_url => dhis2BaseUrl
- dhis2_datatest_prefix => dhis2DataTestPrefix
- dhis2_api_version => dhis2ApiVersion
* dhis2_api_stub_mode renamed to networkMode
Instead of describing the mode of the plugin, it is a bit easier to
understand if we speak in terms of the network:
- do we want to capture the network traffic (networkMode=capture),
- do we want to stub it (networkMode=stub),
- or do we want to run it against a live backend (networkMode=live)?
* 'DISABLED' renamed to 'LIVE'
To better describe the state of the network when running tests instead
of describing the state of the plugin, DISABLED is now LIVE.
* isDisabledMode renamed to isLiveMode.
Similar to the above, to better describe the state of the network vs.
the state of the plugin, replace usages of isDisabledMode with
isLiveMode.
* 'CAPTURE'|'STUB'|'LIVE' are now lowercase when passed
to the environment.
Replace networkMode=LIVE with networkMode=live.
* Drop the --waitOn flag
As of now we wait on the baseUrl that is defined in cypress.json, as
that is the URL that the tests are going to run against.
* Drop support for the --appStart flag.
As a consumer, you are expected to either use something like
concurrently to run the app server and the cypress server in a single
process, or run then manually in two separate processes. This is no
longer done automatically.
* **network-shim:** bumps cypress 1 major version, to v7

* fix(network-shim): filter request and response headers properties

This was planned anyway to keep fixtures stable.
But also turned out to be required due to a bug:
https://github.com/cypress-io/cypress/issues/16420

* fix(network-shim): disable auto-login during stub run

* fix(network-shim): add 'system/info' resource to static resources list

* feat(network-shim): run tests suite on CI

* docs(network-shim): add info about the network-shim test suite

* chore(network-shim): add command to locally run full e2e suite

* docs(network-shim): add info reg troubleshooting and local full test run

* chore(cy local): run build command before cypress commands

Co-authored-by: Jan-Gerke Salomon <jgs.salomon@gmail.com>

# [8.0.0-alpha.9](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.8...v8.0.0-alpha.9) (2021-06-09)


### chore

* remove node 10 support ([6245ef2](https://github.com/dhis2/cli-utils-cypress/commit/6245ef22f2df4964e05099939b4f9f821331ebf4))


### Code Refactoring

* **install command:** combine network shim command & plugin options ([4bc9a4e](https://github.com/dhis2/cli-utils-cypress/commit/4bc9a4efe3a956078d82d3cb8101ada88895f2ca))


### Features

* **enable auto login:** add option to install command ([e9dde4e](https://github.com/dhis2/cli-utils-cypress/commit/e9dde4e4f2a977160ae9da7f83667d25f4de20b2))
* **install cmd:** warn about potentially missing peer depds (temporarily) ([c3046aa](https://github.com/dhis2/cli-utils-cypress/commit/c3046aaccf22b152cf6743037c00a1d4fcbdc761))


### BREAKING CHANGES

* **install command:** The two options are merged into one, which is now
called "enableNetworkShim".
* New minimum version for NodeJS is 12.x.

# [8.0.0-alpha.8](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.7...v8.0.0-alpha.8) (2021-06-03)


### Code Refactoring

* simplify cypress-plugin and cli-utils-cypress ([dc58462](https://github.com/dhis2/cli-utils-cypress/commit/dc58462b7e131b5c3aeb49e0f8ba6e520ba89030))


### BREAKING CHANGES

* Drop run and open commands
We want to be consistent with how Cypress runs locally and in CI and
since we cannot use d2-utils-cypress in CI, we shouldn't run it through
d2-utils-cypress locally either.
* Change configuration keys to camelCase.
- dhis2_username => dhis2Username
- dhis2_password => dhis2Password
- dhis2_base_url => dhis2BaseUrl
- dhis2_datatest_prefix => dhis2DataTestPrefix
- dhis2_api_version => dhis2ApiVersion
* dhis2_api_stub_mode renamed to networkMode
Instead of describing the mode of the plugin, it is a bit easier to
understand if we speak in terms of the network:
- do we want to capture the network traffic (networkMode=capture),
- do we want to stub it (networkMode=stub),
- or do we want to run it against a live backend (networkMode=live)?
* 'DISABLED' renamed to 'LIVE'
To better describe the state of the network when running tests instead
of describing the state of the plugin, DISABLED is now LIVE.
* isDisabledMode renamed to isLiveMode.
Similar to the above, to better describe the state of the network vs.
the state of the plugin, replace usages of isDisabledMode with
isLiveMode.
* 'CAPTURE'|'STUB'|'LIVE' are now lowercase when passed
to the environment.
Replace networkMode=LIVE with networkMode=live.

# [8.0.0-alpha.7](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.6...v8.0.0-alpha.7) (2021-06-02)


### Code Refactoring

* drop the app-start flag ([9674d87](https://github.com/dhis2/cli-utils-cypress/commit/9674d870115dd222da46cf2d0dba636b1dbce536))
* wait for baseUrl to become available ([745194f](https://github.com/dhis2/cli-utils-cypress/commit/745194fb1be5abf3c3a3b87eb2435a0c3d6576f3))


### BREAKING CHANGES

* Drop the --waitOn flag
As of now we wait on the baseUrl that is defined in cypress.json, as
that is the URL that the tests are going to run against.
* Drop support for the --appStart flag.
As a consumer, you are expected to either use something like
concurrently to run the app server and the cypress server in a single
process, or run then manually in two separate processes. This is no
longer done automatically.

# [8.0.0-alpha.6](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.5...v8.0.0-alpha.6) (2021-05-31)


### Bug Fixes

* **network-shim:** ensure DHIS2_BASE_URL is available in localStorage ([#214](https://github.com/dhis2/cli-utils-cypress/issues/214)) ([741ab4b](https://github.com/dhis2/cli-utils-cypress/commit/741ab4b0a78a9aa889654aaf94fba5385cabc881))

# [8.0.0-alpha.5](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.4...v8.0.0-alpha.5) (2021-05-31)


### Bug Fixes

* **network-shim:** use electron instead of chrome for runs ([#213](https://github.com/dhis2/cli-utils-cypress/issues/213)) ([ae73686](https://github.com/dhis2/cli-utils-cypress/commit/ae73686835a5b7aadc4c05dd6f9361502fbd13d5))

# [8.0.0-alpha.4](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.3...v8.0.0-alpha.4) (2021-05-27)


### Bug Fixes

* **network-shim:** only incrementally update missing request stub state ([#209](https://github.com/dhis2/cli-utils-cypress/issues/209)) ([e2ccea8](https://github.com/dhis2/cli-utils-cypress/commit/e2ccea84ac867006c412406f2db45d4aa8540a2c))

# [8.0.0-alpha.3](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.2...v8.0.0-alpha.3) (2021-05-27)


### Bug Fixes

* **network-shim:** report missing stubs if at least one is found ([#208](https://github.com/dhis2/cli-utils-cypress/issues/208)) ([45b3331](https://github.com/dhis2/cli-utils-cypress/commit/45b3331f866f6c0644e40a7a02c5fbdd40e7b842))

# [8.0.0-alpha.2](https://github.com/dhis2/cli-utils-cypress/compare/v8.0.0-alpha.1...v8.0.0-alpha.2) (2021-05-27)


### Bug Fixes

* **network-shim:** fix before hook bug ([#201](https://github.com/dhis2/cli-utils-cypress/issues/201)) ([0e1cd4c](https://github.com/dhis2/cli-utils-cypress/commit/0e1cd4c551f2a5a54ece2b46aa10279e8e6b5335))

# [8.0.0-alpha.1](https://github.com/dhis2/cli-utils-cypress/compare/v7.0.1...v8.0.0-alpha.1) (2021-05-18)


### Bug Fixes

* **network-shim:** ensure in-test fixtures are used instead of shim fixtures ([#176](https://github.com/dhis2/cli-utils-cypress/issues/176)) ([84a1907](https://github.com/dhis2/cli-utils-cypress/commit/84a1907dd629051e268c4b8fe2c21bbd1fcb24c3))


### BREAKING CHANGES

* **network-shim:** bumps cypress 1 major version, to v7

* fix(network-shim): filter request and response headers properties

This was planned anyway to keep fixtures stable.
But also turned out to be required due to a bug:
https://github.com/cypress-io/cypress/issues/16420

* fix(network-shim): disable auto-login during stub run

* fix(network-shim): add 'system/info' resource to static resources list

* feat(network-shim): run tests suite on CI

* docs(network-shim): add info about the network-shim test suite

* chore(network-shim): add command to locally run full e2e suite

* docs(network-shim): add info reg troubleshooting and local full test run

* chore(cy local): run build command before cypress commands

Co-authored-by: Jan-Gerke Salomon <jgs.salomon@gmail.com>

## [7.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v7.0.0...v7.0.1) (2021-03-10)


### Bug Fixes

* **install:** add imports to support file ([#146](https://github.com/dhis2/cli-utils-cypress/issues/146)) ([410a33e](https://github.com/dhis2/cli-utils-cypress/commit/410a33e95f47736dea274f688a9a3532eb820ea8))

# [7.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v6.0.1...v7.0.0) (2021-02-10)


### Code Refactoring

* make the network shim cypress-plugin based ([#128](https://github.com/dhis2/cli-utils-cypress/issues/128)) ([3701dec](https://github.com/dhis2/cli-utils-cypress/commit/3701dec4c4b427e015074c328ec24c7a77b97992))


### BREAKING CHANGES

* To use the network-shim's functionality the project will need to use the new network shim plugin on top of the existing enableNetworkShim setup. Also, the network shim options (an object with hosts and staticResources) need to be passed to the networkShim plugin, the enableNetworkShim setup doesn't accept any arguments anymore.

## [6.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v6.0.0...v6.0.1) (2021-02-10)


### Bug Fixes

* **replace getfind mod:** add checks to prevent crashes ([#135](https://github.com/dhis2/cli-utils-cypress/issues/135)) ([07175fe](https://github.com/dhis2/cli-utils-cypress/commit/07175fe39859738693682e30fe61c3dc66101b82))

# [6.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v5.1.1...v6.0.0) (2021-02-05)


### Code Refactoring

* **get find commands:** rename to get-/findWithDataTest [BREAKING CHANGE] ([3b63762](https://github.com/dhis2/cli-utils-cypress/commit/3b63762f2d3f8faa1c514d9a1395fad270b7b37b))


### BREAKING CHANGES

* **get find commands:** This removes overwriting the existing get and find
commands. Instead new commands will be provided: `getWIthDataTest` and
`findWIthDataTest

## [5.1.1](https://github.com/dhis2/cli-utils-cypress/compare/v5.1.0...v5.1.1) (2021-01-28)


### Bug Fixes

* address lifecycle and response type bugs (CLI-25) ([#131](https://github.com/dhis2/cli-utils-cypress/issues/131)) ([7a849d2](https://github.com/dhis2/cli-utils-cypress/commit/7a849d21df91332e4caf53903b6a640f59d7f62e))

# [5.1.0](https://github.com/dhis2/cli-utils-cypress/compare/v5.0.3...v5.1.0) (2021-01-07)


### Features

* introduce network shim ([#106](https://github.com/dhis2/cli-utils-cypress/issues/106)) ([2755e89](https://github.com/dhis2/cli-utils-cypress/commit/2755e89432fe57dd2000724c9abee9297b953341))

## [5.0.3](https://github.com/dhis2/cli-utils-cypress/compare/v5.0.2...v5.0.3) (2021-01-06)


### Bug Fixes

* **commands:** move jscodeshift to regular dependencies ([#122](https://github.com/dhis2/cli-utils-cypress/issues/122)) ([05d9909](https://github.com/dhis2/cli-utils-cypress/commit/05d9909565dfe22529eec4650e2e3fd93e3de420))

## [5.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v5.0.1...v5.0.2) (2021-01-06)


### Bug Fixes

* build both commands and plugins when running yarn build ([#125](https://github.com/dhis2/cli-utils-cypress/issues/125)) ([1153358](https://github.com/dhis2/cli-utils-cypress/commit/11533580417b4930104b6cf086ef5a3845efa73f))

## [5.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v5.0.0...v5.0.1) (2021-01-06)


### Bug Fixes

* **commands:** add `-W` to `yarn add` when in yarn workspaces root ([#121](https://github.com/dhis2/cli-utils-cypress/issues/121)) ([6c5a369](https://github.com/dhis2/cli-utils-cypress/commit/6c5a36978c04da1dddd0f424294691a1df46a663))
* **commands:** adjust generated code changes ([#124](https://github.com/dhis2/cli-utils-cypress/issues/124)) ([2c6de92](https://github.com/dhis2/cli-utils-cypress/commit/2c6de929e15a425de5bcf63e92c24e0115af0a7e))

# [5.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v4.1.0...v5.0.0) (2020-12-18)


### Code Refactoring

* **install cmd:** restructure options & improve code maintainability ([6b83b9a](https://github.com/dhis2/cli-utils-cypress/commit/6b83b9a8d6aa82294b260311cb5105d1ba20fd44))


### Features

* **plugins:** create own package ([19c0bf8](https://github.com/dhis2/cli-utils-cypress/commit/19c0bf8d503e31ab1bc6cebff00e6011a52fe652))


### BREAKING CHANGES

* **install cmd:** This commit changes the way this package has to be
used as the options have changed completely

# [4.1.0](https://github.com/dhis2/cli-utils-cypress/compare/v4.0.0...v4.1.0) (2020-12-16)


### Features

* **codemods:** add codemod for transforming get/find ([daca680](https://github.com/dhis2/cli-utils-cypress/commit/daca680b4960933ee0d854453bdf00c618286955))
* **codemods:** add codemod for transforming get/find ([#102](https://github.com/dhis2/cli-utils-cypress/issues/102)) ([046c50d](https://github.com/dhis2/cli-utils-cypress/commit/046c50d3f8cc89316ddf006087aeabbe540eb53f))

# [4.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v3.2.0...v4.0.0) (2020-11-26)


### Bug Fixes

* **enable auto login:** preserve JSESSIONID cookie correctly after api update ([402d597](https://github.com/dhis2/cli-utils-cypress/commit/402d5971b6b53b5e4871f8744b82a982524f2ee6))


### Code Refactoring

* **commands:** remove superfluous commands ([ab58063](https://github.com/dhis2/cli-utils-cypress/commit/ab580636e7bb4fe28efa12bf8554d8608da92105))


### BREAKING CHANGES

* **commands:** Removes "stubWithFixture" and "visitWhenStubbed"
commands. Usage of native cypress functions is preferred

# [3.2.0](https://github.com/dhis2/cli-utils-cypress/compare/v3.1.3...v3.2.0) (2020-11-25)


### Features

* **auto login:** add setup function for enabling autologin ([cf4cd78](https://github.com/dhis2/cli-utils-cypress/commit/cf4cd7850f2511aa7cf0fd71e0b16704c7d8574c))

## [3.1.3](https://github.com/dhis2/cli-utils-cypress/compare/v3.1.2...v3.1.3) (2020-11-19)


### Bug Fixes

* **run command:** make command exit correctly ([249c587](https://github.com/dhis2/cli-utils-cypress/commit/249c5876f85e10e9b09d46aa497f07f700a761c4))

## [3.1.2](https://github.com/dhis2/cli-utils-cypress/compare/v3.1.1...v3.1.2) (2020-11-17)


### Bug Fixes

* update the login button target ([154c1a4](https://github.com/dhis2/cli-utils-cypress/commit/154c1a4394fa07ea844fa3115b92bb60ec5eba35))

## [3.1.1](https://github.com/dhis2/cli-utils-cypress/compare/v3.1.0...v3.1.1) (2020-11-06)


### Bug Fixes

* cut release to complete migration to jira ([e6bda2b](https://github.com/dhis2/cli-utils-cypress/commit/e6bda2bf3f9e4629e249dc2819e8e902837f8fed))

# [3.1.0](https://github.com/dhis2/cli-utils-cypress/compare/v3.0.3...v3.1.0) (2020-11-03)


### Features

* enable cucumber tags for cli run command ([#90](https://github.com/dhis2/cli-utils-cypress/issues/90)) ([9132626](https://github.com/dhis2/cli-utils-cypress/commit/9132626a2959a7dfd6815b7ab1b4ac5bd0d18b0f))

## [3.0.3](https://github.com/dhis2/cli-utils-cypress/compare/v3.0.2...v3.0.3) (2020-11-02)


### Bug Fixes

* check for element existence using length as 'find' always returns an object ([#88](https://github.com/dhis2/cli-utils-cypress/issues/88)) ([1848f2e](https://github.com/dhis2/cli-utils-cypress/commit/1848f2e8b35f96756fc2e6f3efd9df97eab3c05a))

## [3.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v3.0.1...v3.0.2) (2020-10-30)


### Bug Fixes

* **cypress commands release:** run build script before deploying ([#86](https://github.com/dhis2/cli-utils-cypress/issues/86)) ([c717d1f](https://github.com/dhis2/cli-utils-cypress/commit/c717d1f64fb91dbd5c53d3e91ec286428e1d5995))

## [3.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v3.0.0...v3.0.1) (2020-10-29)


### Bug Fixes

* **cypress commands release:** add publish config to package.json ([#85](https://github.com/dhis2/cli-utils-cypress/issues/85)) ([056f0a8](https://github.com/dhis2/cli-utils-cypress/commit/056f0a81c580dfde05183439a34fc789aec46c09))

# [3.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v2.2.2...v3.0.0) (2020-10-29)


### Code Refactoring

* turn repository a monorepo ([#37](https://github.com/dhis2/cli-utils-cypress/issues/37)) ([66f2d3e](https://github.com/dhis2/cli-utils-cypress/commit/66f2d3eb681694e041eecc38d9c77f7353bca138))


### BREAKING CHANGES

* Adopting to this change requires manual installation of
the @dhis2/cypress-commands package

## [2.2.2](https://github.com/dhis2/cli-utils-cypress/compare/v2.2.1...v2.2.2) (2020-10-16)


### Bug Fixes

* correct url and needed props for login command ([#78](https://github.com/dhis2/cli-utils-cypress/issues/78)) ([d0d1bcf](https://github.com/dhis2/cli-utils-cypress/commit/d0d1bcf9c1e3621e9dd2549224ab27fb26765871))

## [2.2.1](https://github.com/dhis2/cli-utils-cypress/compare/v2.2.0...v2.2.1) (2020-05-27)


### Bug Fixes

* remove require statements that causes support index file to throw an err ([#40](https://github.com/dhis2/cli-utils-cypress/issues/40)) ([e3dfe1d](https://github.com/dhis2/cli-utils-cypress/commit/e3dfe1d527f0fcc36ec447a1a8709f8691629343))

# [2.2.0](https://github.com/dhis2/cli-utils-cypress/compare/v2.1.0...v2.2.0) (2020-05-07)


### Features

* add concurrently & wait-on command ([#34](https://github.com/dhis2/cli-utils-cypress/issues/34)) ([b1d067b](https://github.com/dhis2/cli-utils-cypress/commit/b1d067ba5f085aff4040852a6a10f2cddab958d1))

# [2.1.0](https://github.com/dhis2/cli-utils-cypress/compare/v2.0.0...v2.1.0) (2020-05-01)


### Features

* add data-test selector syntax & prompt user for data test prefix ([12761a1](https://github.com/dhis2/cli-utils-cypress/commit/12761a172033cfbd32a7255c3ee10b046045fa4e))
* add datatest functionality to get/find commands ([9b3837b](https://github.com/dhis2/cli-utils-cypress/commit/9b3837bb5b44435c8b63cd9947a9370feab9261a))
* prompt consumer for data test prefix ([7d7bacd](https://github.com/dhis2/cli-utils-cypress/commit/7d7bacdcaa18a77317976076ccce6206fef60e8e))

# [2.0.0](https://github.com/dhis2/cli-utils-cypress/compare/v1.0.2...v2.0.0) (2020-04-02)


### Bug Fixes

* set correct entry-point ([901f682](https://github.com/dhis2/cli-utils-cypress/commit/901f6825ba68b22e88cdbc2623436205bca7ea0f))


### chore

* update node engine to >= 10 ([bb45181](https://github.com/dhis2/cli-utils-cypress/commit/bb45181559272628053b2a457fdacab2eb923733))


### BREAKING CHANGES

* Require Node version 10 or above.

## [1.0.2](https://github.com/dhis2/cli-utils-cypress/compare/v1.0.1...v1.0.2) (2020-02-10)


### Bug Fixes

* simplify plugins loading ([7fcf8d4](https://github.com/dhis2/cli-utils-cypress/commit/7fcf8d439cec4f928e3c81cbdbc709ffebafcd7a))

## [1.0.1](https://github.com/dhis2/cli-utils-cypress/compare/v1.0.0...v1.0.1) (2020-02-10)


### Bug Fixes

* simplify template setup ([190e65f](https://github.com/dhis2/cli-utils-cypress/commit/190e65f4326b92957c7f7870d96083f4f19607f3))

# 1.0.0 (2020-02-10)


### Bug Fixes

* copy cucumber config ([2ff4f92](https://github.com/dhis2/cli-utils-cypress/commit/2ff4f92cd8776d5a5a41b7a1a721d6269f534f86))


### Features

* create dhis2 cypress utility lib ([c07e3a4](https://github.com/dhis2/cli-utils-cypress/commit/c07e3a4c773676de8c41963abd5b35943584ae3a))
