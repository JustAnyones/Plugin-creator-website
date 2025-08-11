# Legacy spawner

This refers to the legacy way of spawning buildings and other drafts in a city. This way of spawning objects has been superseded by
the new [biome spawner](biome-spawner.md). Under the hood, this method resolves to default water or ground biome, depending if the draft needs water and then maps the attributes like this:

```
p -> height factor
height * 1000 -> height center
radius * 1000 -> height radius
```

## Attributes
::: attribute-list-start

### p
::: type: float

### height
::: type: float

### radius
::: type: float

::: attribute-list-end