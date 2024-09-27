# Requirement

Game defines the following building requirement types:

- [BUILDING](types/building.md)
- [CONDITION](types/condition.md)
- [FEATURE](types/feature.md)
- [HABITANT_COUNT](types/habitant-count.md)
- [RANK](types/rank.md)
- [UPGRADE](types/upgrade.md)

## Defining multiple requirements

We will look into how we could define a requirement for a building draft to require built DSA headquarters.

### Recommended method

```json
{
  "requirements": [
    {
      "type": "BUILDING",
      "data": {
        "id": "dsahq",
        "count": 1
      }
    }
  ]
}
```

Or we could avoid nesting attributes under data and put it directly in the requirement object:

```json
{
  "requirements": [
    {
      "type": "BUILDING",
      "id": "dsahq",
      "count": 1
    }
  ]
}
```

### Deprecated method

This is another, older way to define requirements which is deprecated:

```json
{
  "requirement": {
    "requirements": [
      {
        "type": "BUILDING",
        "data": {
          "id": "dsahq",
          "count": 1
        }
      }
    ]
  }
}
```

The excessive nesting makes it less readable therefore the former method is recommended.
