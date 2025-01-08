# Animation

Animation drafts are used to define an animation. To actually attach an animation to a building, you need to use [animation](../../draft-types/award.md#animation) tag with an animation object.

## Attributes

### id
::: type: string

ID of the animation draft to use.

### x
::: type: int

Position of the animation on a horizontal axis. Value of 0 is at the leftmost edge.

**By default**, the value will be 0.

### y
::: type: int

Position of the animation on a vertical axis. Value of 0 is on the middle of the tile.

**By default**, the value will be 0.

### shift
::: type: int

**By default**, the value will be the index of the object in the animation array.

### frame shift
::: type: int

**By default**, the value will be 1.

### on fire
::: type: boolean

**By default**, the value will be false.

### on crime
::: type: boolean

**By default**, the value will be false.

### is burning
::: type: boolean

**By default**, the value will be false.

### in winter
::: type: boolean

**By default**, the value will be false.

### in summer
::: type: boolean

**By default**, the value will be false.

### date
::: type: AnimationDate

### frames
::: type: int|int[]

If defined, will be prioritized over [frame](#frame) tag.

### frame
::: type: int|int[]

### seed
::: type: int

**By default**, the value will be determined automatically by the game.

### color
::: type: Color

### night light probability
::: type: float

**By default**, the value will be 1.

### rotation aware
::: type: boolean

**By default**, the value will be false.
