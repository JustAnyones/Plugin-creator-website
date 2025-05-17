# RANK

Used to specify a required city level for the requirement to be fulfilled.

## Example

The following example requires the city to be at level 23.

```json
"requirements": [
  {
    "type": "RANK",
    "lvl": 23
  }
]
```

## Attributes
::: inherit-h2 Attributes attribute-types/requirement/types/.base.md

### id
::: type: string
::: deprecated: Specifying required rank by ID is deprecated. Use [`lvl`](#lvl) attribute instead.

ID of the required rank draft.

### lvl
::: type: integer

Required rank integer value.
