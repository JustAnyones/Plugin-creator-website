from typing_extensions import override

from ..types import ChangeType
from .base import Attribute, AttributeChange
from .spawnable import SpawnableDraft
from .stubs import Aspect, CarFlag, Influence
from .viewport import ViewportDraft

class BuildingBasedDraft(ViewportDraft):
    
    """
    This is a stub for drafts that are based on buildings.

    Upgrades are technically buildings so this will be reused for them
    when upgrades get documented.
    """

    def __init__(self):
        super().__init__()

CAR_FLAG_DESC = """
For buildings that need road these flags will be used to determine
whether a given neighbouring road counts as a connection.

At least one of the given flags must match with the flags
of the neighbouring road.
"""

class BuildingDraft(BuildingBasedDraft, SpawnableDraft):

    """
    Building drafts have the type of `building`.

    This is a generic draft that can be used in place of a concrete building draft.
    """

    __name__ = "Building"
    __file__ = "building.md"

    def generate_influences(self):
        """Generates influence attributes for the draft."""
        for inf in Influence:
            self.generated[inf.name] = inf.copy()

    def __init__(self):
        super().__init__()
        self.width: Attribute = Attribute(
            "width",
            "integer",
            """
            Tile width of the base of the building.

            Unless the building is a [composition](../guides/compositions.md),
            the value must be either:

            - equal to the value of the [height](#height) attribute, or
            - half or double the value of the [height](#height) attribute.

            If the building is non-square, you must provide at least 2 frames
            as they are rotation aware.
            """,
            changes=[
                AttributeChange(ChangeType.CHANGED, "1.12.26", "Added support for non-square buildings at ratios of 1:2 and 2:1.")
            ],
            required=True
        )
        self.height: Attribute = Attribute(
            "height",
            "integer",
            """
            Tile height of the base of the building.

            Unless the building is a [composition](../guides/compositions.md),
            the value must be either:

            - equal to the value of the [width](#width) attribute, or
            - half or double the value of the [width](#width) attribute.

            If the building is non-square, you must provide at least 2 frames
            as they are rotation aware.
            """,
            changes=[
                AttributeChange(ChangeType.CHANGED, "1.12.26", "Added support for non-square buildings at ratios of 1:2 and 2:1.")
            ],
            required=True
        )
        self.composition: Attribute = Attribute(
            "composition",
            "Composition[]",
            "Composition buildings must be rotation aware."
        )
        self.inferRequirements: Attribute = Attribute(
            "infer requirements",
            "boolean",
            """
            Whether the draft should infer requirements from drafts in the composition.

            May only be used with a [composition](#composition) attribute.

            **By default**, the value will be true.
            """
        )
        self.frames.description += """
        At least one frame has to be given. If multiple frames are given, player may select one of them in the game.
        
        Required unless you are using a composition.
        """
        self.framesWinter: Attribute = Attribute(
            "frames winter",
            "Frame[]",
            """
            Works the same as [frames](#frames), but during winter time.
            If you define it you have to provide the same number of frames as in [frames](#frames).      
            """
        )
        self.decoFrames: Attribute = Attribute(
            "deco frames",
            "Frame[]"
        )
        self.decoFramesWinter: Attribute = Attribute(
            "deco frames winter",
            "Frame[]"
        )
        self.groundFrames: Attribute = Attribute(
            "ground frames",
            "Frame[]"
        )
        self.groundFramesWinter: Attribute = Attribute(
            "ground frames winter",
            "Frame[]"
        )
        self.waterBorderFrames: Attribute = Attribute(
            "water border frames",
            "Frame[]"
        )
        self.waterBorderFramesWinter: Attribute = Attribute(
            "water border frames winter",
            "Frame[]"
        )
        self.randomFrame: Attribute = Attribute(
            "random frame",
            "boolean",
            """
            If true, every time you place the building,
            a random frame from the [frame array](#frames) will be selected 
            
            **By default**, the value will be true.
            """
        )
        self.groundTiles: Attribute = Attribute(
            "ground tiles",
            "string[]",
            "Array of Viewport draft IDs."
        )
        self.needsRoad: Attribute = Attribute(
            "needs road",
            "boolean",
            """
            If true the building will complain if there is no road connection available.

            To determine road connection the road flags of nearby roads will be examined.

            **By default**, the value will be true.
            """
        )
        self.needsLand: Attribute = Attribute(
            "needs land",
            "boolean",
            """
            If true there must be at least one land tile under the building.

            If false and [needs water](#needs_water) is true then there must be no land tiles under the building.

            **By default**, the value will be true.
            """
        )
        self.needsWater: Attribute = Attribute(
            "needs water",
            "boolean",
            """
            If true there must be at least one water tile under the building.

            If false and [needs land](#needs_land) is true then there must be no water tiles under the building.

            **By default**, the value will be false.
            """
        )
        self.minWaterTiles: Attribute = Attribute(
            "min water tiles",
            "integer",
            """
            If the value is >= 0 then the building can only be built
            if the building area below it consists of at least this amount of water tiles.

            **By default**, the value will be -1.
            """
        )
        self.level: Attribute = Attribute(
            "level",
            "integer",
            """
            **Only supported by RCI buildings.**

            Represents wealth level of the building. Level ranges from 1 to 3. 

            **By default**, the value will be 1.
            """
        )
        self.density: Attribute = Attribute(
            "density",
            "float",
            """
            Used for attribute calculations as more dense buildings usually have higher expectations.

            **By default**, if the value is -1, the game will calculate it on its own
            by diving the number of people in the building by the building's area.
            """
        )
        self.buildHeight: Attribute = Attribute(
            "build height",
            "integer",
            """
            The height of the building in 8px units.
            Used for auto build time calculation, collision checks, clipping during drawing, helicopters and much more.
            """
        )
        self.animated: Attribute = Attribute(
            "animated",
            "boolean",
            """
            If set and the building has multiple frames, then these frames will be used for animation.
            Normally multiple frames will be used for different variants of a building and or rotation awareness.

            User will no longer be able to select a specific frame manually.

            **By default**, the value will be false.
            """,
            deprecated="""
            This attribute is a relict from a time when separate animation objects were not a thing yet.
            Use the more powerful [animation](#animation) attribute instead.
            """
        )
        self.price: Attribute = Attribute(
            "price",
            "integer",
            """
            The price to construct the building. If the building costs diamonds, the price won't be charged.

            Negative values require privileges.
            """
        )
        self.addPrice: Attribute = Attribute(
            "add price",
            "string|string[]",
            """
            A single ID or array of IDs of other drafts whose building price should be added when building this building. 
            """
        )
        self.monthlyPrice: Attribute = Attribute(
            "monthly price",
            "integer",
            """
            The monthly costs of this building. Negative values mean income and require privileges.
            """
        )
        self.diamondPrice: Attribute = Attribute(
            "diamond price",
            "integer",
            """
            The diamond price to build this building.
            Will be ignored in case the building was unlocked by a feature.

            On premium platforms, the value will be 0.
            """
        )
        self.budgetItem: Attribute = Attribute(
            "budget item",
            "string",
            """
            ID of the draft that has the `"budget item"` meta tag defined.

            Buildings that have monthly income or spendings usually appear in the budget view in the associated category,
            that is e.g. parks for buildings of type park.
            
            You can define your own type of budget, called budget item.
            That is a data object that will be used to provide a name for the item.

            Transport system associated buildings will automatically use the budget item from the owning transport system draft.
            """, changes=[
                AttributeChange(ChangeType.CHANGED, "1.12.26", "Automatically set budget item for transport system associated buildings.")
            ]
        )
        self.bulldozePrice: Attribute = Attribute(
            "bulldoze price",
            "integer",
            """
            The price to bulldoze the building.

            Negative values require privileges.
            """
        )
        self.power: Attribute = Attribute(
            "power",
            "integer",
            """
            Produced amount of energy by this building in kWh. Positive values produce and negative values consume the resource.

            The max value will be limited based on building size and monthly price. Privileged drafts may circumvent this value cap.

            $$
            \\text{actual value} = \\min(\\text{power}, \\min(10000 \\times \\text{area}, \\min(20 \\times \\text{monthly price, 10000000})))))
            $$
            
            **By default**, the value will be inferred from building size and height.
            """,
            changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Add a limit for unprivileged drafts.")]
        )
        self.water: Attribute = Attribute(
            "water",
            "integer",
            """
            Produced amount of water by this building in L/h. Positive values produce and negative values consume the resource.

            The max value will be limited based on building size and monthly price. Privileged drafts may circumvent this value cap.
            
            $$
            \\text{actual value} = \\min(\\text{water}, \\min(10000 \\times \\text{area}, \\min(200 \\times \\text{monthly price, 10000000})))))
            $$

            **By default**, the value will be inferred from building size and height.
            """,
            changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Add a limit for unprivileged drafts.")]
        )
        self.capacity: Attribute = Attribute(
            "capacity",
            "integer",
            """
            Capacity for passenger related calculations.

            **By default**, the value will be 0.
            """
        )
        self.depotCapacity: Attribute = Attribute(
            "depot capacity",
            "integer",
            """
            Amount of vehicles that can be stored in a depot building.

            **By default**, the value will be 0.
            """,
            changes=[
                AttributeChange(ChangeType.ADDED, "1.12.26")
            ]
        )
        self.destroyable: Attribute = Attribute(
            "destroyable",
            "boolean",
            """
            Whether the building is destroyable by disasters.

            **By default**, the value will be true.
            """
        )
        self.destroyableByFunction: Attribute = Attribute(
            "destroyable by fun",
            "boolean",
            """
            Whether the building is destroyable by fun actions.

            **By default**, the value will be true.
            """
        )
        self.destruction: Attribute = Attribute(
            "destruction",
            "string",
            """
            The ID of a building that will be used to replace the destructed building.

            Must be either 1x1 in which case it will fill up the area of the destructed building,
            or match the size of the destructed building.
            """
        )
        self.burnable: Attribute = Attribute(
            "burnable",
            "boolean",
            """
            Whether the building can be set on fire.

            By default will inherit the value of the [destroyable](#destroyable) attribute.
            """
        )
        self.useFireFrames: Attribute = Attribute(
            "use fire frames",
            "boolean",
            """
            Whether the building will draw the usual fire when burning.

            Can be disabled to draw a custom fire animation.

            **By default**, the value will be true.
            """
        )
        self.maxCount: Attribute = Attribute(
            "max count",
            "integer",
            """
            The maximum permitted occurrences of the building within the city.

            **By default**, the value will be -1 which indicates no limit.
            """
        )
        self.priceFactor: Attribute = Attribute(
            "price factor",
            "float",
            """
            Factor by which subsequent building prices will be multiplied by.
            """
        )
        self.waterWaste: Attribute = Attribute(
            "water waste",
            "float",
            """
            Positive values indicate that the building causes water pollution.
            Negative values reduce water pollution.
            """
        )
        self.drawGround: Attribute = Attribute(
            "draw ground",
            "boolean",
            """
            If true the ground below the building will be drawn. Useful when the building has transparent parts in the ground.

            **By default**, the value will be false.
            """
        )
        self.frameAlignmentArea: Attribute = Attribute(
            "frame alignment area",
            "boolean",
            """
            If true the building will be built using an area tool.

            **By default**, the value will be false.
            """
        )
        self.frameAlignment: Attribute = Attribute(
            "frame alignment",
            "boolean",
            """
            If true the building will be built using a line tool unless [frame alignment area](#frame_alignment_area) is true.

            By default will inherit the value of the [frame alignment area](#frame_alignment_area) attribute.
            """
        )
        self.alignable: Attribute = Attribute(
            "alignable",
            "boolean",
            """
            If true the building will align with neighbouring buildings.

            By default will inherit the value of the [frame alignment](#frame_alignment) attribute.
            """
        )
        self.rotationAware: Attribute = Attribute(
            "rotation aware",
            "boolean",
            """
            If true the building will dedicate frames for use in rotation.
            In this case you have to provide a multiple of 2 frames.

            **By default**, the value will be true, if:
            - the draft is [alignable](#alignable) and has at least 4 frames, or
            - the draft is non-square (ie width != height), or
            - it is a composition building.
            """,
            changes=[
                AttributeChange(
                    ChangeType.CHANGED, "1.12.26",
                    "Added support for non-square buildings at ratios of 1:2 and 2:1 that require rotation awareness."
                )
            ],
        )
        self.extRotationAware: Attribute = Attribute(
            "ext rotation aware",
            "boolean",
            """
            If true the building will use 16 frames per variant to model joining with nearby buildings.

            **By default**, the value will be true, if the draft is [rotation aware](#rotation_aware)
            and has [frame alignment](#frame_alignment) or [frame alignment area](#frame_alignment_area) attributes set to true.
            """
        )
        self.selectableFrames: Attribute = Attribute(
            "selectable frames",
            "boolean",
            """
            Whether the user can manually select a frame upon building.

            **By default**, the value will be true, if [frame alignment](#frame_alignment) attribute is false.
            """
        )
        self.volatile: Attribute = Attribute(
            "volatile",
            "boolean",
            """
            Not in use.

            **By default**, the value will be false.
            """
        )
        self.useFence: Attribute = Attribute(
            "use fence",
            "string[]",
            """
            Array of fence draft IDs. A random fence will be chosen to be placed around a building.

            **By default**, the behaviour is disabled.
            """
        )
        self.ships: Attribute = Attribute(
            "ships",
            "string[]",
            """
            Array of ship draft IDs.
            """
        )
        self.shipCount: Attribute = Attribute(
            "ship count",
            "integer",
            """
            **By default**, the value will be equal to building's [width](#width).
            """
        )
        self.shipRadius: Attribute = Attribute(
            "ship radius",
            "integer",
            """
            **By default**, the value will be 128.
            """
        )
        self.helicopterSpawner: Attribute = Attribute(
            "helicopter spawner",
            "HelicopterSpawner",
        )
        self.carSpawner: Attribute = Attribute(
            "car spawner",
            "CarSpawner",
        )
        self.explodes: Attribute = Attribute(
            "explodes",
            "boolean",
            """
            Whether building will explode upon being burnt down (that is, after a while of burning).

            **By default**, the value will be false.
            """
        )
        self.explosionRadius: Attribute = Attribute(
            "explosion radius",
            "integer",
            """
            For exploding buildings only, the radius of the explosion.

            **By default**, the value will be 16.
            """
        )
        self.nuclear: Attribute = Attribute(
            "nuclear",
            "boolean",
            """
            Whether the explosion of the building will be nuclear.

            **By default**, the value will be false.
            """
        )
        self.disaster: Attribute = Attribute(
            "disaster",
            "boolean",
            """
            Whether the existence of the building should be considered as a disaster.

            When city is in a disaster state, game may play disaster music, the city growth will halt.

            **By default**, the value will be false.
            """
        )
        self.removable: Attribute = Attribute(
            "removable",
            "boolean",
            """
            Whether the draft can be removed from the city by player build tools.

            **By default**, the value will be true.
            """
        )
        self.mapColor: Attribute = Attribute(
            "map color",
            "Color",
            """
            **Only supported by terrain drafts.**

            Specifies the color of the building on the map.        
            """# TODO: also supported by zones, but they arent buildings
        )
        # TODO: mapColorWinter
        self.pickable: Attribute = Attribute(
            "pickable",
            "boolean",
            """
            Whether the building can be picked via eye dropper tool.

            **By default**, the value will be true.
            """
        )
        self.renameable: Attribute = Attribute(
            "renameable",
            "boolean",
            """
            Whether the building can be renamed by the player.

            **By default**, the value will be true.
            """
        )
        self.performance: Attribute = Attribute(
            "performance",
            "boolean",
            """
            Whether the performance of the building can be adjusted.
            Performance impacts influences, aspects, costs and income.

            **By default**, the value will be false.
            """
        )
        self.powerRadius: Attribute = Attribute(
            "power radius",
            "integer",
            """
            The maximum value is 10 unless privileged.

            **By default**, the value will be 5.
            """
        )
        self.idleBuildTime: Attribute = Attribute(
            "idle build time",
            "boolean",
            """
            Whether the building can get build progress through idle time.

            **By default**, the value will be true.
            """
        )
        self.randomizeAnimation: Attribute = Attribute(
            "randomize animation",
            "boolean",
            """
            **By default**, the value will be false.
            """
        )
        self.randomizeLights: Attribute = Attribute(
            "randomize lights",
            "boolean",
            """
            **By default**, the value will be true.
            """
        )
        # Fun actions
        self.fun: Attribute = Attribute(
            "fun",
            "Fun",
        )
        self.onClickFun: Attribute = Attribute(
            "on click fun",
            "Fun",
        )
        self.randomFun: Attribute = Attribute(
            "random fun",
            "Fun",
        )
        self.onEventFun: Attribute = Attribute(
            "on event fun",
            "Fun",
        )
        self.onBuiltFun: Attribute = Attribute(
            "on built fun",
            "Fun",
        )
        self.onDestroyFun: Attribute = Attribute(
            "on destroy fun",
            "Fun",
        )
        self.hiddenOnClick: Attribute = Attribute(
            "hidden on click",
            "boolean",
            """
            **By default**, the value will be false.
            """
        )
        self.smoke: Attribute = Attribute(
            "smoke",
            "Smoke[]",
            """
            List of smoke sources.
            Position is relative to pivot point of the building.

            See [here](https://forum.theotown.com/viewtopic.php?p=6653) for the listing of defined smoke types.
            """
        )
        self.animation: Attribute = Attribute(
            "animation",
            "Animation[]",
            """
            Similar to [smoke](#smoke), can be used to place animations on your building.
            Position is relative to pivot point of the building.
            """
        )
        self.frameAnimationIndices: Attribute = Attribute(
            "frame animation indices",
            "integer[][]",
            """
            Animation indices are used to specify which animations should be visible for which frames.
            """
        )
        self.animationFg: Attribute = Attribute(
            "animation fg",
            "Animation[]",
        )
        self.frameAnimationFgIndices: Attribute = Attribute(
            "frame animation fg indices",
            "integer[][]",
        )
        self.buildTime: Attribute = Attribute(
            "build time",
            "integer",
            """
            The build time of the building in days.
            """
        )
        self.buildTimeFactor: Attribute = Attribute(
            "build time factor",
            "float",
        )
        self.freeBuildTimeSkip: Attribute = Attribute(
            "free build time skip",
            "boolean",
            """
            Whether the build time can be skipped for free in freemium versions.
            """
        )
        self.serviceCars: Attribute = Attribute(
            "service cars",
            "integer",
        )
        self.serviceCarTags: Attribute = Attribute(
            "service car tags",
            "string[]",
            "Array of tags."
        )
        
        # Generate "road flags *" attributes
        for flag in CarFlag:
            copy = flag.copy()
            copy.name = "road flags " + copy.name
            copy.description = CAR_FLAG_DESC
            self.generated[copy.name] = copy

        self.allocateRoadFlags: Attribute = Attribute(
            "allocate road flags",
            "string|string[]",
            """
            Allocates a custom car flag.

            Note that there is a max limit of 32 custom flags.
            """
        )

        self.nightLightProbability: Attribute = Attribute(
            "night light probability",
            "float",
        )
        self.rciCars: Attribute = Attribute(
            "rci cars",
            "integer",
        )
        self.easyRemove: Attribute = Attribute(
            "easy remove",
            "boolean",
        )
        self.supportsSlope: Attribute = Attribute(
            "supports slope",
            "boolean",
            """
            Determines whether this building handles slopes on it's own (graphically).
            Enabling this will not draw the concrete blocks under the building.
            Usually only recommended for decorations and in combination with [draw ground](#draw_ground) attribute set to true.

            **By default**, the value will be false.
            """
        )
        self.supportsTerrain: Attribute = Attribute(
            "supports terrain",
            "boolean",
            """
            Indicates whether this building can be placed on terrain in general
            (if not the building will only be placeable on flat areas).

            **By default**, the value will be true.
            """
        )
        self.supportsShoreline: Attribute = Attribute(
            "supports shoreline",
            "boolean",
            """
            If set to false the building cannot be built if there is coast under it.

            **By default**, the value will be true.
            """
        )
        self.drawWaterBorders: Attribute = Attribute(
            "draw water borders",
            "boolean",
        )
        self.drawWaterGround: Attribute = Attribute(
            "draw water ground",
            "boolean|string",
            """
            Whether water will be drawn under the building even
            if there's ground.
            Useful for semi transparent buildings that use this feature
            to incorporate water into their visuals.

            If a string is provided, ground draft by the specified ID
            will be used for drawing.

            **By default**, the value will be true.
            """
        )
        self.moveable: Attribute = Attribute(
            "moveable",
            "boolean",
            """
            Whether the building can be moved by move building tool.
            """
        )
        self.zone: Attribute = Attribute(
            "zone",
            "string",
            """
            ID of the zone draft to use.
            """
        )
        self.buildZone: Attribute = Attribute(
            "build zone",
            "boolean",
        )
        self.conductive: Attribute = Attribute(
            "conductive",
            "boolean",
            """
            Whether the building will connect to normal power lines.

            **By default**, the value will be true.
            """
        )
        self.superConductive: Attribute = Attribute(
            "super conductive",
            "boolean",
            """
            Whether the building will connect to normal power lines
            and high voltage ones.

            **By default**, the value will be false.
            """
        )
        self.highVoltageOnly: Attribute = Attribute(
            "high voltage only",
            "boolean",
            """
            Whether the building will connect to high voltage lines.
            """
        )
        self.liquid: Attribute = Attribute(
            "liquid",
            "boolean",
            """
            Whether the building will conduct water like a pipe.
            """
        )
        self.drawZone: Attribute = Attribute(
            "draw zone",
            "boolean",
        )
        self.habitants: Attribute = Attribute(
            "habitants",
            "integer",
            """
            **Only supported by residential type drafts.**

            Number of habitants in the building.

            **By default**, the value will be inferred from building size.
            """
        )
        self.workers: Attribute = Attribute(
            "workers",
            "integer",
            """
            **Only supported by commercial and industrial type drafts.**

            Number of workers in the building.

            The max value will be limited based on building size. Privileged drafts may circumvent this value cap.

            **By default**, the value will be inferred from building size.
            """,
            changes=[AttributeChange(ChangeType.CHANGED, "1.12.28", "Add a limit for unprivileged drafts.")]
        )
        self.people: Attribute = Attribute(
            "people",
            "integer",
            """
            **Only supported by RCI type drafts.**
            Unified type that specifies [habitants](#habitants) or [workers](#workers) depending on the RCI type.

            The max value will be limited based on building size. Privileged drafts may circumvent this value cap.
            """,
            changes=[AttributeChange(ChangeType.CHANGED, "1.12.28", "Add a limit for unprivileged drafts.")]
        )
        self.autoBuild: Attribute = Attribute(
            "auto build",
            "boolean",
            """
            **Only supported by RCI drafts.**

            Determines whether the building can be built automatically by the game on corresponding zones and given demand.

            **By default**, the value will be true.
            """
        )
        self.autoBuildFactor: Attribute = Attribute(
            "auto build factor",
            "float",
            """
            The auto build factor can be used to tweak the auto spawn rate of the building.

            Higher values will cause the building to be built more likely.
            """
        )
        self.rebuild: Attribute = Attribute(
            "rebuild",
            "boolean",
            """
            Whether the RCI building will rebuild instead of being replaced by another.
            Useful if your population drops suddenly, but you want the city to remain looking the same.

            **By default**, the value will be true.
            """
        )
        self.upgrades: Attribute = Attribute(
            "upgrades",
            "Upgrade[]",
            """
            Defines the upgrades the building can have.
            
            Some additional notes:
            - price, monthly price, water, power and influences will be
            added to corresponding values of the building when the upgrade is applied
            
            - You can also provide animations as for regular buildings, but not smoke
            - You can set "only one":true in an upgrade to state that no other upgrade may be active at the same time.
                We use this for example for the radio station were you can have selected only one program at the same time.
            """
        )
        self.influencePreview: Attribute = Attribute(
            "influence preview",
            "boolean",
            """
            Whether a preview of the building's influences should be rendered.

            **By default**, the value will be true.
            """
        )
        self.generate_influences()
        
        # Generate aspects
        for asp in Aspect:
            provideAspect = asp.copy()
            capacityAspect = asp.copy()

            provideAspect.name = f"provide aspect {asp.value.name}"
            capacityAspect.name = f"aspect {asp.value.name} capacity"
            self.generated[provideAspect.name] = provideAspect
            self.generated[capacityAspect.name] = capacityAspect
        
        self.pedestrian: Attribute = Attribute(
            "pedestrian",
            "string",
            """
            ID of a pedestrian draft.
            """
        )
        self.pedestrianCount: Attribute = Attribute(
            "pedestrian count",
            "integer",
            """
            **By default**, the value will be 0.
            """
        )
        self.carMinLevel: Attribute = Attribute(
            "car min level",
            "integer",
            """
            Describes the minimum relative level on which this building can spawn cars.
            This attribute is crucial to support stuff like metro and monorail.

            **By default**, the value will be -1, so that buildings can spawn cars on a level below (ie tunnels).
            """,
            changes=[
                AttributeChange(ChangeType.ADDED, "1.12.26")
            ]
        )
        self.carMaxLevel: Attribute = Attribute(
            "car max level",
            "integer",
            """
            Describes the maximum relative level on which this building can spawn cars.
            This attribute is crucial to support stuff like metro and monorail.

            **By default**, the value will be 0, so that buildings can spawn cars on the same level.
            """,
            changes=[
                AttributeChange(ChangeType.ADDED, "1.12.26")
            ]
        )


