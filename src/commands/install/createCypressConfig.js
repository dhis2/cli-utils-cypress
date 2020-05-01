const inquirer = require('inquirer')

const { write } = require('../../utils/fs.js')

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
            ...(cypressAnswers.projectId ? [cypressAnswers.projectId] : []),
        },
        force
    )
}

module.exports = { createCypressConfig }
