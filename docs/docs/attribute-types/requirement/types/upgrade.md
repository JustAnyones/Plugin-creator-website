# UPGRADE

Used to specify a required building upgrade for the requirement to be fulfilled.

!!! warning "Warning"
    This only works in the context of the building that has the upgrade.
    As such, `building A` cannot require `building B` to have an upgrade.

    As a workaround, you may use [custom conditions](condition.md) with fun variables.

## Example

The following example requires the current building to have `$building_upgrade_00` upgrade.

```json
"requirements": [
  {
    "type": "UPGRADE",
    "id": "$building_upgrade_00"
  }
]
```

## Attributes
::: inherit-h2 Attributes attribute-types/requirement/types/.base.md

### id
::: type: string

ID of the current building upgrade.

### invert
::: type: boolean

**By default**, the value will be false.