class RCIDraft(BuildingDraft):
    """
    Stub implementation to be used as a base for RCI drafts.
    """

    @override
    def generate_influences(self):
        for inf in Influence:
            self.generated[inf.name] = inf.copy()
            self.generated[inf.name].description += """
            Has no effect unless the draft is privileged.
            """
            self.generated[inf.name].changes = [
                AttributeChange(
                    ChangeType.CHANGED, "1.12.26",
                    "Ignore the definition if the draft is not privileged."
                )
            ]

    def __init__(self):
        super().__init__()

"""
The following are concrete drafts for buildings.
"""

class AirportDraft(BuildingDraft):
        
    """
    Airport drafts have the type of `airport` and belong to the `$cat_airport00` category by default.
    """

    __name__ = "Airport"
    __file__ = "airport.md"

    def __init__(self):
        super().__init__()

class AwardDraft(BuildingDraft):
            
    """
    Award drafts have the type of `award` and belong to the `$cat_award00` category by default.
    """

    __name__ = "Award"
    __file__ = "award.md"

    def __init__(self):
        super().__init__()

class BodyDisposalDraft(BuildingDraft):
        
    """
    Body disposal drafts have the type of `body disposal` and belong to the `$cat_bodydisposal00` category by default.
    """

    __name__ = "Body disposal"
    __file__ = "body disposal.md"

    def __init__(self):
        super().__init__()

