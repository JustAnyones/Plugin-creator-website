# Animation

Animation drafts allow you to create custom night lights.

Animation drafts have the type of `animation`.

## Attributes
::: inherit-h2 Attributes draft-types/.viewport.md

### frames
::: type: Frame[]
::: default: [null]

Frames to use for the animation.

### additive
::: type: boolean
::: default: false

Whether to draw the animation frames using additive blending.

### light
::: type: boolean
::: default: false

If set to true the game's shading (ie for night) will not be applied to the animation.

### light switching
::: type: boolean
::: default: false

If set to true the animation will only be shown during night with some probabilistic
switching behaviour dependent on the using object.

### night light probability
::: type: float
::: default: 1

The probability of the light to turn on during night.
1 means it will always switch on.
Smaller values mean that location and spot seed will be used to determine whether to switch it on.

### speed
::: type: float
::: default: 1

Animation speed multiplier.

### rotation aware
::: type: boolean
::: default: false

If set to true the animation is considered to be animation aware.
This means that the frames are assigned into groups.
The group to draw will depend on the rotation of the underlying building.

Ie if 8 frames were defined then frames 0,1 will be used for the first rotation and so on.

### color
::: type: Color

A color that can be used to tint the animation.

### colors
::: type: Color[]

An array of colors that can be used to tint the animation.

If multiple colors were provided a random color will be picked for an animation spot
based on building location and seed.

### loop
::: type: boolean
::: default: true

### handle interpolation
::: type: integer
::: default: 1

### ping pong
::: type: boolean
::: default: false

### animation
::: type: Animation[]

### frame animation indices
::: type: int[][]

Must be used together with the [animation](#animation) attribute.
