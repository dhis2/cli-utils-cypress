module.exports = {
    transform: {
        '\\.js$': [
            'babel-jest',
            {
                configFile: './babel.jest.config.js',
            },
        ],
    },
}
