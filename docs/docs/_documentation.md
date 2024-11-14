# Writing documentation

This contains the general guidelines for writing documentation pages.

Documentation pages should use indentation with 4 spaces. JSON content should be indented with 2 spaces, including a whitespace between `key: value` pairs.

The style of writing should be such:

- Articles should use [**Editorial we**](https://en.wikipedia.org/wiki/We#Editorial_we) style of writing.

This documentation implements a custom preprocessor declarations.

## inherit-h<n>

```md
::: inherit-h<n> <header name> <file to inherit from> <flags>
```

Includes all the contents of the header from the specified file.
