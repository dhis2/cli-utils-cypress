module.exports = function addSetup(fileInfo, api, options = {}) {
    const j = api.jscodeshift
    const ast = j(fileInfo.source)

    const { setupInits } = options

    if (!setupInits) {
        console.error(
            new Error(
                'You need to provide an array of plugins to be initialized'
            )
        )

        return
    }

    if (!Array.isArray(setupInits)) {
        console.error(new Error('"setupInits" must be an array'))
        return
    }

    const existingSetupInits = ast
        .find(j.CallExpression)
        .filter(path => setupInits.includes(path.value.callee.name))
        .nodes()
        .map(path => path.callee.name)

    const missingSetupInits = setupInits.filter(
        pluginInit => !existingSetupInits.includes(pluginInit)
    )

    const program = ast.find(j.Program).at(0).nodes()[0]

    missingSetupInits.forEach(missingSetupInit => {
        const callExpression = j.callExpression(
            j.identifier(missingSetupInit),
            []
        )

        program.body.push(j.expressionStatement(callExpression))
    })

    return ast.toSource({ quote: 'single' })
}
