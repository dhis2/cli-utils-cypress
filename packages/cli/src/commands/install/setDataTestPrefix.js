const inquirer = require('@dhis2/cli-helpers-engine').inquirer
const { readJson } = require('../../utils/fs.js')

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

module.exports.setDataTestPrefix = async ({ options, state, paths }) => {
    if (!options.setDataTestPrefix) return state

    const prompt = inquirer.createPromptModule()
    const packageJson = readJson(paths.PACKAGE_JSON)
    const moduleName = packageJson && packageJson.name ? packageJson.name : ''
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
            default: prefixDefault,
        },
    ])

    return {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            env: {
                ...state.cypressJson.env,
                dhis2DataTestPrefix: envAnswers.dhis2DatatestPrefix,
            },
        },
    }
}
