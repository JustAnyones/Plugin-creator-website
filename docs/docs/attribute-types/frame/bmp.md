# Image

Image type frames are frames used from an image file. This is the most commonly used method of defining a frame.

## Example

The following example defines a frame that is an image file:
```json
"frames": [{
    "bmp": "my cool image.png"
}]
```

<!--
TODO:
GOOD EXAMPLE: https://forum.theotown.com/viewtopic.php?p=134195#p134195
-->


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

The horizontal coordinate of the frame in the graphic.

For example:
```json
{"bmp": "frame.png", "x": 32}
```
Will display only the left 32 pixels of the image.

**By default**, the value will be 0.

### y
::: type: int

The vertical coordinate of the frame in the graphic.

**By default**, the value will be 0.

### w
::: type: int

Sets the width of the frame to be selected.

For example:
```json
{"bmp": "frame.png", "w": 32}
```
Will define the frame to be 32 pixels wide.

**By default**, the value will be the width of the frame.

### h
::: type: int

Sets the height of the frame to be selected.

**By default**, the value will be the height of the frame.
