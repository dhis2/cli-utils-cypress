/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index

module.exports = function addRequireStatement(
    fileInfo,
    api,
    { plugins, packageName } = {}
) {
    const importNames = plugins.map(({ name }) => name)

    try {
        const j = api.jscodeshift
        const ast = j(fileInfo.source)

        const requireStatements = ast
            .find(j.VariableDeclaration)
            .filter(
                path =>
                    path.value.declarations[0].init.type === 'CallExpression' &&
                    path.value.declarations[0].init.callee.name === 'require'
            )

        const existingPackageImport = requireStatements.filter(
            path =>
                path.value.declarations[0].init.arguments.length === 1 &&
                path.value.declarations[0].init.arguments[0].value ===
                    packageName
        )

        const alreadyImportsPackage = existingPackageImport.length

        if (alreadyImportsPackage.length > 1) {
            console.error(
                new Error(
                    [
                        `Package "${packageName}" is being imported multiple times.`,
                        'Currently only one import statement is supported.',
                        'Please merge the import statements in your target files first',
                    ].join(' ')
                )
            )
        }

        const alreadyImportedNames = existingPackageImport
            .find(j.Identifier)
            .nodes()
            .map(path => path.name)
            .filter(name => name !== 'require')
            .filter(onlyUnique)

        const allImportNames = [...alreadyImportedNames, ...importNames].filter(
            onlyUnique
        )

        const requireStatement = j.variableDeclaration('const', [
            j.variableDeclarator(
                j.objectPattern(
                    allImportNames.map(importName => {
                        const identifier = j.identifier(importName)
                        const prop = j.property('init', identifier, identifier)
                        prop.shorthand = true
                        return prop
                    })
                ),
                j.callExpression(j.identifier('require'), [
                    j.literal(packageName),
                ])
            ),
        ])

        if (alreadyImportsPackage) {
            existingPackageImport.forEach(path =>
                path.replace(requireStatement)
            )
        } else if (!requireStatements.length) {
            const program = ast.find(j.Program).at(0).nodes()[0]
            program.body.unshift(requireStatement)
        } else {
            requireStatements.at(0).insertBefore(requireStatement)
        }

        return ast.toSource({ quote: 'single' })
    } catch (e) {
        console.error(e)
    }
}
