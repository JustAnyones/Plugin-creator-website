# pyright: reportImplicitRelativeImport=false
import copy

from enum import Enum

from base import Attribute

class CustomEnum(Enum):
    def copy(self) -> Attribute:
        """Returns a copy of the attribute."""
        return copy.copy(self.value)

class Aspect(CustomEnum):
    EDUCATION_LOW = Attribute("education low", "integer", "The student capacity of a school.")
    EDUCATION_HIGH = Attribute("education high", "integer", "The student capacity of a high school.")
    HEALTH_CARE = Attribute("health care", "integer", "The patient capacity of a hospital.")
    WASTE_DISPOSAL = Attribute("waste disposal", "integer", "The garbage capacity of a garbage processing facility.")
    BODY_DISPOSAL = Attribute("body disposal", "integer", "The body capacity of a deceased processing facility.")

class Influence(CustomEnum):
    POLLUTION = Attribute("influence pollution", "integer")
    NOISE = Attribute("influence noise", "integer")
    HEALTH = Attribute("influence health", "integer")
    POLICE = Attribute("influence police", "integer")
    FIRE_DEPARTMENT = Attribute("influence fire department", "integer")
    PARK = Attribute("influence park", "integer")
    SPORT = Attribute("influence sport", "integer")
    EDUCATION_LOW = Attribute("influence education low", "integer")
    EDUCATION_HIGH = Attribute("influence education high", "integer")
    CULTURE = Attribute("influence culture", "integer")
    MANAGEMENT = Attribute("influence management", "integer")
    RELIGION = Attribute("influence religion", "integer")
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
    NATURE = Attribute("influence nature", "integer")
    WASTE_DISPOSAL = Attribute("influence waste disposal", "integer")
    BODY_DISPOSAL = Attribute("influence body disposal", "integer")
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
    USER8 = Attribute("user8", "boolean")
