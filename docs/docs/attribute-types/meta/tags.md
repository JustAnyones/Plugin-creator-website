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

Only for animation drafts.

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