export const networkModes = {
    LIVE: 'live',
    CAPTURE: 'capture',
    STUB: 'stub',
}

export const isLiveMode = () =>
    !Cypress.expose('networkMode') ||
    Cypress.expose('networkMode') === networkModes.LIVE

export const isCaptureMode = () =>
    Cypress.expose('networkMode') === networkModes.CAPTURE

export const isStubMode = () =>
    Cypress.expose('networkMode') === networkModes.STUB
