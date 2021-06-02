export const isLiveMode = () =>
    !Cypress.env('networkMode') || Cypress.env('networkMode') === 'live'

export const isCaptureMode = () => Cypress.env('networkMode') === 'capture'

export const isStubMode = () => Cypress.env('networkMode') === 'stub'