class BuoyDraft(BuildingDraft):
        
    """
    Buoy drafts have the type of `buoy` and belong to the `$cat_transport00` category by default.
    """

    __name__ = "Buoy"
    __file__ = "buoy.md"

    def __init__(self):
        super().__init__()

class BusDepotDraft(BuildingDraft):
        
    """
    Bus depot drafts have the type of `bus depot` and belong to the `$cat_road00` category by default.
    """

    __name__ = "Bus depot"
    __file__ = "bus depot.md"

    def __init__(self):
        super().__init__()

class CommercialDraft(RCIDraft):
        
    """
    Commercial drafts have the type of `commercial` and belong to the `$cat_commercial00` category by default.
    """

    __name__ = "Commercial"
    __file__ = "commercial.md"

    def __init__(self):
        super().__init__()

class DecorationDraft(RCIDraft):
        
    """
    Decoration drafts have the type of `decoration` and belong to the `$cat_decoration00` category by default.

    Decoration drafts are considered as RCI buildings.

    *[RCI]: Residential, Commercial, Industrial
    """

    __name__ = "Decoration"
    __file__ = "decoration.md"

    def __init__(self):
        super().__init__()
        self.autoBuild.description = """
        **Only supported by RCI drafts.**

        Determines whether the building can be built automatically by the game on corresponding zones and given demand.

        **By default**, the value will be false.        
        """

