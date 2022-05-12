const containsDataTestSyntax = new RegExp('{[^}]+}')

const isGetOrFind = (node) => {
    if (!node.value) {
        return false
    }
    if (!node.value.callee) {
        return false
    }
    if (!node.value.callee.property) {
        return false
    }

    return ['get', 'find'].includes(node.value.callee.property.name)
}

const callExpressionHasArguments = (node) => {
    if (!node.value) {
        return false
    }
    if (!node.value.arguments) {
        return false
    }

    return node.value.arguments.length
}

const selectorArgumentContainsDataTestSyntax = (node) => {
    if (!node.value) {
        return false
    }
    if (!node.value.arguments) {
        return false
    }

    const selectorArguments = node.value.arguments

    if (!Array.isArray(selectorArguments) || !selectorArguments.length) {
        return false
    }

    const [firstItem] = selectorArguments

    if (!firstItem) {
        return false
    }

    const { value } = firstItem

    return containsDataTestSyntax.test(value)
}

module.exports = function (fileInfo, api) {
    const codeshift = api.jscodeshift
    const ast = codeshift(fileInfo.source)

    ast.find(codeshift.CallExpression)
        .filter(isGetOrFind)
        .filter(callExpressionHasArguments)
        .filter(selectorArgumentContainsDataTestSyntax)
        .forEach((node) => {
            if (!node.value) {
                return false
            }
            if (!node.value.callee) {
                return false
            }
            if (!node.value.callee.property) {
                return false
            }

            const { name } = node.value.callee.property

            node.value.callee.property.name =
                name === 'get' ? 'getWithDataTest' : 'findWithDataTest'
        })

    return ast.toSource()
}
