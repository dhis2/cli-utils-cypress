import { parseSelectorWithDataTest } from './parseSelectorWithDataTest'

describe('parseSelectorWithDataTest', () => {
    global.Cypress = { env: jest.fn() }

    it(
        'should replace all data test names with the data-test attribute selector',
        () => {
            const selectorWithNames =
                '{datatestname-one}:first {datatestname-two}'
            const expected =
                '[data-test="datatestname-one"]:first [data-test="datatestname-two"]'
            const actual = parseSelectorWithDataTest(selectorWithNames)

            expect(actual).toBe(expected)
        })
})
