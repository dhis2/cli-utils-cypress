import { getPublicValue } from './envHelpers.js'

export const getDhis2BaseUrl = () => {
    const baseUrl = getPublicValue('dhis2BaseUrl')

    if (!baseUrl) {
        throw new Error(
            'No `dhis2BaseUrl` found. Please make sure to add it to `cypress.env.json` or expose it via `config.expose` in `setupNodeEvents`'
        )
    }

    return baseUrl
}

export const setDhis2BaseUrlToLocalStorage = () => {
    const baseUrl = getDhis2BaseUrl()
    localStorage.setItem('DHIS2_BASE_URL', baseUrl)
}
