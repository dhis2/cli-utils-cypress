/**
 * This exported function is provided to json-server
 * when it is invoked on the command line, and also
 * used to reset the data when the App component mounts.
 * This reset is done to ensure we have static data accross tests.
 */

const toObjectWithIndexBasedId = (name, index) => ({ name, id: index + 1 })

module.exports = () => {
    const names = ['Goofy', 'Donald', 'Duck'].map(toObjectWithIndexBasedId)
    const animals = ['chicken', 'cow', 't-rex'].map(toObjectWithIndexBasedId)
    // Needed to dynamically read the server version in capture mode
    const systemInfo = {
        version: '2.36-SNAPSHOT',
    }
    return { names, animals, systemInfo }
}
