// will automatically create the commands
import './commands/all.js'
import './commands/findWithDataTest.js'
import './commands/getWithDataTest.js'
import './commands/login.js'

// helpers
export { dataTestNameToSelector } from './helper/dataTestNameToSelector.js'
export { parseSelectorWithDataTest } from './helper/parseSelectorWithDataTest.js'
export {
    getDhis2BaseUrl,
    setDhis2BaseUrlToLocalStorage,
} from './helper/dhis2BaseUrl.js'
export { isLiveMode, isCaptureMode, isStubMode } from './helper/networkMode.js'

// setup helpers
export { enableAutoLogin } from './setups/enableAutoLogin.js'
export { enableNetworkShim } from './setups/enableNetworkShim/index.js'

// backward compatibility
export const registerCommands = () => {
    cy.log(
        'The usage of `registerCommands` has been deprecated. It is now a no-op. Commands are registered automatically.'
    )
}
