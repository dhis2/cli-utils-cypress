// will automatically create the commands
import './commands/find'
import './commands/get'
import './commands/login'

// helpers
export { dataTestNameToSelector } from './helper/dataTestNameToSelector'
export { parseSelectorWithDataTest } from './helper/parseSelectorWithDataTest'

// setup helpers
export { enableAutoLogin } from './setups/enableAutoLogin'

// backward compatibility
export const registerCommands = () => {
    cy.log(
        'The usage of `registerCommands` has been deprecated. It is now a no-op. Commands are registered automatically.'
    )
}
