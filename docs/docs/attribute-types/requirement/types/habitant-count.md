# HABITANT_COUNT

Used to specify a required numbers of inhabitants in the city for the requirement to be fulfilled.

## Example

The following example requires the player to have 100 inhabitants in the city.

```json
"requirements": [
  {
    "type": "HABITANT_COUNT",
    "count": 100
  }
]
```

The following example requires the player to have 1000 poor inhabitants in the city.

```json
"requirements": [
  {
    "type": "HABITANT_COUNT",
    "count": 1000,
    "factor0": 1,
    "factor1": 0,
    "factor2": 0
  }
]
```

The following example requires the player to have 5000 middle class and rich inhabitants in the city. However, rich inhabitants count twice as much.

For example, if you have 10 middle class and 12 rich class students, the calculation becomes:

$$
0 \cdot 0 + 10 \cdot 1 + 12 \cdot 2 = 0 + 10 + 24 = 34
$$

```json
"requirements": [
  {
    "type": "HABITANT_COUNT",
    "count": 5000,
    "factor0": 0,
    "factor1": 1,
    "factor2": 2
  }
]
```

## Attributes
::: inherit-h2 Attributes attribute-types/requirement/types/.base.md

### count
::: type: integer

The amount of inhabitants required in the city.

### factor0
::: type: integer

The factor by which the poor class inhabitant count is multiplied.
In practise, it means if the value is 0, they will NOT be considered in the count.

**By default**, the value will be 1.

### factor1
::: type: integer

The factor by which the middle class inhabitant count is multiplied.
In practise, it means if the value is 0, they will NOT be considered in the count.

**By default**, the value will be 1.

### factor2
::: type: integer

The factor by which the rich class inhabitant count is multiplied.
In practise, it means if the value is 0, they will NOT be considered in the count.

**By default**, the value will be 1.
