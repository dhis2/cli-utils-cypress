export const getDhis2BaseUrl = () => {
    const baseUrl = Cypress.expose('dhis2BaseUrl')

    if (!baseUrl) {
        throw new Error(
            'No `dhis2BaseUrl` found. Please make sure to expose it via `config.expose` in `setupNodeEvents` or set it via `Cypress.expose()`'
        )
    }

    return baseUrl
}

export const setDhis2BaseUrlToLocalStorage = () => {
    const baseUrl = getDhis2BaseUrl()
    localStorage.setItem('DHIS2_BASE_URL', baseUrl)
}
