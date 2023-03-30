export const networkModes = {
    LIVE: 'live',
    CAPTURE: 'capture',
    STUB: 'stub',
}

export const isLiveMode = () =>
    !Cypress.env('networkMode') || Cypress.env('networkMode') === networkModes.LIVE

export const isCaptureMode = () => Cypress.env('networkMode') === networkModes.CAPTURE

export const isStubMode = () => Cypress.env('networkMode') === networkModes.STUB
