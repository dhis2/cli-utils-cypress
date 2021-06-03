export const getDhis2BaseUrl = () => {
    const baseUrl = Cypress.env('dhis2BaseUrl')

    if (!baseUrl) {
        throw new Error(
            'No `dhis2BaseUrl` found. Please make sure to add it to `cypress.json`, `cypress.env.json`, or as an env var `dhis2BaseUrl`'
        )
    }

    return baseUrl
}

export const setDhis2BaseUrlToLocalStorage = () => {
    const baseUrl = getDhis2BaseUrl()
    localStorage.setItem('DHIS2_BASE_URL', baseUrl)
}
