// will automatically create the commands
import './commands/find'
import './commands/get'
import './commands/login'
import './commands/stubWithFixture'
import './commands/visitWhenStubbed'

// helpers
export { dataTestNameToSelector } from './helper/dataTestNameToSelector'
export { parseSelectorWithDataTest } from './helper/parseSelectorWithDataTest'

// setup helpers
export { enableAutoLogin } from './setups/enableAutoLogin'

// backward compatibility
export const registerCommands = () => {
    cy.log('The usage of `registerCommands` has been depricated')
    cy.log('This function does nothing anymore and can be removed')
    cy.log('Commands are registered automatically')
}
