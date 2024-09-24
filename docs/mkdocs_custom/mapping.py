from types import GenericAlias
from typing import TypedDict

BaseConcreteType = type | str

class AttributeCollection:
    def __init__(self, inner_type: BaseConcreteType) -> None:
        self.inner_type = inner_type

ConcreteType = BaseConcreteType | tuple[BaseConcreteType]

class MappingStruct(TypedDict):
    name: str
    doc: str

# TODO: fix
ROOT_PATH = "/docs"
type_mapping: dict[str | type, MappingStruct] = {
    int: {
        'name': "integer",
        'doc': f"{ROOT_PATH}/attribute-types/base#integer"
    },
    str: {
        'name': "string",
        'doc':  f"{ROOT_PATH}/attribute-types/base#string"
    },
    float: {
        'name': "float",
        'doc':  f"{ROOT_PATH}/attribute-types/base#float"
    },
    bool: {
        'name': "boolean",
        "doc":  f"{ROOT_PATH}/attribute-types/base#boolean"
    },
    '1d-array': {
        "name": "array",
        "doc":  f"{ROOT_PATH}/attribute-types/base#arrays"
    },
    'attribute-collection': {
        "name": "Attribute collection",
        "doc": f"{ROOT_PATH}/attribute-types/attribute-collection"
    },
    'Color': {
        "name": "Color",
        "doc":  f"{ROOT_PATH}/attribute-types/color/index"
    },
    'CarFlags': {
        "name": "Car flags",
        "doc": f"{ROOT_PATH}/attribute-types/car-flags"
    },
    'Meta': {
        "name": "Meta",
        "doc": f"{ROOT_PATH}/attribute-types/meta"
    },
    'Frame': {
        "name": "Frame",
        "doc": f"{ROOT_PATH}/attribute-types/frame"
    }
}

def mapping_to_link(type: BaseConcreteType, quote: bool = True):
    mapped = type_mapping.get(type)
    if mapped is None:
        return f"`{type}`"
    if quote:
        return f"[`{mapped['name']}`]({mapped['doc']})"
    return f"[{mapped['name']}]({mapped['doc']})"

def _parse_base_type_to_link(base_type: BaseConcreteType):
    array_levels = 0
    while isinstance(base_type, GenericAlias):
        array_levels += 1
        base_type = base_type.__args__[0]

    if array_levels == 1:
        return f"{mapping_to_link(base_type)} {mapping_to_link('1d-array', False)}"

    if array_levels == 2:
        return f"{mapping_to_link(base_type)} {mapping_to_link('2d-array', False)}"

    if isinstance(base_type, AttributeCollection):
        return (
            f"{mapping_to_link('attribute-collection', False)}"
            " of " 
            f"{mapping_to_link(base_type.inner_type)}"
        )
    return mapping_to_link(base_type)

def type_to_link(attr_type: ConcreteType) -> str:
    if isinstance(attr_type, tuple):
        result = ""
        for value in attr_type:
            result += _parse_base_type_to_link(value)
            result += " or "
        return result[:-3]
    return _parse_base_type_to_link(attr_type)
