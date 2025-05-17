# Writing documentation

This contains the general guidelines for writing documentation pages.

## Style


The style of writing should be such:

- Articles should use [**Editorial we**](https://en.wikipedia.org/wiki/We#Editorial_we) style of writing.

### Formatting
- Documentation content should be indented with 4 spaces.
- JSON content should be indented with 2 spaces, including a whitespace between `key: value` pairs.

### RCI
- RCI should be expanded to `Residential`, `Commercial` and `Industrial`.
- Different RCI levels should be referred to as `poor`, `middle` and `rich` class inhabitants or workers, in the case of industrial buildings or contexts.


## Preprocessor declarations

This documentation implements a custom preprocessor declarations.

### inherit-h<n>

```md
::: inherit-h<n> <header name> <file to inherit from> <flags>
```

Includes all the contents of the header from the specified file.
