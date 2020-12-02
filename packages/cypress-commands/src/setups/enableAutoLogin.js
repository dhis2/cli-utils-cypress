export const enableAutoLogin = () => {
    before(() => {
        cy.login()
    })

    beforeEach(() => {
        // Persist this across tests so we don't have to login before each test
        Cypress.Cookies.preserveOnce('JSESSIONID')

        // This ensures the app platform knows which URL to use even if
        // REACT_APP_DHIS2_BASE_URL is undefined It also ensures that the value
        // from the cypress env is used instead of REACT_APP_DHIS2_BASE_URL
        const loginUrl = Cypress.env('dhis2_base_url')
        localStorage.setItem('DHIS2_BASE_URL', loginUrl)
    })
}
