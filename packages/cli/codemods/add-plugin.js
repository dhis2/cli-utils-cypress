module.exports = function addPlugin(fileInfo, api, options = {}) {
    const j = api.jscodeshift
    const ast = j(fileInfo.source)

    const { pluginInits } = options

    if (!pluginInits) {
        console.error(
            new Error(
                'You need to provide an array of plugins to be initialized'
            )
        )

        return
    }

    if (!Array.isArray(pluginInits)) {
        console.error(new Error('"pluginInits" must be an array'))
        return
    }

    const existingPluginInits = ast
        .find(j.CallExpression)
        .filter(path =>
            pluginInits.find(({ name }) => name === path.value.callee.name)
        )
        .nodes()
        .map(path => path.callee.name)

    const missingPluginInits = pluginInits.filter(
        ({ name }) => !existingPluginInits.includes(name)
    )

    const callBody = ast
        .find(j.BlockStatement)
        .filter(
            path =>
                path.parentPath &&
                path.parentPath.parentPath &&
                path.parentPath.parentPath.value &&
                path.parentPath.parentPath.value.left &&
                path.parentPath.parentPath.value.left.object &&
                path.parentPath.parentPath.value.left.property &&
                path.parentPath.parentPath.value.left.object.name ===
                    'module' &&
                path.parentPath.parentPath.value.left.property.name ===
                    'exports'
        )

    if (callBody.length !== 1) {
        console.error(
            new Error(
                'It seems there are multiple default exports in your plugin file'
            )
        )
    }

    missingPluginInits.reverse().forEach(({ name, needsConfig }) => {
        const args = [j.identifier('on')]
        if (needsConfig) args.push(j.identifier('config'))

        const callExpression = j.callExpression(j.identifier(name), args)

        callBody.forEach(path => {
            path.get('body').value.unshift(
                j.expressionStatement(callExpression)
            )
        })
    })

    return ast.toSource({ quote: 'single' })
}
