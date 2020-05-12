const dataTestNameToSelector = require('./dataTestNameToSelector')

const parseSelectorWithDataTest = (selector, prefix) => {
    return selector.replace(/\{([^}]*)\}/g, (match, dataTestName) =>
        dataTestNameToSelector(dataTestName, prefix)
    )
}

export default parseSelectorWithDataTest
