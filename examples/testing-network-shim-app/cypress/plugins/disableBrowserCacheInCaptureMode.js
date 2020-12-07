module.exports = function (config) {
    return function (browser = {}, launchOptions) {
        if (
            browser.family === 'chromium' &&
            config.env.dhis2_api_stub_mode === 'CAPTURE'
        ) {
            // Disable the Chrome cache to avoid 304s
            launchOptions.args.push('--disk-cache-size=1')
        }
        return launchOptions
    }
}
