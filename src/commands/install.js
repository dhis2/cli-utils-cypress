const log = require('@dhis2/cli-helpers-engine').reporter

const { createCucumberConfigs } = require('./install/createCucumberConfigs.js')
const { createCypressConfig } = require('./install/createCypressConfig.js')
const {
    createCypressEnvConfig,
} = require('./install/createCypressEnvConfig.js')
const {
    createCypressSupportFile,
} = require('./install/createCypressSupportFile.js')
const { ensureDirectories } = require('./install/ensureDirectories.js')

exports.command = 'install'
exports.aliases = ['i']
exports.desc = 'Install DHIS2 Cypress configuration into project'

exports.builder = yargs =>
    yargs
        .option('cypressConfig', {
            describe: 'Configure Cypress itself (cypress.json)',
            type: 'boolean',
            default: true,
        })
        .option('cypressEnv', {
            describe: 'Configure Cypress environment file (cypress.env.json)',
            type: 'boolean',
            default: true,
        })
        .option('cucumber', {
            describe: 'Configure Cucumber with Cypress',
            type: 'boolean',
            default: true,
        })
        .option('support', {
            describe: 'Setup DHIS2 support scripts for Cypress',
            type: 'boolean',
            default: true,
        })
        .option('force', {
            describe: 'Overwrite existing configuration',
            type: 'boolean',
            default: false,
        })

exports.handler = async argv => {
    log.info('d2-utils-cypress > install')

    try {
        const { force, cypressConfig, cypressEnv, cucumber, support } = argv

        ensureDirectories()

        if (cypressConfig) {
            await createCypressConfig(force)
        }

        if (cypressEnv) {
            await createCypressEnvConfig(force)
        }

        if (cucumber) {
            await createCucumberConfigs(force)
        }

        if (support) {
            await createCypressSupportFile(force)
        }
    } catch (e) {
        log.error(e)
    }
}
