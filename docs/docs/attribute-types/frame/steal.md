# Steal

Steal type frames are frames reused from a specific draft that's already defined.

## Attributes
::: attribute-list-start

### steal
::: type: string

ID of the draft to steal the frame from.

### type
::: type: string

Type of frame to steal. Can be `frames` or `preview frames`.

**By default**, the value will be `frames`.

### frame
::: type: int

**By default**, the value will be 0.

### count
::: type: int

**By default**, the value will be 1.

### move x
::: type: int

**By default**, the value will be 0.

### move y
::: type: int

**By default**, the value will be 0.

### handle x
::: type: int

Aligns the frame that's displayed in the game by shifting it horizontally.

If the value is negative, then the frame will be shifted to the left.

**By default**, the value will be 0.

### handle y
::: type: int

Aligns the frame that's displayed in the game by shifting it vertically.

If the value is negative, then the frame will be shifted to the down.

**By default**, the value will be 0.

### share
::: type: boolean

Only if moveX and moveY == 0

**By default**, the value will be true.

::: attribute-list-end
