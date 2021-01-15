const createFixturesFromState = require('./createFixturesFromState.js')
const createState = require('./createState.js')
const {
    isCaptureMode,
    isDisabledMode,
    getDefaultStaticResources,
} = require('./utils.js')

module.exports = function networkShim(
    on,
    { hosts, staticResources = getDefaultStaticResources() } = {}
) {
    let state, config, env

    on('before:run', details => {
        config = details.config
        env = config.env

        if (!hosts) {
            hosts = [env.dhis2_base_url]
        }

        if (!isDisabledMode(env)) {
            state = createState(config, hosts, staticResources)
        }
    })

    on('task', {
        getNetworkShimState() {
            return state
        },
        setNetworkShimState(newState) {
            state = newState
            return state
        },
    })

    on('after:run', () => {
        if (isCaptureMode(env)) {
            createFixturesFromState(state, config)
        }
    })
}
