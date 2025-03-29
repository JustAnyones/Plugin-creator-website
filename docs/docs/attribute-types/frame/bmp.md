# Image

The most commonly used method of defining a frame.

## Example

The following example defines a frame that is an image file:
```json
"frames": [{
    "bmp": "my cool image.png"
}]
```


## Attributes

::: inherit-h2 Attributes attribute-types/frame/.shared.md

### bmp
::: type: string

The relative path to the texture file of your draft.

### place x
::: type: int

X coordinate to place the frame in the texture space.

Only available for privileged drafts.

### place y
::: type: int

Y coordinate to place the frame in the texture space.

Only available for privileged drafts.

### x
::: type: int

**By default**, the value will be 0.

### y
::: type: int

**By default**, the value will be 0.

### w
::: type: int

**By default**, the value will be the width of the frame.

### h
::: type: int

**By default**, the value will be the height of the frame.
