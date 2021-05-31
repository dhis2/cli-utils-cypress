const appStart = {
    describe: 'Command to start app (disabled with empty string)',
    type: 'string',
    default: 'yarn start',
}

const config = {
    describe: 'Cypress config flags',
    type: 'string',
    default: '',
}

// TODO: Consider removal since this overlaps/clashes with 'config'
const port = {
    describe: 'Cypress port',
    type: 'number',
}

const serverMinorVersion = {
    describe: 'Enable netowrk shim stub mode',
    type: 'number',
    conflicts: ['--no-capture', '--no-stub'],
}

const stub = {
    describe: 'Enable netowrk shim stub mode',
    type: 'boolean',
    default: false,
    implies: 'serverMinorVersion',
}

module.exports = {
    appStart,
    config,
    port,
    serverMinorVersion,
    stub,
}