class DestroyedDraft(BuildingDraft):
        
    """
    Destroyed drafts have the type of `destroyed`.
    """

    __name__ = "Destroyed"
    __file__ = "destroyed.md"

    def __init__(self):
        super().__init__()

class EducationDraft(BuildingDraft):
        
    """
    Education drafts have the type of `education` and belong to the `$cat_education00` category by default.
    """

    __name__ = "Education"
    __file__ = "education.md"

    def __init__(self):
        super().__init__()

class EnergyDraft(BuildingDraft):
        
    """
    Energy drafts have the type of `energy` and belong to the `$cat_energy00` category by default.
    """

    __name__ = "Energy"
    __file__ = "energy.md"

    def __init__(self):
        super().__init__()

class FarmDraft(RCIDraft):

    """
    Farm drafts have the type of `farm` and belong to the `$cat_industrial00` category by default.

    Farm drafts are functionally similar to the industrial type.
    """

    __name__ = "Farm"
    __file__ = "farm.md"

    def __init__(self):
        super().__init__()

class FireBrigadeDraft(BuildingDraft):
    
    """
    Fire brigade drafts have the type of `fire brigade` and belong to the `$cat_firebrigade00` category by default.
    """

    __name__ = "Fire brigade"
    __file__ = "fire brigade.md"

    def __init__(self):
        super().__init__()

