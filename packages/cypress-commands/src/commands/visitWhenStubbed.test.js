import { visitWhenStubbed } from './visitWhenStubbed'

describe('visitWhenStubbed', () => {
    global.cy = {
        visit: jest.fn(),
    }

    afterEach(() => {
        global.cy.visit.mockClear()
    })

    it('should call `cy.visit` once', () => {
        const url = 'http://domain.tld'
        visitWhenStubbed(url)
        expect(global.cy.visit.mock.calls).toHaveLength(1)
    });

    it('should pass the url to "cy.visit"', () => {
        const url = 'http://domain.tld'
        visitWhenStubbed(url)

        const [call] = global.cy.visit.mock.calls
        const [firstArg] = call
        expect(firstArg).toEqual(url)
    });

    it('should pass a function to the `onBeforeLoad` option', () => {
        const url = 'http://domain.tld'
        visitWhenStubbed(url)

        const [call] = global.cy.visit.mock.calls
        const [_, options] = call
        expect(typeof options.onBeforeLoad).toBe('function')
    });

    it('should delete the `fetch` property on the first arg passed to the `onBeforeLoad` function', () => {
        const url = 'http://domain.tld'
        const win = { fetch: 'foobar' }
        visitWhenStubbed(url)

        const [call] = global.cy.visit.mock.calls
        const [_, options] = call
        options.onBeforeLoad(win)
        expect(win.fetch).toBe(undefined)
    });

    it('should call the `options.onBeforeLoad` function when provided', () => {
        const url = 'http://domain.tld'
        const win = { fetch: 'foobar' }
        const onBeforeLoad = jest.fn()
        visitWhenStubbed(url, { onBeforeLoad })

        const [call] = global.cy.visit.mock.calls
        const [_, options] = call
        options.onBeforeLoad(win)
        expect(onBeforeLoad).toHaveBeenCalledTimes(1)
    });
});
