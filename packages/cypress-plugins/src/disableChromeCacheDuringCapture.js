module.exports = function disableChromeCacheDuringCapture(config) {
    return function (browser, launchOptions) {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            const disabledChromiumFeatures = [
                'SameSiteByDefaultCookies',
                'CookiesWithoutSameSiteMustBeSecure',
                'SameSiteDefaultChecksMethodRigorously',
            ]
            const disabledFeaturesArgIndex = launchOptions.args.findIndex(arg =>
                arg.startsWith('--disable-features=')
            )

            if (disabledFeaturesArgIndex === -1) {
                launchOptions.args.push(
                    `--disable-features=${disabledChromiumFeatures.join(',')}`
                )
            } else {
                const currentDisabledFeatures = launchOptions.args[
                    disabledFeaturesArgIndex
                ]
                    .replace('--disable-features=', '')
                    .split(',')

                // remove duplicates
                const allDisabledFeatures = new Set([
                    ...currentDisabledFeatures,
                    ...disabledChromiumFeatures,
                ])

                launchOptions.args[
                    disabledFeaturesArgIndex
                ] = `--disable-features=${[...allDisabledFeatures].join(',')}`
            }

            if (config.env.dhis2_api_stub_mode === 'CAPTURE') {
                // Disable the Chrome cache to avoid 304s
                launchOptions.args.push('--disk-cache-size=1')
            }
        }
        return launchOptions
    }
}
