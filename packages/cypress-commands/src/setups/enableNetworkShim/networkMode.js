import { getPublicValue } from '../../helper/envHelpers.js'

export const networkModes = {
    LIVE: 'live',
    CAPTURE: 'capture',
    STUB: 'stub',
}

export const isLiveMode = () =>
    !getPublicValue('networkMode') ||
    getPublicValue('networkMode') === networkModes.LIVE

export const isCaptureMode = () =>
    getPublicValue('networkMode') === networkModes.CAPTURE

export const isStubMode = () =>
    getPublicValue('networkMode') === networkModes.STUB
