# CONDITION

Used to specify a custom condition for the requirement to be fulfilled.

## Example

The following example requires `_custom_fun_var` Fun variable to be set to `5`.

```json
"requirements": [
  {
    "type": "CONDITION",
    "condition": {"type": "value", "code": "_custom_fun_var", "z": 42}
  }
]
```

## Attributes
::: inherit-h2 Attributes attribute-types/requirement/types/.base.md

### condition
::: type: FunCondition

### text
::: type: string

Text to show if the condition is not fulfilled.

### text id
::: type: string

ID of text to show if the condition is not fulfilled.

### text fulfilled
::: type: string

Text to show if the condition is fulfilled.

### text id fulfilled
::: type: string

ID of text to show if the condition is fulfilled.
