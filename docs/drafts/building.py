# pyright: reportImplicitRelativeImport=false
from base import Attribute
from spawnable import SpawnableDraft
from viewport import ViewportDraft

class BuildingBasedDraft(ViewportDraft):
    
    """
    This is a stub for drafts that are based on buildings.

    Upgrades are technically buildings so this will be reused for them
    when upgrades get documented.
    """

    def __init__(self):
        super().__init__()

class BuildingDraft(BuildingBasedDraft, SpawnableDraft):

    """
    Building drafts have the type of `building`.

    This is a generic draft that can be used in place of a concrete building draft.
    """

    __name__ = "Building"
    __file__ = "building.md"

    def __init__(self):
        super().__init__()
        self.width: Attribute = Attribute(
            "width",
            "integer",
            "Must be of equal value to the [height](#height) attribute unless it's a composition.",
            required=True
        )
        self.height: Attribute = Attribute(
            "height",
            "integer",
            "Must be of equal value to the [width](#width) attribute unless it's a composition.",
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
        self.frames.description = "Required unless you are using a composition."
        self.framesWinter: Attribute = Attribute(
            "frames winter",
            "Frame[]"
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
            "**By default**, the value will be true."
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
            Represents wealth level of the building. Level ranges from 1 to 3. 

            Only supported by RCI buildings.

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

            **By default**, the value will be false.
            """,
            deprecated="""
            This attribute is a relict from a time when separate animation objects were not a thing yet.
            Use the more powerful [animation](#animation) attribute instead.
            """
        )


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

class CommercialDraft(BuildingDraft):
        
    """
    Commercial drafts have the type of `commercial` and belong to the `$cat_commercial00` category by default.
    """

    __name__ = "Commercial"
    __file__ = "commercial.md"

    def __init__(self):
        super().__init__()

class DecorationDraft(BuildingDraft):
        
    """
    Decoration drafts have the type of `decoration` and belong to the `$cat_decoration00` category by default.

    Decoration drafts are considered as RCI buildings.

    *[RCI]: Residential, Commercial, Industrial
    """

    __name__ = "Decoration"
    __file__ = "decoration.md"

    def __init__(self):
        super().__init__()

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

class FarmDraft(BuildingDraft):

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

class HarborIndDraft(BuildingDraft):

    """
    Harbor ind drafts have the type of `harbor ind` and belong to the `$cat_industrial00` category by default.

    Harbor ind drafts are functionally similar to the industrial type.
    """

    __name__ = "Harbor ind"
    __file__ = "harbor ind.md"

    def __init__(self):
        super().__init__()

class HarborPierDraft(BuildingDraft):

    """
    Harbor pier drafts have the type of `harbor pier` and belong to the `$cat_industrial00` category by default.

    Harbor pier drafts are functionally similar to the industrial type.
    """

    __name__ = "Harbor pier"
    __file__ = "harbor pier.md"

    def __init__(self):
        super().__init__()

class IndustrialDraft(BuildingDraft):
        
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

class ResidentialDraft(BuildingDraft):
    
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
