import copy
import enum

from theotown_plugin_documentation.generation.drafts.base import Attribute, AttributeChange
from theotown_plugin_documentation.generation.types import ChangeType

class CustomEnum(enum.Enum):
    def copy(self) -> Attribute:
        """Returns a copy of the attribute."""
        return copy.copy(self.value)

class Aspect(CustomEnum):
    EDUCATION_LOW = Attribute(
        "education low", "integer",
        description="""
        The student capacity of a school.

        Privileged drafts may set it for drafts other than education.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    EDUCATION_HIGH = Attribute(
        "education high", "integer",
        description="""
        The student capacity of a high school.

        Privileged drafts may set it for drafts other than education.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    HEALTH_CARE = Attribute(
        "health care", "integer",
        description="""
        The patient capacity of a hospital.

        Privileged drafts may set it for drafts other than medic.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    WASTE_DISPOSAL = Attribute("waste disposal", "integer", "The garbage capacity of a garbage processing facility.")
    BODY_DISPOSAL = Attribute("body disposal", "integer", "The body capacity of a deceased processing facility.")

class Influence(CustomEnum):
    POLLUTION = Attribute("influence pollution", "integer")
    NOISE = Attribute("influence noise", "integer")
    HEALTH = Attribute(
        "influence health", "integer",
        description="""
        The health influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than medic.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    POLICE = Attribute(
        "influence police", "integer",
        description="""
        The police influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than police or swat.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    FIRE_DEPARTMENT = Attribute(
        "influence fire department", "integer",
        description="""
        The fire department influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than fire department.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    PARK = Attribute(
        "influence park", "integer",
        description="""
        The park influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than park.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    SPORT = Attribute(
        "influence sport", "integer",
        description="""
        The sport influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than sport.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    EDUCATION_LOW = Attribute(
        "influence education low", "integer",
        description="""
        The education low influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than education.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    EDUCATION_HIGH = Attribute(
        "influence education high", "integer",
        description="""
        The education high influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than education.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    CULTURE = Attribute(
        "influence culture", "integer",
        description="""
        The culture influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than religion, public, park, award, decoration and landmark.
        """,
        changes=[
            AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts."),
            AttributeChange(ChangeType.CHANGED, "1.12.31", "Allow park drafts to have culture influence.")
        ]
    )
    MANAGEMENT = Attribute(
        "influence management", "integer",
        description="""
        The management influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than public, award and landmark.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    RELIGION = Attribute(
        "influence religion", "integer",
        description="""
        The religion influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than religion, award and landmark.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    PASSENGER_BUS = Attribute("influence passenger bus", "integer")
    PASSENGER_TRAIN = Attribute("influence passenger train", "integer")
    RESIDENTIAL = Attribute("influence residential", "integer")
    COMMERCIAL = Attribute("influence commercial", "integer")
    INDUSTRIAL = Attribute("influence industrial", "integer")
    LEVEL0 = Attribute("influence level0", "integer")
    LEVEL1 = Attribute("influence level1", "integer")
    LEVEL2 = Attribute("influence level2", "integer")
    DENSITY = Attribute("influence density", "integer")
    RADIOACTIVE = Attribute("influence radioactive", "integer")
    NATURE = Attribute(
        "influence nature", "integer",
        description="""
        The nature influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than park, award, decoration and landmark.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    WASTE_DISPOSAL = Attribute(
        "influence waste disposal", "integer",
        description="""
        The waste disposal influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than waste disposal.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    BODY_DISPOSAL = Attribute(
        "influence body disposal", "integer",
        description="""
        The body disposal influence of a building.

        The max value will be limited based on building size and monthly price.

        $$
        \\text{max value} = \\min(10 \\times \\frac{\\min(\\text{monthly price}, 10000)}{\\text{area}}, 100)
        $$

        Privileged drafts may circumvent influence value cap and set it for drafts other than body disposal.
        """,
        changes=[AttributeChange(ChangeType.CHANGED, "1.12.30", "Restrictions for unprivileged drafts.")]
    )
    TRAFFIC = Attribute("influence traffic", "integer")

class CarFlag(CustomEnum):
    AIRPORT = Attribute("airport", "boolean")
    ALL = Attribute("all", "boolean")
    BUS = Attribute("bus", "boolean")
    EMERGENCY = Attribute("emergency", "boolean")
    HIGH_SPEED = Attribute("high speed", "boolean")
    LKW = Attribute("lkw", "boolean")
    MAGLEV = Attribute("maglev", "boolean")
    MILITARY = Attribute("military", "boolean")
    MONORAIL = Attribute("monorail", "boolean")
    NATIVE_PEDESTRIAN = Attribute("native pedestrian", "boolean")
    NONE = Attribute("none", "boolean")
    NORMAL = Attribute("normal", "boolean")
    PEDESTRIAN = Attribute("pedestrian", "boolean")
    PKW = Attribute("pkw", "boolean")
    SNOW_PLOW = Attribute("snow plow", "boolean")
    SUBWAY = Attribute("subway", "boolean")
    TRACTOR = Attribute("tractor", "boolean")
    TRAIN = Attribute("train", "boolean")
    TRAM = Attribute("tram", "boolean")
    USER0 = Attribute("user0", "boolean")
    USER1 = Attribute("user1", "boolean")
    USER2 = Attribute("user2", "boolean")
    USER3 = Attribute("user3", "boolean")
    USER4 = Attribute("user4", "boolean")
    USER5 = Attribute("user5", "boolean")
    USER6 = Attribute("user6", "boolean")
    USER7 = Attribute("user7", "boolean")
    USER8 = Attribute("user8", "boolean", changes=[
        AttributeChange(ChangeType.REMOVED, "1.12.26", "Removed to make space for elevated train flag.")
    ])
    ELEVATED_TRAIN = Attribute("elevated train", "boolean", changes=[
        AttributeChange(ChangeType.ADDED, "1.12.26")
    ])
