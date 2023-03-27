# all

This command is supposed to work similar to `Promise.all`.
The main difference is then `Promise.all` expects promises while `cy.all`
expects functions that return a `cy.` chain.

## Example

```js
cy.all(
    () => cy.get('@value'),
    () => cy.get('.className')
).then(([value, $element]) => {
    // ...
})
```

## API

### Arguments

-   **[...Function]**

### Return

Type: void
Chaining other cypress commands after this command is not supported.
