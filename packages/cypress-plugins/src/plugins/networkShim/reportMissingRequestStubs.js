const log = require('@dhis2/cli-helpers-engine').reporter

module.exports = function reportMissingRequestStubs(state, results) {
    if (
        results.totalFailed > 0 &&
        Array.isArray(state.missingRequestStubs) &&
        state.missingRequestStubs.length > 1
    ) {
        const list = state.missingRequestStubs
            .map(
                ({ method, path, testName }) =>
                    `\t- A ${method} request to "${path}" in test "${testName}"`
            )
            .join('\n')
        const warning = [
            'Some missing network fixtures were detected during the NetworkShim stub run:',
            list,
            'If you are seeing this during a stub run, but all tests in a normal cypress run pass, this could indicate you simply need to execute a capture run first.',
        ].join('\n')

        log.warn(warning)
    }
}