class HarborIndDraft(RCIDraft):

    """
    Harbor ind drafts have the type of `harbor ind` and belong to the `$cat_industrial00` category by default.

    Harbor ind drafts are functionally similar to the industrial type.
    """

    __name__ = "Harbor ind"
    __file__ = "harbor ind.md"

    def __init__(self):
        super().__init__()

class HarborPierDraft(RCIDraft):

    """
    Harbor pier drafts have the type of `harbor pier` and belong to the `$cat_industrial00` category by default.

    Harbor pier drafts are functionally similar to the industrial type.
    """

    __name__ = "Harbor pier"
    __file__ = "harbor pier.md"

    def __init__(self):
        super().__init__()

class IndustrialDraft(RCIDraft):
        
    """
    Industrial drafts have the type of `industrial` and belong to the `$cat_industrial00` category by default.
    """

    __name__ = "Industrial"
    __file__ = "industrial.md"

    def __init__(self):
        super().__init__()

class LandmarkDraft(BuildingDraft):
        
    """
    Landmark drafts have the type of `landmark` and belong to the `$cat_landmark00` category by default.
    """

    __name__ = "Landmark"
    __file__ = "landmark.md"

    def __init__(self):
        super().__init__()

class MedicDraft(BuildingDraft):
    
    """
    Medic drafts have the type of `medic` and belong to the `$cat_medic00` category by default.
    """

    __name__ = "Medic"
    __file__ = "medic.md"

    def __init__(self):
        super().__init__()

