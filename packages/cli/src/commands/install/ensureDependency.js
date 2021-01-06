const fs = require('fs')
const exec = require('@dhis2/cli-helpers-engine').exec
const log = require('@dhis2/cli-helpers-engine').reporter

const isYarnWorkspacesRoot = () => {
    try {
        const rootDir = process.cwd()
        const packageJson = fs.readFileSync(`${rootDir}/package.json`, {
            encoding: 'utf8',
        })

        return 'workspaces' in JSON.parse(packageJson)
    } catch (_error) {
        throw new Error(
            `'d2-utils-cypress install' must be run from the root of an npm package, but no valid 'package.json' was found in '${process.cwd()}'`
        )
    }
}

const installSupportPackage = (packageName, packageManager, cwd) => {
    const isYarn = packageManager === 'yarn'
    const packageManagerArgs = isYarn ? ['add', '--dev'] : ['install', '-D']

    const args = [...packageManagerArgs, packageName]

    if (isYarn && isYarnWorkspacesRoot()) {
        args.push('-W')
    }

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
