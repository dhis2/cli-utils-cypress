const path = require('path')
const inquirer = require('inquirer')

const { CYPRESS_SUPPORT } = require('../../utils/paths.js')
const { addToJson, copy, readJson } = require('../../utils/fs.js')

const TEMPLATE_PATH = path.join(__dirname, '../../../templates')
const SUPPORT_FILE_SOURCE = path.join(TEMPLATE_PATH, 'support.js')
const SUPPORT_FILE_DESTINATION = path.join(CYPRESS_SUPPORT, 'index.js')

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

const createCypressSupportFile = async force => {
    const prompt = inquirer.createPromptModule()
    copy(SUPPORT_FILE_SOURCE, SUPPORT_FILE_DESTINATION, force)

    const packageJson = readJson('package.json')
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

    addToJson('cypress.env.json', {
        dhis2_datatest_prefix: envAnswers.dhis2DatatestPrefix,
    })
}

module.exports = { createCypressSupportFile }
