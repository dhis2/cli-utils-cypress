/**
 * @description
 * Ensure the provided server minor version matches the actual server minor version
 * @returns {void}
 */
export default function validateVersionMinor() {
    const baseUrl = Cypress.env('dhis2_base_url')

    cy.request(`${baseUrl}/api/system/info`).then(response => {
        if (response.status !== 200) {
            throw new Error('Could not request system minor version')
        }

        const providedVersionMinor = parseInt(
            Cypress.env('dhis2_server_minor_version')
        )
        const versionStr = response.body.version
        const foundVersionMinor = parseInt(versionStr.split(/\.|-/)[1])

        if (providedVersionMinor !== foundVersionMinor) {
            const msg = `A capture run was started for a DHIS2-core instance with version ${providedVersionMinor} but the current instance has version ${foundVersionMinor}.`

            throw new Error(msg)
        }
    })
}
