import { find } from './find'
import { get } from './get'
import { login } from './login'
import { stubWithFixture } from './stubWithFixture'
import { visitWhenStubbed } from './visitWhenStubbed'

export const registerCommands = () => {
    Cypress.Commands.overwrite('find', find)
    Cypress.Commands.overwrite('get', get)
    Cypress.Commands.add('login', login)
    Cypress.Commands.add('stubWithFixture', stubWithFixture)
    Cypress.Commands.add('visitWhenStubbed', visitWhenStubbed)
}
