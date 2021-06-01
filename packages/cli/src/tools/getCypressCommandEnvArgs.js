exports.getCypressCommandEnvArgs = ({
    capture,
    dhis2CoreUrl,
    serverMinorVersion,
    stub,
    tags,
}) => {
    const envArgs = []

    if (tags) {
        envArgs.push(`TAGS=${tags}`)
    }

    if (capture || stub) {
        const mode = capture ? 'CAPTURE' : 'STUB'
        envArgs.push(`DHIS2_API_STUB_MODE=${mode}`)
    }

    if (dhis2CoreUrl) {
        envArgs.push(`DHIS2_BASE_URL=${dhis2CoreUrl}`)
    }

    if (serverMinorVersion) {
        envArgs.push(`DHIS2_SERVER_MINOR_VERSION=${serverMinorVersion}`)
    }

    return envArgs.length === 0 ? [] : ['--env', envArgs.join(',')]
}
