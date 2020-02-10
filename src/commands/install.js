const path = require('path')
const fs = require('fs-extra')

const inquirer = require('inquirer')

const log = require('@dhis2/cli-helpers-engine').reporter

const {
    CONSUMING_ROOT,
    CYPRESS_ROOT,
    CYPRESS_FIXTURES,
    CYPRESS_INTEGRATION,
    CYPRESS_PLUGINS,
    CYPRESS_SUPPORT,
} = require('../utils/paths.js')

const write = (filename, data, overwrite) => {
    const filepath = path.join(CONSUMING_ROOT, filename)
    const exists = fs.existsSync(filepath)
    const content = JSON.stringify(data, null, 4)

    if (exists && !overwrite) {
        log.warn(`Existing file: '${filename}', use --force to overwrite.`)
        return
    }

    fs.writeFileSync(filepath, content, { encoding: 'utf8' })
}

function copy(from, to, overwrite = true) {
    try {
        const exists = fs.existsSync(to)
        const empty = exists ? fs.statSync(to).size === 0 : false

        const replace = empty ? true : overwrite

        if (exists && !replace) {
            log.print(`Skip existing: ${path.relative(process.cwd(), to)}`)
        } else {
            log.print(`Installing: ${path.relative(process.cwd(), to)}`)
        }
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite: replace })
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

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

    const { force, cypressConfig, cypressEnv, cucumber, support } = argv

    const prompt = inquirer.createPromptModule()

    try {
        if (cypressConfig) {
            const cypressAnswers = await prompt([
                {
                    type: 'input',
                    name: 'baseUrl',
                    message: 'URL that Cypress should run tests against:',
                    default: 'http://localhost:3000',
                },
                {
                    type: 'input',
                    name: 'testFiles',
                    message: 'Glob pattern for the test files to run:',
                    default: '**/*.feature',
                },
                {
                    type: 'confirm',
                    name: 'video',
                    message: 'Record video?',
                    default: false,
                },
                {
                    type: 'input',
                    name: 'projectId',
                    message: 'The unique Cypress project ID:',
                },
            ])

            write(
                'cypress.json',
                {
                    baseUrl: cypressAnswers.baseUrl,
                    testFiles: cypressAnswers.testFiles,
                    video: cypressAnswers.video,
                    ...(cypressAnswers.projectId
                        ? [cypressAnswers.projectId]
                        : []),
                },
                force
            )
        }

        if (cypressEnv) {
            const envAnswers = await prompt([
                {
                    type: 'input',
                    name: 'dhis2Url',
                    message: 'The DHIS2 instance URL to use as backend:',
                    default: 'http://localhost:8080',
                },
                {
                    type: 'input',
                    name: 'username',
                    message: 'DHIS2 Username:',
                    default: 'admin',
                },
                {
                    type: 'input',
                    name: 'password',
                    message: 'DHIS2 Username password:',
                    default: 'district',
                },
            ])

            write(
                'cypress.env.json',
                {
                    dhis2_base_url: envAnswers.dhis2Url,
                    dhis2_username: envAnswers.username,
                    dhis2_password: envAnswers.password,
                },
                force
            )

            log.info(
                'Make sure to add `cypress.env.json` to the `.gitignore` file!'
            )
        }

        fs.ensureDirSync(CYPRESS_ROOT)
        fs.ensureDirSync(CYPRESS_FIXTURES)
        fs.ensureDirSync(CYPRESS_INTEGRATION)
        fs.ensureDirSync(CYPRESS_PLUGINS)
        fs.ensureDirSync(CYPRESS_SUPPORT)

        if (cucumber) {
            const cucFrom = path.join(
                __dirname,
                '..',
                '..',
                'templates',
                'plugins.js'
            )
            const cucTo = path.join(CYPRESS_PLUGINS, 'index.js')
            copy(cucFrom, cucTo, force)
        }

        if (support) {
            const supFrom = path.join(
                __dirname,
                '..',
                '..',
                'templates',
                'support.js'
            )
            const supTo = path.join(CYPRESS_SUPPORT, 'index.js')
            copy(supFrom, supTo, force)
        }
    } catch (e) {
        log.error(e)
    }
}
