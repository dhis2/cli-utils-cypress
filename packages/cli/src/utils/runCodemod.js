const { run } = require('jscodeshift/src/Runner')

module.exports.runCodemod = (codemod, files, options) => {
    const origLog = process.stdout.write
    process.stdout.write = () => null

    return run(codemod, files, options)
        .then(result => {
            process.stdout.write = origLog
            return result
        })
        .catch(error => {
            process.stdout.write = origLog
            throw error
        })
}