class MilitaryDraft(BuildingDraft):
    
    """
    Military drafts have the type of `military` and belong to the `$cat_military00` category by default.
    """

    __name__ = "Military"
    __file__ = "military.md"

    def __init__(self):
        super().__init__()

class ParkDraft(BuildingDraft):
    
    """
    Park drafts have the type of `park` and belong to the `$cat_park00` category by default.
    """

    __name__ = "Park"
    __file__ = "park.md"

    def __init__(self):
        super().__init__()

class PoliceDraft(BuildingDraft):
        
    """
    Police drafts have the type of `police` and belong to the `$cat_police00` category by default.
    """

    __name__ = "Police"
    __file__ = "police.md"

    def __init__(self):
        super().__init__()

class PublicDraft(BuildingDraft):
        
    """
    Public drafts have the type of `public` and belong to the `$cat_management00` category by default.
    """

    __name__ = "Public"
    __file__ = "public.md"

    def __init__(self):
        super().__init__()

class RailwayStationDraft(BuildingDraft):
    
    """
    Railway station drafts have the type of `railway station` and belong to the `$cat_road00` category by default.
    """

    __name__ = "Railway station"
    __file__ = "railway station.md"

    def __init__(self):
        super().__init__()

class ReligionDraft(BuildingDraft):
    
    """
    Religion drafts have the type of `religion` and belong to the `$cat_religion00` category by default.
    """

    __name__ = "Religion"
    __file__ = "religion.md"

    def __init__(self):
        super().__init__()

