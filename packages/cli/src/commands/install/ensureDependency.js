const exec = require('@dhis2/cli-helpers-engine').exec
const log = require('@dhis2/cli-helpers-engine').reporter

const installSupportPackage = (packageName, packageManager, cwd) => {
    const packageManagerArgs =
        packageManager === 'yarn' ? ['add', '--dev'] : ['install', '-D']

    const args = [...packageManagerArgs, packageName]

    return exec({ cmd: packageManager, args, cwd })
}

/**
 * @param {String} packageName
 * @param {String} packageManager
 * @param {String} cwd
 * @returns {void}
 */
module.exports.ensureDependency = (packageName, packageManager, paths) => {
    if (packageManager !== 'skip') {
        log.info(`Installing the package "${packageName}"`)
        log.debug(`Using the package manager "${packageManager}"`)
        return installSupportPackage(packageName, packageManager, paths.cwd)
    }

    log.info(
        `Skipping installing the package "${packageName}" as no package manger was provided`
    )

    return Promise.resolve()
}
