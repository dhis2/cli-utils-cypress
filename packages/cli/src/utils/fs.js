const fs = require('fs-extra')
const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter

const readJson = filepath => {
    const exists = fs.existsSync(filepath)

    if (!exists) {
        log.warn(`File: '${filepath}' does not exist`)
        return
    }

    let content
    try {
        content = JSON.parse(fs.readFileSync(filepath))
    } catch (e) {
        log.error(`Could not parse contents of file: '${filepath}'`)
        return
    }

    return content
}

const addToJson = (filepath, data, overwrite = false) => {
    const exists = fs.existsSync(filepath)

    if (!exists) {
        log.warn(`File: '${filepath}' does not exist`)
        return
    }

    if (overwrite) {
        return write(filepath, data, true)
    }

    const existingData = readJson(filepath)
    return write(filepath, { ...existingData, ...data }, true)
}

const write = (filepath, data, overwrite) => {
    const exists = fs.existsSync(filepath)
    const content = JSON.stringify(data, null, 4)

    if (exists && !overwrite) {
        log.warn(`Existing file: '${filepath}', use --force to overwrite.`)
        return
    }

    fs.writeFileSync(filepath, content, { encoding: 'utf8' })
}

function copy(from, to, overwrite = true) {
    try {
        const exists = fs.existsSync(to)
        const empty = exists ? fs.statSync(to).size === 0 : false

        const replace = empty ? true : overwrite

        if (exists && !replace) {
            log.print(`Skip existing: ${path.relative(process.cwd(), to)}`)
        } else {
            log.print(`Installing: ${path.relative(process.cwd(), to)}`)
        }
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite: replace })
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

module.exports = {
    readJson,
    addToJson,
    write,
    copy,
}
