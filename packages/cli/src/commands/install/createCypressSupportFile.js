const exec = require('@dhis2/cli-helpers-engine').exec
const log = require('@dhis2/cli-helpers-engine').reporter
const inquirer = require('inquirer')

const { addToJson, copy, readJson } = require('../../utils/fs.js')
const {
    PACKAGE_JSON,
    CYPRESS_CONFIG_ENV_PATH,
    CYPRESS_SUPPORT_FILE_SOURCE,
    CYPRESS_SUPPORT_FILE_DESTINATION,
} = require('../../utils/paths.js')

const CYPRESS_COMMANDS_PACKAGE_NAME = '@dhis2/cypress-commands'

const extractOrgName = moduleName => {
    const matches = moduleName.match(/^@[^/]+(?=\/)/)

    if (!matches || !matches.length) {
        return 'dhis2'
    }

    const [orgNameWithAtSymbol] = matches
    return orgNameWithAtSymbol.replace('@', '')
}

const extractAppName = moduleName => {
    const matches = moduleName.match(/^@[^/]+\/(.+)$/)
    const appName = matches && matches.length > 1 ? matches[1] : moduleName

    return appName
        .replace(/-app$/, '') // dhis2 apps' names end with "app"
        .replace(/\W/g, '')
}

const promptForPackageManager = async prompt => {
    let packageManager = ''

    const userInput = await prompt([
        {
            type: 'list',
            name: 'packageManager',
            message:
                'This step will install the @dhis2/cypress-commands package. Choose your package manager',
            choices: ['yarn', 'npm', 'skip'],
            default: 0,
        },
    ])

    packageManager = userInput.packageManager

    return packageManager
}

const installSupportPackage = packageManager => {
    const packageManagerArgs =
        packageManager === 'yarn' ? ['add', '--dev'] : ['install', '-D']
    const args = [...packageManagerArgs, CYPRESS_COMMANDS_PACKAGE_NAME]

    return exec({ cmd: packageManager, args })
}

const createCypressSupportFile = async (force, verbose) => {
    let packageManager
    const prompt = inquirer.createPromptModule()

    try {
        packageManager = await promptForPackageManager(prompt)
    } catch (e) {
        log.error(e.message)
        return
    }

    if (packageManager !== 'skip') {
        try {
            await installSupportPackage(packageManager, verbose)
        } catch (e) {
            return
        }
    }

    copy(CYPRESS_SUPPORT_FILE_SOURCE, CYPRESS_SUPPORT_FILE_DESTINATION, force)

    const packageJson = readJson(PACKAGE_JSON)
    const moduleName = packageJson ? packageJson.name : ''
    const orgName = extractOrgName(moduleName)
    const appName = extractAppName(moduleName)
    const prefixDefault = [
        ...(orgName ? [orgName] : []),
        ...(appName ? [appName] : []),
    ].join('-')

    const envAnswers = await prompt([
        {
            type: 'input',
            name: 'dhis2DatatestPrefix',
            message:
                'The prefix for the cy.get data-test attributes of the app (e. g. "dhis2-appname-"):',
            ...(prefixDefault ? { default: prefixDefault } : {}),
        },
    ])

    addToJson(CYPRESS_CONFIG_ENV_PATH, {
        dhis2_datatest_prefix: envAnswers.dhis2DatatestPrefix,
    })
}

module.exports = { createCypressSupportFile }
