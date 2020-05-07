const inquirer = require('inquirer')
const { write } = require('../../utils/fs.js')
const { CYPRESS_CONFIG_PATH } = require('../../utils/paths.js')

const createCypressConfig = async force => {
    const prompt = inquirer.createPromptModule()

    const cypressAnswers = await prompt([
        {
            type: 'input',
            name: 'baseUrl',
            message: 'URL that Cypress should run tests against:',
            default: 'http://localhost:3000',
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
        CYPRESS_CONFIG_PATH,
        {
            baseUrl: cypressAnswers.baseUrl,
            video: cypressAnswers.video,
            ...(cypressAnswers.projectId
                ? { projectId: cypressAnswers.projectId }
                : {}),
        },
        force
    )
}

module.exports = { createCypressConfig }
