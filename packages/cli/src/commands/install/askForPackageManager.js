const inquirer = require('@dhis2/cli-helpers-engine').inquirer
const fs = require('fs-extra')

module.exports.askForPackageManager = async paths => {
    const hasYarnLockFile = fs.existsSync(paths.YARN_LOCK)
    const hasNpmLockFile = fs.existsSync(paths.PACKAGE_JSON_LOCK)
    const defaultOption = hasYarnLockFile ? 0 : hasNpmLockFile ? 1 : 2
    const prompt = inquirer.createPromptModule()

    const userInput = await prompt([
        {
            type: 'list',
            name: 'packageManager',
            message:
                'This step will install the @dhis2/cypress-commands package. Choose your package manager',
            choices: ['yarn', 'npm', 'skip'],
            default: defaultOption,
        },
    ])

    return userInput.packageManager
}
