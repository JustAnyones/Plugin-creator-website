# Car spawner

## Attributes

### cars
::: type: string[]

An array of car IDs.

### radius
::: type: integer

Radius for the cars to be spawned. Big radius are heavy on computation, so try to avoid them. To cover the whole map you might use a value like 512.

### count
::: type: integer

Number of cars that should be spawned.

### targets
::: type: string[]

An array of building ids that should be targeted by spawned cars.
If empty, any buildings will be targeted (default behavior).
Value of `null` will represent the building in which the car spawner is defined (for convenience).


## Example

```json
"car spawner": [{
    "radius": 50, // default is 16
    "count": 5, // default is draft width
    "cars": ["$doyoulikemycar"], // string array of car draft IDs
    "tags": [], // string array of tags
    "targets": [], // string array of targets
    "target flags": [], // string array of target flags
    "flags": [ // string array of flags
        "military", "police",
        "swat", "garbage",
        "tractor"
    ],
    "level": 5 // default is 0
}]
```
