from typing_extensions import override

from theotown_plugin_documentation.generation.drafts.base import Attribute
from theotown_plugin_documentation.generation.drafts.viewport import ViewportDraft

class AnimationDraft(ViewportDraft):
    """
    Animation drafts allow you to create custom night lights.

    Animation drafts have the type of `animation`.
    """

    __name__ = "Animation"
    __file__ = "animation.md"

    @override
    def __init__(self):
        super().__init__()
        self.frames.description = """
            Graphic frames definition to use for the animation.
            
            Each frame will be displayed in sequence to create an animation effect.
            The frames should be provided in the order they should be displayed.

            **By default**, the value will be `[null]`.
            """
        
        self.additive: Attribute = Attribute(
            "additive",
            "boolean",
            """
            Whether to draw the animation frames using additive blending.

            **By default**, the value will be false.
            """
        )
        self.light: Attribute = Attribute(
            "light",
            "boolean",
            """
            If set to true the game's shading (ie for night) will not be applied to the animation.

            **By default**, the value will be false.
            """
        )
        self.lightSwitching: Attribute = Attribute(
            "light switching",
            "boolean",
            """
            If set to true the animation will only be shown during night with some probabilistic
            switching behaviour dependent on the using object.

            **By default**, the value will be false.
            """
        )
        self.nightLightProbability: Attribute = Attribute(
            "night light probability",
            "float",
            """
            The probability of the light to turn on during night.
            1 means it will always switch on.
            Smaller values mean that location and spot seed will be used to determine whether to switch it on.

            **By default**, the value will be 1.
            """
        )
        self.speed: Attribute = Attribute(
            "speed",
            "float",
            """
            Animation speed multiplier.

            **By default**, the value will be 1.
            """
        )
        self.rotationAware: Attribute = Attribute(
            "rotation aware",
            "boolean",
            """
            If set to true the animation is considered to be animation aware.
            This means that the frames are assigned into groups.
            The group to draw will depend on the rotation of the underlying building.

            Ie if 8 frames were defined then frames 0,1 will be used for the first rotation and so on.

            **By default**, the value will be false.
            """
        )
        self.color: Attribute = Attribute(
            "color",
            "Color",
            """
            A color that can be used to tint the animation.
            """
        )
        self.colors: Attribute = Attribute(
            "colors",
            "Color[]",
            """
            An array of colors that can be used to tint the animation.

            If multiple colors were provided a random color will be picked for an animation spot
            based on building location and seed.
            """
        )
        self.loop: Attribute = Attribute(
            "loop",
            "boolean",
            """
            Must be used together with the [handle interpolation](#handle_interpolation) attribute.

            **By default**, the value will be true.
            """
        )
        self.handleInterpolation: Attribute = Attribute(
            "handle interpolation",
            "boolean",
            """
            If the value is greater than 1,
            the game will generate additional frames that gradually transition between two consecutive frames.

            **By default**, the value will be 1.
            """
        )
        self.pingPong: Attribute = Attribute(
            "ping pong",
            "boolean",
            """
            If true, the animation will loop back-and-forth to create the "ping pong" effect,
            where the sequence of frames goes forward and then reverses direction, offering a bouncing effect.

            **By default**, the value will be false.
            """
        )
        self.animation: Attribute = Attribute(
            "animation",
            "Animation[]",
            """
            Allows you to define an animation for animation.
            """
        )
        self.frameAnimationIndices: Attribute = Attribute(
            "frame animation indices",
            "int[][]",
            """
            Must be used together with the [animation](#animation) attribute.
            """
        )

