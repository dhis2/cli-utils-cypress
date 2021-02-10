const chromeAllowXSiteCookiesLaunchOptions = [
    'SameSiteByDefaultCookies',
    'CookiesWithoutSameSiteMustBeSecure',
    'SameSiteDefaultChecksMethodRigorously',
].join(',')

module.exports = function chromeAllowXSiteCookies(on) {
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            const disabledFeaturesArgIndex = launchOptions.args.findIndex(arg =>
                arg.startsWith('--disable-features=')
            )

            if (disabledFeaturesArgIndex === -1) {
                launchOptions.args.push(
                    `--disable-features=${chromeAllowXSiteCookiesLaunchOptions}`
                )
            } else {
                const currentDisabledFeatures = launchOptions.args[
                    disabledFeaturesArgIndex
                ].replace('--disable-features=', '')

                const allDisabledFeatures = `${currentDisabledFeatures},${chromeAllowXSiteCookiesLaunchOptions}`

                launchOptions.args[
                    disabledFeaturesArgIndex
                ] = `--disable-features=${allDisabledFeatures}`
            }
        }

        return launchOptions
    })
}
