# dataTestNameToSelector

This function takes a data test selector with our custom syntax and transforms
it into a standard css selector.

## Example

```js
const customSelector = '{navigation-item}'

// Will return: '[data-test="navigation-item"]'
const validCssSelector = dataTestNameToSelector(customSelector)
```

With the `dhis2_datatest_prefix` env variable set to `dhis2-libname`:

```js
const customSelector = '{navigation-item}'

// Will return: '[data-test="dhis2-libname-navigation-item"]'
const validCssSelector = dataTestNameToSelector(customSelector)
```

With a custom prefix:

```js
const customSelector = '{navigation-item}'

// Will return: '[data-test="custom-prefix-navigation-item"]'
const validCssSelector = dataTestNameToSelector(customSelector, 'custom-prefix')
```

## Arguments

**dataTestName**<br />
Type: String<br />
An individual data test selector with custom syntax.

**prefix**<br />
Type: String<br />
An optional prefix. By default the function uses the `dhis2_datatest_prefix`
environment variable or use an empty string when the env var has not been set.

---

**Returns**<br />
Type: String<br />
The valid css data-test attribute selector
