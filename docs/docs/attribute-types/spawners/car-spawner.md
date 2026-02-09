# Car spawner

## Attributes
::: attribute-list-start

### cars
::: type: string[]

An array of car IDs that should be spawned. If multiple are provided, a random car is decided to be spawned.

### radius
::: type: integer

Radius for the cars to be spawned. Big radius are heavy on computation, so try to avoid them. To cover the whole map you might use a value like 512.

### count
::: type: integer

Number of cars that should be spawned.

### tags
::: type: string[]

An array of tags. This will add car drafts with the specified tags to the spawn possibilities.

### targets
::: type: string[]

An array of building and bus stop draft IDs that should be targeted by spawned cars.
If empty, any buildings will be targeted (default behavior).
Value of `null` will represent the building in which the car spawner is defined (for convenience).

### target tags
::: type: string[]

An array of building and bus stop draft tags that should be targeted by spawned cars.

::: attribute-list-end

## Example

```json
"car spawner": [{
    "radius": 50, // default is 16
    "count": 5, // default is draft width
    "cars": ["$doyoulikemycar"], // string array of car draft IDs
    "tags": [], // string array of tags
    "targets": [], // string array of targets
    "target tags": [], // string array of target tags
    "flags": [ // string array of flags
        "military", "police",
        "swat", "garbage",
        "tractor"
    ],
    "level": 5 // default is 0
}]
```

