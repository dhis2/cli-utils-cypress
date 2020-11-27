# parseSelectorWithDataTest

## Example

```js
const customSelector = '{navigation-item}:first-child {link-text}'

// Will return:
// '[data-test="navigation-item"]:first-child [data-test="link-text"]'
const validCssSelector = dataTestNameToSelector(customSelector)
```

With the `dhis2_datatest_prefix` env variable set to `dhis2-libname`:

```js
const customSelector = '{navigation-item}:first-child {link-text}'

// Will return:
// '[data-test="dhis2-libname-navigation-item"]:first-child [data-test="dhis2-libname-link-text"]'
const validCssSelector = dataTestNameToSelector(customSelector)
```

With a custom prefix:

```js
const customSelector = '{navigation-item}:first-child {link-text}'

// Will return:
// '[data-test="custom-prefix-navigation-item"]:first-child [data-test="custom-prefix-link-text"]'
const validCssSelector = dataTestNameToSelector(customSelector, 'custom-prefix')
```

## Arguments

**selector**<br />
Type: String<br />
A data test selector with custom syntax.

**prefix**<br />
Type: String<br />
An optional prefix. By default the function uses the `dhis2_datatest_prefix`
environment variable or use an empty string when the env var has not been set.

---

**Returns**<br />
Type: String<br />
The whole valid css selector with valid data-test selectors
