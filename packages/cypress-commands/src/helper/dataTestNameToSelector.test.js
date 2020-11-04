import { dataTestNameToSelector } from './dataTestNameToSelector'

describe('dataTestNameToSelector', () => {
    let envVars = {}

    global.Cypress = {
        env: jest.fn((name, value) => {
            if (!value) return envVars[name]
            envVars[name] = value
        }),
    }

    beforeEach(() => {
        envVars = {}
        global.Cypress.env.mockClear()
    })

    it('should convert a name to a data-test attribute selector', () => {
        const name = 'element-name'
        const prefix = 'prefix-name'
        const expected = '[data-test="prefix-name-element-name"]'
        const actual = dataTestNameToSelector(name, prefix)

        expect(actual).toBe(expected)
    });

    it('should not prefix the name when the prefix is an empty string', () => {
        const name = 'element-name'
        const prefix = ''
        const expected = '[data-test="element-name"]'
        const actual = dataTestNameToSelector(name, prefix)

        expect(actual).toBe(expected)
    })

    it('should use the "dhis2_datatest_prefix" env var as prefix as default', () => {
        envVars.dhis2_datatest_prefix = 'default-prefix'
        const name = 'element-name'
        const expected = '[data-test="default-prefix-element-name"]'
        const actual = dataTestNameToSelector(name)

        expect(actual).toBe(expected)
    });

    it('should not use a default prefix if "dhis2_datatest_prefix" is falsy', () => {
        envVars.dhis2_datatest_prefix = 'default-prefix'
        const name = 'element-name'
        const expected = '[data-test="default-prefix-element-name"]'
        const actual = dataTestNameToSelector(name)

        expect(actual).toBe(expected)
    });
});
