# Setup Cypress for your project

The CLI module provides an `install` command, that will set up some
prerequisites for Cypress:

```
d2-utils-cypress install
```

When calling the `install` command without any arguments, you'll be prompted a
list of groups of settings and their individual settings:

```
d2-utils-cypress install
d2-utils-cypress > install
You can install all groups by simply providing "all"
* all

cypress-config
* cypress-config/all
* cypress-config/setBaseUrl
* cypress-config/setRecordVideo
* cypress-config/setProjectId

login
* login/all
* login/setLoginUser
* login/setLoginPassword
* login/setLoginBackendUrl

support
* support/all
* support/registerCommands
* support/setDataTestPrefix

network-shim
* network-shim/all
* network-shim/useCommandsSetupEnableNetworkShim
* network-shim/usePluginNetworkShim

cucumber
* cucumber/all
* cucumber/usePluginChromeAllowXSiteCookies
* cucumber/usePluginCucumberPreprocessor
* cucumber/setTestFilesToFeatureFiles
* cucumber/setNonGlobalStepDefinitions
```

Simply choose the group that you want to install, for fresh installations the
`all` group is probably what you want:

```
d2-utils-cypress install all
```

But you can also provide specific groups and/or members if you want to skip
some of the others:

```
d2-utils-cypress install cypress-config/all cucumber/all
```

Please refer to [Adding login credentials](./add-login-credentials.md) and
add the required data for logging in.
