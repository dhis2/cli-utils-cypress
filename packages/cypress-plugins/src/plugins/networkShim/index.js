const createFixturesFromState = require('./createFixturesFromState.js')
const createState = require('./createState.js')
const reportMissingRequestStubs = require('./reportMissingRequestStubs.js')
const {
    isCaptureMode,
    isLiveMode,
    isStubMode,
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

        if (isCaptureMode(env) && details.parallel) {
            throw new Error(
                'Parallel capture run detected, this is not supported'
            )
        }

        if (!isLiveMode(env)) {
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

    on('after:run', results => {
        if (isCaptureMode(env)) {
            createFixturesFromState(state, config)
        }
        if (isStubMode(env)) {
            reportMissingRequestStubs(state, results)
        }
    })
}
