const log = require('@dhis2/cli-helpers-engine').reporter
const { makePaths } = require('../utils/makePaths.js')
const { applyState } = require('./install/applyState.js')
const { askForPackageManager } = require('./install/askForPackageManager.js')
const {
    computeProvidedOptions,
} = require('./install/computeProvidedOptions.js')
const { options } = require('./install/options.js')
const { prettifyOptions } = require('./install/prettifyOptions.js')
const { processOptions } = require('./install/processOptions.js')

const command = 'install [groups..]'
const aliases = ['i']
const desc = 'Install DHIS2 Cypress configuration into project'

const builder = {
    listGroups: {
        description: 'List available groups',
        type: 'boolean',
        default: false,
    },
    cwd: {
        describe:
            "The directory containing the project's node_modules directory",
        type: 'string',
        default: process.cwd(),
    },
}

const handler = async argv => {
    log.info('d2-utils-cypress > install')

    const { listGroups, groups, cwd } = argv

    if (!groups || listGroups) {
        const prettified = prettifyOptions(options)
        log.print(prettified)
        return
    }

    try {
        const paths = makePaths(cwd)
        const providedOptions = computeProvidedOptions(groups)

        const initialState = {
            // will contain modules that should be imported and called
            // A non empty array with falsy values will cause produce an import
            // statement with no imported variables
            support: [],

            // will contain modules that should be imported and initialized
            plugins: [],

            // will be merged with existing contents of the cypress.json,
            // result will overwrite existing contents.
            // only if there's content
            cypressJson: {},

            // will be merged with existing contents of the cypress.env.json,
            // result will overwrite existing contents.
            // only if there's content
            cypressEnvJson: {},

            // will be merged with existing contents of the
            // .cypress-cucumber-preprocessorrc.json, result will overwrite
            // existing contents.
            // only if there's content
            cypressCucumberPreprocessorJson: {},
        }

        const state = await processOptions({
            initialState,
            providedOptions,
            paths,
        })

        const packageManager =
            state.plugins.length || state.support.length
                ? await askForPackageManager(paths)
                : 'skip'

        await applyState({ state, packageManager, paths })

        if (Object.values(state.cypressEnvJson).length) {
            log.warn(
                'Make sure to add `cypress.env.json` to the `.gitignore` file!'
            )
        }

        /*
         * This is only a temporary solution until we've figured out how to
         * install the peer dependencies of the commands & plugins packages
         * with the correct version, see: https://jira.dhis2.org/browse/CLI-56
         */
        let requiredPackages = '"cypress"'
        if (processOptions.usePluginCucumberPreprocessor) {
            requiredPackages += ' & "cypress-cucumber"'
        }

        log.warn(
            `Please install the following package(s) as peer dependency: ${requiredPackages}`
        )
    } catch (e) {
        log.error(e)
    }
}

module.exports.command = command
module.exports.aliases = aliases
module.exports.desc = desc
module.exports.builder = builder
module.exports.handler = handler
