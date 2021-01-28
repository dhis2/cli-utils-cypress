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
