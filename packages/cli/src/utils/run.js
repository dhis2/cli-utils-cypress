const spawn = require('cross-spawn')

exports.spawn = (cmd, args, opts) =>
    spawn.sync(cmd, args, {
        stdio: 'inherit',
        ...opts,
    })

exports.run = (cmd, { args, opts }, callback) => {
    return handleRun(
        spawn.sync(cmd, args, {
            stdio: 'inherit',
            ...opts,
        }),
        callback
    )
}

function handleRun(result, callback) {
    if (result.error) {
        throw result.error
    }

    if (callback) {
        callback(result)
    }

    if (result.status !== 0) {
        process.exit(result.status === null ? 0 : result.status)
    }
}
