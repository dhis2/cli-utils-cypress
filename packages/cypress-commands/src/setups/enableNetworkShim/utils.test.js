const { getFeatureName } = require('./utils.js')

describe('getFeatureName', () => {
    beforeEach(() => {
        global.Cypress = {
            title: 'bar',
            currentTest: {
                titlePath: ['foo', 'bar'],
            },
        }
    })

    it('should use firtst item of the titlePath of the current test', () => {
        expect(getFeatureName()).toBe('foo')
    })
})
