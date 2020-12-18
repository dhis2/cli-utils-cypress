const { options } = require('./options.js')

module.exports.computeProvidedOptions = groups =>
    options.reduce((acc, option) => {
        const optionIsSelected =
            groups.includes('all') ||
            groups.includes(`${option.group}/all`) ||
            groups.includes(`${option.group}/${option.name}`)

        return { ...acc, [option.name]: optionIsSelected }
    }, {})
