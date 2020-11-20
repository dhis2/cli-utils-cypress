const containsDataTestSyntax = new RegExp('{[^}]+}')

const isGetOrFind = node =>
    ['get', 'find'].includes(node.value.callee.property.name)

const callExpressionHasArguments = node => node.value.arguments.length

const selectorArgumentContainsDataTestSyntax = node => {
    const selectorArguments = node.value.arguments
    const [{ value }] = selectorArguments
    return containsDataTestSyntax.test(value)
}

module.exports = function (fileInfo, api) {
    const codeshift = api.jscodeshift
    const ast = codeshift(fileInfo.source)

    ast.find(codeshift.CallExpression)
        .filter(isGetOrFind)
        .filter(callExpressionHasArguments)
        .filter(selectorArgumentContainsDataTestSyntax)
        .forEach(node => {
            const { name } = node.value.callee.property

            node.value.callee.property.name =
                name === 'get' ? 'getWithDataTest' : 'findWithDataTest'
        })

    return ast.toSource()
}
