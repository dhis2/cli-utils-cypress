# Custom data test syntax

Some commands have the capability to interpret our custom data-text attribute
selector syntax.

Instead of having to write the whole attribute selector syntax, you can just
wrap the actual value with curly braces.

Instead of having to type `[data-test="value-of-the-data-test-attribute"]`, you
can simply write: `{value-of-the-data-test-attribute}`.

## Commands provided by `@dhis2/cypress-commands`

The `get` and `find` commands have this functionality built in. You can just
use it without having to think about this.

**NOTE:** This will change in the near future, we will introduce dedicated
commands that will have the enhanced functionality instead of overwriting the
existing commands. We will provide a codemod that you can use together with the
`d2-utils-codemods` utility to update your test code

## Commands not handled by `@dhis2/cypress-commands`

Most commands that accept a selector do not process our custom syntax. You can
use the helpers provided by the library to transform the custom selector before
you pass it to the actual command.
