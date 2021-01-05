module.exports = function purgePluginLegacyCode(fileInfo, api) {
    try {
        const j = api.jscodeshift
        const ast = j(fileInfo.source)

        // Removes the following line:
        // const plugins = require('@dhis2/cli-utils-cypress/plugins')
        ast.find(j.CallExpression, path => {
            const isCallToRequire = path.callee.name === 'require'
            const hasCorrectArgs =
                path.arguments.length === 1 &&
                path.arguments[0].value === '@dhis2/cli-utils-cypress/plugins'

            return isCallToRequire && hasCorrectArgs
        })
            .closest(j.VariableDeclaration)
            .remove()

        // Removes the following line:
        // plugins(on, config)
        ast.find(j.CallExpression, path => {
            const isCallToPlugins = path.callee.name === 'plugins'
            const hasCorrectArgs =
                path.arguments.length === 2 &&
                path.arguments[0].name === 'on' &&
                path.arguments[1].name === 'config'
            return isCallToPlugins && hasCorrectArgs
        }).remove()

        return ast.toSource({ quote: 'single' })
    } catch (e) {
        console.error(e)
    }
}
