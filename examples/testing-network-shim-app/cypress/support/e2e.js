import { enableNetworkShim, isCaptureMode } from '@dhis2/cypress-commands'
import { resetDb } from '../../src/json-server/resetDb.js'

afterEach(() => {
    if (isCaptureMode()) {
        resetDb()
    }
})
enableNetworkShim()
