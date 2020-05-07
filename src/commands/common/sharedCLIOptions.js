const appStart = {
    describe: 'Command to start app (disabled with empty string)',
    type: 'string',
    default: 'yarn start',
}

const waitOn = {
    describe: 'Url to wait for before running cypress',
    type: 'string',
    default: 'http-get://localhost:3000',
}

module.exports = {
    appStart,
    waitOn,
}
