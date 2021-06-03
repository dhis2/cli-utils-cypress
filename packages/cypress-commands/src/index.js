// will automatically create the commands
import './commands/all'
import './commands/findWithDataTest'
import './commands/getWithDataTest'
import './commands/login'

// helpers
export { dataTestNameToSelector } from './helper/dataTestNameToSelector'
export { parseSelectorWithDataTest } from './helper/parseSelectorWithDataTest'
export {
    getDhis2BaseUrl,
    setDhis2BaseUrlToLocalStorage,
} from './helper/dhis2BaseUrl.js'
export { isLiveMode, isCaptureMode, isStubMode } from './helper/networkMode.js'

// setup helpers
export { enableAutoLogin } from './setups/enableAutoLogin'
export { enableNetworkShim } from './setups/enableNetworkShim'

// backward compatibility
export const registerCommands = () => {
    cy.log(
        'The usage of `registerCommands` has been deprecated. It is now a no-op. Commands are registered automatically.'
    )
}
