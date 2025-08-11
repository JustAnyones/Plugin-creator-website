# Biome

Biome drafts allow you to create custom biomes for game to generate.

Biome drafts have the type of `biome`.

## Attributes
::: attribute-list-start
::: inherit-h2 Attributes draft-types/.base.md
::: inherit-h2 Attributes attribute-types/.biome-spawn-params.md

### water
::: type: boolean

Whether biome is considered a water biome.

**By default**, the value will be false.

### spawnable
::: type: boolean

**By default**, the value will be true.

### grounds
::: type: BiomeSpawner

Define the ground drafts that spawn in the biome.

### trees
::: type: BiomeSpawner

Define the tree drafts that spawn in the biome.

### buildings
::: type: BiomeSpawner

Define the building drafts that spawn in the biome.

::: attribute-list-end