class ResidentialDraft(RCIDraft):
    
    """
    Residential drafts have the type of `residential` and belong to the `$cat_residential00` category by default.
    """

    __name__ = "Residential"
    __file__ = "residential.md"

    def __init__(self):
        super().__init__()

class SportDraft(BuildingDraft):
    
    """
    Sport drafts have the type of `sport` and belong to the `$cat_sport00` category by default.
    """

    __name__ = "Sport"
    __file__ = "sport.md"

    def __init__(self):
        super().__init__()

class SwatDraft(BuildingDraft):

    """
    Swat drafts have the type of `swat` and belong to the `$cat_police00` category by default.
    """

    __name__ = "Swat"
    __file__ = "swat.md"

    def __init__(self):
        super().__init__()

class TerrainDraft(BuildingDraft):

    """
    Terrain drafts have the type of `terrain` and belong to the `$cat_terrain00` category by default.
    """

    __name__ = "Terrain"
    __file__ = "terrain.md"

    def __init__(self):
        super().__init__()

class WasteDisposalDraft(BuildingDraft):

    """
    Waste disposal drafts have the type of `waste disposal` and belong to the `$cat_wastedisposal00` category by default.
    """

    __name__ = "Waste disposal"
    __file__ = "waste disposal.md"

    def __init__(self):
        super().__init__()

class WaterDraft(BuildingDraft):

    """
    Water drafts have the type of `water` and belong to the `$cat_water00` category by default.
    """

    __name__ = "Water"
    __file__ = "water.md"

    def __init__(self):
        super().__init__()
