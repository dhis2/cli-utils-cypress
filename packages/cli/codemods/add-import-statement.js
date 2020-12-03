/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index
const identity = value => value

module.exports = function addImportStatement(
    fileInfo,
    api,
    { importNames, packageName } = {}
) {
    const j = api.jscodeshift
    const ast = j(fileInfo.source)

    const importDeclarations = ast.find(j.ImportDeclaration)
    const existingPackageImport = importDeclarations.filter(
        path => path.node.source.value === packageName
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
        .find(j.ImportSpecifier)
        .nodes()
        .map(path => path.imported.name)

    const allImportSpecifiers = [
        ...alreadyImportedNames,
        ...(importNames || []),
    ]
        .filter(identity)
        .filter(onlyUnique)
        .map(name => j.importSpecifier(j.identifier(name)))

    const importDeclaration = j.importDeclaration(
        allImportSpecifiers,
        j.stringLiteral(packageName),
        'value'
    )

    if (alreadyImportsPackage) {
        existingPackageImport.forEach(path => path.replace(importDeclaration))
    } else if (!importDeclarations.length) {
        // No reference import found, add import statement to the beginning of
        // the document
        const program = ast.find(j.Program).at(0).nodes()[0]
        program.body.unshift(importDeclaration)
    } else {
        // Import statements found, prepend import statement
        importDeclarations.at(0).insertBefore(importDeclaration)
    }

    return ast.toSource({ quote: 'single' })
}
