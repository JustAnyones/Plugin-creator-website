# Biome spawner

An array of IDs or an object with draft ID and spawn definition overrides.

## buildings/grounds/trees

!!! info "Only for biome drafts."

An array that contains IDs of drafts that should be spawned in the biome.

Alternatively, the array can contain the following attributes for adjusting the spawning parameters for a specific draft.

For example:
```json
{
  "id": "$biome_flowerygrassland00",
  "type": "biome",
  // array of ground IDs
  "grounds": ["$ground_wildgrass00"],
  // array of objects with draft ID and their parameter overrides
  "trees": [
    {"id": "$flowers00", "noise scale": 0.5, "noise factor": 1, "deriv factor": 0.2, "deriv radius": 0.2, "coverage": 0.5, "precedence": 1.2},
    {"id": "$flowers00", "offset": 0.05, "noise factor": 0.05}
  ]
}
```

## biomes

!!! info "Only for building, ground and tree drafts."

An array that contains IDs of biome drafts that the draft should be spawned in.

Alternatively, the array can contain the following attributes for adjusting the spawning parameters for a specific biome draft.

For example:
```json
{
    "id":"$searocks00",
    "type":"terrain",
    "width":1,
    "height":1,
    "frames":[{"x":0,"y":507,"w":32,"h":16,"count":4}],
    // Biomes for searocks to spawn, with parameter changes
    "biomes":[
      {
        "id": "$biome_ocean00",
        "height center": 0,
        "height factor": 0.5,
        "noise scale": 0.5,
        "noise factor": 0.5,
        "coverage": 0.3,
        "precedence": 0.1
      },
      {
        "id": "$biome_coast00",
        "height center": 0,
        "height factor": 0.5,
        "noise scale": 0.5,
        "noise factor": 0.5,
        "coverage": 0.5,
        "precedence": 0.1
      },
      {
        "id": "$biome_desert00",
        "height center": 1,
        "height factor": 0.2,
        "deriv factor": 0.1,
        "noise factor": 0.5,
        "coverage": 0.5,
        "precedence": 0.2
      }
    ],
}
```

## Attributes

::: inherit-h2 Attributes attribute-types/.biome-spawn-params.md


### id
::: type: string

ID of a biome draft or a spawnable draft to override the spawning parameters for.

