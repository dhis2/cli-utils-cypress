const dataTestNameToSelector = require('./dataTestNameToSelector.js')

const parseSelectorWithDataTest = (selector, prefix) => {
    return selector.replace(/\{([^}]*)\}/g, (match, dataTestName) =>
        dataTestNameToSelector(dataTestName, prefix)
    )
}

export default parseSelectorWithDataTest
