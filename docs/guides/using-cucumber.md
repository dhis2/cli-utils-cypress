#### Using cucumber with feature files

If you want to use feature files, you'll have to install two dependencies:

-   @badeball/cypress-cucumber-preprocessor
-   @cypress/webpack-preprocessor

Then you can add the `cucumberPreprocessor` to the `setupNodeEvents` function.
It's important to note that this function has to be the first plugin in your
`setupNodeEvents` function! Otherwise the tests will fail (note that you'll
have to use `await` to use this plugin):

```js
import { cucumberPreprocessor } from '@dhis2/cypress-plugins'

// ...

async function setupNodeEvents(on, config) {
    await cucumberPreprocessor(on, config)

    // ...
}

// ...
```

You'll also have to provide a custom `specPattern` to tell cypress that it
should look for `.feature` files instead of `.js` files.

So in the `e2e` object in the payload passed to `defineConfig`, you can add the
following entry:

```js
// ...

module.exports = defineConfig({
    // ...
    e2e: {
        // ...
        specPattern: 'cypress/e2e/**/*.feature',
    },
})
```
