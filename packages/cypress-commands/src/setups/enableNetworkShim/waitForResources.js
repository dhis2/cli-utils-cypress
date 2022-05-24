/**
 * copied and slightly modified from:
 * https://github.com/cypress-io/cypress/issues/1773#issuecomment-899684192
 */

let totalRunningQueries = 0

const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'fetch') {
            totalRunningQueries++
        }
    }
})

observer.observe({
    entryTypes: ['resource'],
})

Cypress.Commands.add('waitForResources', ({ maxTries = 3 } = {}) => {
    let tries = 0

    return new Cypress.Promise((resolve) => {
        const check = () => {
            const requests = window.performance
                .getEntriesByType('resource')
                .filter((n) => n.initiatorType === 'fetch')

            if (requests.length === totalRunningQueries) {
                tries++
                if (tries === maxTries) {
                    resolve()
                } else {
                    setTimeout(check, 100)
                }
            } else {
                tries = 0
                setTimeout(check, 100)
            }
        }

        check()
    })
})
