# Install command

-   [General process of the command](#general-process-of-the-command)
-   [Changing .json files](#changing-json-files)
-   [Changing .js files](#changing-js-files)
-   [The state](#the-state)
    -   [Support](#support)
    -   [Plugins](#plugins)
    -   [JSON states](#json-states)
-   [Adding options](#adding-options)
    -   [Handlers](#handlers)
-   [Applying the result state](#applying-the-result-state)
-   [Changing the install command](#changing-the-install-command)

## General process of the command

The install command can be used to both set up a new cypress project as well as
to update an existing project. This allows us to add features that the app devs
can use more or less right away by passing in the right option.

Internally a state object is used that can be modified by the handlers of each
option in any way it sees fit. By doing so, the handlers don't have to
parse/write previously written files by other handlers as that's not happening
anymore.

Instead the state object has a property for each file that might be touched by
the install command and once the command is done modifying the state, it just
needs to apply the state to the files.

## Changing .json files

For **json files** this is done by parsing the existing file, then merging the
additions with the existing data and finally overwrite the content of the file
with the new, stringified, version. Currently it's a shallow merge as we don't
add any nested properties to the json files.

## Changing .js files

For **javascript files** codemods are being used to modify these files as that
is more reliable than parsing the contents with regex. These will modify/add
import/require statements and add call expressions (AST terminology for
function calls)) to the appropriate places.

## The state

The state currently has the following shape:

```ts
interface State {
    support: String[]
    plugins: String[]
    cypressJson: Object
    cypressEnvJson: Object
    cypressCucumberPreprocessorJson: Object
}
```

### Support

The items can either be function identifiers as string or a falsy value. The
codemod ensures that each function identifier will be imported from
`@dhis2/cypress-commands` and adds a call expression to the support file.

Providing a falsy value can be done to ensure that the import statement is
there but nothing is imported (`import '@dhis2/cypress-commands'`) as this will
register the commands provided by the library automatically.

### Plugins

The plugins state works similarly to the support state with the exception that
falsy values will have no effect. Also the call expression to initialize the
imported plugins will be added to the function body of the default export
function and will always received both the `on` and `config` options.

### JSON states

These are just (currently 1 dimensional) objects that will be JSON.stringified
after being merged into the existing contents of these files.

## Adding options

Options are organized in a config file:

-   `packages/cli/src/commands/install/options.js`

Each option must have the following properties:

```ts
interface Option {
    name: String
    group: String
    handler: Function
}
```

### Handlers

The handlers have to return the complete state. If the option is turned off (or
other conditions inside the handler determine that the state should not be
changed), these return the state that's been passed in.

This is the function signature:

```ts
type Handler = ({
    state: State,
    providedOptions?: { [optionName: String]: Bool },
    paths: { [pathName]: String },
}) => State
```

## Applying the result state

Before any state is applied, a check is performed whether there are any
changes. For the support and plugins state, this is done by checking if the
arrays have length. For the json states, this is done by checking if there are
any keys in the object (`Object.keys(state[..]).length`).

Before any state is written, some functions are called that ensure that the
required files are in place. If they're missing, then the install command will
copy a template from `packages/cli/template/`.

If the support or plugins states have length, the respective dependency will
be installed (the user will be asked for the appropriate package manager,
if there's a yarn.lock, then yarn will be the default option, if there's a
package-lock.json, npm will be the default option. Otherwise 'skip' will be the
default option).

## Changing the install command

The files that need to be touched are mostly the options.js and the handlers
you're working on. The apply process needs only to be touched if addition files
or codemods need to be added.

To make it easier to work with the command during development, you can add the
following code snippet after the option processing (state creation process):

```js
console.log(JSON.stringify(state, null, 2))
process.exit()
```

This way you can inspect the final state's contents without adding/changing any
file.
