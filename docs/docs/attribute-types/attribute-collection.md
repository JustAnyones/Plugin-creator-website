# Attribute collection

This a special documentation type which specifies
that the referenced attributes have the collection name prefixed to them.

## Example

For example, we'll use the [`road flags *`](../draft-types/car.md#flag)
attribute of a car draft.

The actual attributes are defined in the [car flags](car-flags.md) attribute type.

The flag `normal` after adding the collection name prefix would instead be `road flags normal`:
```json
{
    "type": "residential",
    "road flags normal": true
}
```
