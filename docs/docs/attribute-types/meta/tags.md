# Tags

This is an object that contains tags.

## Supported tags

### road occupation

Only for animation drafts.

```json
{
    "road occupation": {
        "speed": 1, // float
        "remove flags": 0 // int
    }
}
```

### metro

Only for building or road drafts.

### railway

Only for building drafts.

```json
{
    "railway": {
        "levels": [] // int arr
    }
}
```

### decorator

Only for building drafts.

```json
{
    "decorator": {
        "zones": [] // zone ID arr
    }
}
```

### firework

Used for defining custom fireworks. Only works on animation drafts.

#### alpha
The direction of the particle(s).

#### speed
The speed of a particle(s).

#### speed variation

If there should be variation in speed of the particle(s).
#### n
The number of particles to spawn.

#### time
The duration of the particle(s).

#### time variation
If there should be variation in the duration of the particle(s).

#### next
The ID of the particle(s) that should spawn after the lifetime of the current particle(s) expired.


```json
{
    "firework": {
        "alpha": 0, // float
        "speed": 0, // float
        "speed variation": 0, // float
        "n": 0, // int
        "time": 0, // int
        "time variation": 0, // float
        "next": [{
            "id": "", // animation draft ID
            "p": 1, // float
            "always": false // bool
        }]
    }
}
```

### car accident

Only for road decoration drafts.

### spawn train

Only for building drafts.

```json
{
    "spawn train": {
        "id": "$train00", // train draft ID, $train00 by default
    }
}
```

<!-- TODO: apparently can be used for fun conditions -->

### budget item

For drafts that declare themselves as the budget item.

### fire brigade

Only for car drafts.

### medic

Only for car drafts.

### police

Only for car drafts.

### swat

Only for car drafts.

### console

Useful for implementing a console in a draft.

```json
{
    "console": {
        "commands": {
            "any command name here": {
                // fun actions and conditions here
            }
        }
    }
}
```

### build rail

Only for building drafts.

```json
{
    "build rail": {
        "id": "", // rail or road ID
        "offsets": [], // optional int array

        // These are only if its a road ID
        "level": 0, // int
        "all": false, // bool
        "dir": 1 // int
    }
}
```

### tool

```json
{
    "tool": {
        "marker": "" // any of the following: 'pipe', 'water', 'power', 'traffic', 'density', 'happiness', 'level'
    }
}
```

<!-- TODO: add luawrapper and dsa industry tags -->
<!-- TODO: add tags that are loaded by getDraftsWithTag -->