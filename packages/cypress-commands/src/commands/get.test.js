import { get } from './get'

describe('get', () => {
    global.Cypress = { env: jest.fn() }

    const originalFn = jest.fn((...args) => args)

    afterEach(() => {
        originalFn.mockClear()
    })

    it('should transform the selectors', () => {
        const selectors = '{selector}'
        const expected = '[data-test="selector"]'

        get(originalFn, selectors)

        expect(originalFn).toHaveBeenCalledTimes(1)

        const originalFnArgs = originalFn.mock.calls[0]
        expect(originalFnArgs).toHaveLength(2)

        const selectorArg = originalFnArgs[0]
        expect(selectorArg).toBe(expected)
    });

    it('should use the prefix from the options', () => {
        const prefix = 'prefix'
        const selectors = '{selector}'
        const options = { prefix }
        const expected = '[data-test="prefix-selector"]'

        get(originalFn, selectors, options)

        const selectorArg = originalFn.mock.calls[0][0]
        expect(selectorArg).toBe(expected)
    });

    it('should not pass the prefix option to the originalFn', () => {
        const prefix = 'prefix'
        const selectors = '{selector}'
        const options = { prefix }
        const expected = '[data-test="prefix-selector"]'

        get(originalFn, selectors, options)

        const originalFnOptions = originalFn.mock.calls[0][1]
        expect(typeof originalFnOptions).toBe('object')
        expect(typeof originalFnOptions.prefix).toBe('undefined')
    });
});

