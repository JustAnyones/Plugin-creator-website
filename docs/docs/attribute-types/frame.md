# Frame

This refers to an attribute object that is used to define frames (textures) for drafts.

Presence of the [bmp](#bmp), [steal](#steal) or the lack of said attributes define what attributes
are used for what purpose.

## Attributes

### bmp
::: type: string

The relative path to the texture file of your draft.

### place x
::: type: integer

X coordinate to place the frame in the texture space.

Only available for privileged drafts.

### place y
::: type: integer

Y coordinate to place the frame in the texture space.

Only available for privileged drafts.

### x
::: type: integer

### y
::: type: integer

### w
::: type: integer

### h
::: type: integer

### target w
::: type: integer

Scales the frame to the specified width.

### target h
::: type: integer

Scales the frame to the specified height.

### count
::: type: integer

### skip width factor
::: type: integer

### skip height factor
::: type: integer

### copies
::: type: integer

### n
::: type: integer

## Examples

### Empty frame

An empty frame can be added by passing `null` in place of an object like so:

```json
{
    "frames": [null]
}
```
