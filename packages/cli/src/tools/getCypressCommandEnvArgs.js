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
        envArgs.push(`dhis2_api_stub_mode=${mode}`)
    }

    if (dhis2CoreUrl) {
        envArgs.push(`dhis2_base_url=${dhis2CoreUrl}`)
    }

    if (serverMinorVersion) {
        envArgs.push(`dhis2_server_minor_version=${serverMinorVersion}`)
    }

    return envArgs.length === 0 ? [] : ['--env', envArgs.join(',')]
}
