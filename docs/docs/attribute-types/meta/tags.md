# Tags

This is an object of the meta object that contains tags.

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

**Only for car drafts.**

Used to mark a car draft as fire brigade car.

```json
{
  "meta": {
    "tags": {
      "fire brigade": {}
    }
  }
}
```

### medic

**Only for car drafts.**

Used to mark a car draft as medic car.

```json
{
  "meta": {
    "tags": {
      "medic": {}
    }
  }
}
```

### police

**Only for car drafts.**

Used to mark a car draft as police car.

```json
{
  "meta": {
    "tags": {
      "police": {}
    }
  }
}
```

### swat

**Only for car drafts.**

Used to mark a car draft as swat car.

```json
{
  "meta": {
    "tags": {
      "swat": {}
    }
  }
}
```

### console

Used to implement a console command with a draft. Multiple commands can be defined.

```json
{
  "meta": {
    "tags": {
      "console": {
        "commands": {
          "mycustomcommand1": {
            // Fun actions and conditions
            "condition": {...},
            "actions": [
              {"type": "feedback", "id": "Condition ok"},
            ],
            "else actions": [
              {"type": "feedback", "id": "Condition not ok"}
            ]
          },
          "mycustomcommand2": {
            // Fun actions and conditions
            "condition": {...},
            "actions": [
              {"type": "feedback", "id": "Condition ok"},
            ],
            "else actions": [
              {"type": "feedback", "id": "Condition not ok"}
            ]
          }
        }
      }
    }
  }
}
```

### build rail

**Only for building drafts.**

```json
{
  "meta": {
    "tags": {
        "build rail": {
        "id": "", // rail or road ID
        "offsets": [], // optional int array

        // These are only if its a road ID
        "level": 0, // int
        "all": false, // bool
        "dir": 1 // int
      }
    }
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

### dsa rocket supplier

**Only for building drafts.**

Whether the building is considered a rocket supplier and should spawn supply trucks for the launchpad.

```json
{
  "meta": {
    "tags": {
      "dsa rocket supplier": {}
    }
  }
}
```



<!-- TODO: add tags that are loaded by getDraftsWithTag -->

### destroyed tree

**Only for building drafts.**

Whether to consider this building as a replacement for destroyed trees. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed tree": {}
    }
  }
}
```

### destroyed tree radioactive

**Only for building drafts.**

Whether to consider this building as a replacement for radioactive destroyed trees. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed tree radioactive": {}
    }
  }
}
```

### destroyed building

**Only for building drafts.**

Whether to consider this building as a replacement for destroyed buildings. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed building": {}
    }
  }
}
```

### destroyed building radioactive

**Only for building drafts.**

Whether to consider this building as a replacement for radioactive destroyed buildings. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed building radioactive": {}
    }
  }
}
```

### destroyed road

**Only for building drafts.**

Whether to consider this building as a replacement for destroyed roads. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed road": {}
    }
  }
}
```

### destroyed road radioactive

**Only for building drafts.**

Whether to consider this building as a replacement for radioactive destroyed roads. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed road radioactive": {}
    }
  }
}
```


### destroyed plain

**Only for building drafts.**

Whether to consider this building as a replacement for destroyed wires, rail and fences. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed plain": {}
    }
  }
}
```

### destroyed plain radioactive

**Only for building drafts.**

Whether to consider this building as a replacement for radioactive destroyed wires, rail and fences. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed plain radioactive": {}
    }
  }
}
```
