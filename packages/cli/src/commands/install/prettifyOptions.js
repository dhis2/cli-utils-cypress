const groupByGroupname = options =>
    options.reduce((acc, option) => {
        const { group } = option
        const existingIndex = acc.findIndex(([name]) => name === group)

        if (existingIndex === -1) {
            return [...acc, [group, [option]]]
        }

        const updatedGroup = [
            acc[existingIndex][0],
            [...acc[existingIndex][1], option],
        ]

        if (existingIndex === 0) {
            return [updatedGroup, ...acc.slice(1)]
        }

        return [
            ...acc.slice(0, existingIndex),
            updatedGroup,
            ...acc.slice(existingIndex + 1),
        ]
    }, [])

module.exports.prettifyOptions = options => {
    const inGroups = groupByGroupname(options)
    let prettified = 'You can install all groups by simply providing "all"'
    prettified += '\n* all'

    return inGroups.reduce((printStr, group) => {
        const [groupName, options] = group

        printStr += `\n\n`
        printStr += groupName
        printStr += `\n* ${groupName}/all`
        options.forEach(({ name }) => (printStr += `\n* ${groupName}/${name}`))

        return printStr
    }, prettified)
}
