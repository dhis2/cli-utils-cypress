/**
 * @description
 * Ensure the provided server minor version matches the actual server minor version
 * @returns {void}
 */
export default function validateVersionMinor() {
    const baseUrl = Cypress.env('dhis2BaseUrl')

    cy.request(`${baseUrl}/api/system/info`).then(response => {
        if (response.status !== 200) {
            throw new Error('Could not request system minor version')
        }

        const providedVersionMinor = Cypress.env('dhis2ApiVersion')
        const versionStr = response.body.version
        const foundVersionMinor = versionStr.split(/\.|-/)[1]

        if (parseInt(providedVersionMinor) !== parseInt(foundVersionMinor)) {
            const msg = `A capture run was started for a DHIS2-core instance with version ${providedVersionMinor} but the current instance has version ${foundVersionMinor}.`

            throw new Error(msg)
        }
    })
}
