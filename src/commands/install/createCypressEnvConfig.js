const log = require('@dhis2/cli-helpers-engine').reporter
const inquirer = require('inquirer')

const { write } = require('../../utils/fs.js')
const { CYPRESS_CONFIG_ENV_PATH } = require('../../utils/paths.js')

const createCypressEnvConfig = async force => {
    const prompt = inquirer.createPromptModule()

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
        CYPRESS_CONFIG_ENV_PATH,
        {
            dhis2_base_url: envAnswers.dhis2Url,
            dhis2_username: envAnswers.username,
            dhis2_password: envAnswers.password,
        },
        force
    )

    log.info('Make sure to add `cypress.env.json` to the `.gitignore` file!')
}

module.exports = { createCypressEnvConfig }
