export const resourcePath = (resource, id, filterStr) => {
    const segments = ['http://localhost:1337', 'api/36', resource]

    if (id) {
        segments.push(id)
    }

    const url = segments.join('/')

    return filterStr ? `${url}?q=${filterStr}` : url
}
