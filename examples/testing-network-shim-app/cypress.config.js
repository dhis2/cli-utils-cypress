import { networkShim } from '@dhis2/cypress-plugins'
import { defineConfig } from 'cypress'

export default defineConfig({
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            networkShim(on, { staticResources: ['animals'] })
        },
        baseUrl: 'http://localhost:3000',
    },
})
