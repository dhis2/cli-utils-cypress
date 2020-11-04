import { stubWithFixture } from './stubWithFixture'

describe('stubWithFixture', () => {
    global.cy = {
        route: jest.fn()
    }

    afterEach(() => {
        global.cy.route.mockClear()
    })

    it('should call `cy.route` once', () => {
        stubWithFixture({})
        expect(global.cy.route).toHaveBeenCalledTimes(1)
    });

    it('should set the method to `GET` by default', () => {
        stubWithFixture({})

        const [call] = global.cy.route.mock.calls
        const [args] = call
        expect(args.method).toBe('GET')
    });

    it('should forward the url argument', () => {
        stubWithFixture({ url: 'http://domain.tld' })

        const [call] = global.cy.route.mock.calls
        const [args] = call
        expect(args.url).toBe('http://domain.tld')
    });

    it('should forward the method argument', () => {
        stubWithFixture({ method: 'POST' })

        const [call] = global.cy.route.mock.calls
        const [args] = call
        expect(args.method).toBe('POST')
    });

    it('should set the response argument and prefix it with `fixture:`', () => {
        stubWithFixture({ fixture: 'path/to/fx' })

        const [call] = global.cy.route.mock.calls
        const [args] = call
        expect(args.response).toBe('fixture:path/to/fx')
    });
});
