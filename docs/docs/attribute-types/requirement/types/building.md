# BUILDING

Used to specify a building that has to be built for the requirement to be fulfilled.

## Example

The following example requires DSA Research building to be built.

```json
"requirements": [
  {
    "type": "BUILDING",
    "id": "$dsa_research_center00"
  }
]
```

## Attributes
::: attribute-list-start
::: inherit-h2 Attributes attribute-types/requirement/types/.base.md

### id
::: type: string

ID of the building.

### count
::: type: integer

**By default**, the value will be 1.

::: attribute-list-end
