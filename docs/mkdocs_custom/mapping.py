from typing import TypedDict


class MappingStruct(TypedDict):
    name: str
    doc: str

# TODO: fix
type_mapping: dict[str | type, MappingStruct] = {
    int: {
        'name': "integer",
        'doc': "/docs/attribute-types/base/#integer"
    },
    str: {
        'name': "string",
        'doc': "/docs/attribute-types/base/#string"
    },
    float: {
        'name': "float",
        'doc': "/docs/attribute-types/base/#float"
    },
    bool: {
        'name': "boolean",
        "doc": "/docs/attribute-types/base/#boolean"
    },
    '1d-array': {
        "name": "array",
        "doc": "/docs/attribute-types/base/#arrays"
    },
    'Color': {
        "name": "Color",
        "doc": "/docs/attribute-types/color"
    }
}

def mapping_to_link(type: str | type, quote: bool = True):
    mapped = type_mapping.get(type)
    if mapped is None:
        return f"`{type}`"
    if quote:
        return f"[`{mapped['name']}`]({mapped['doc']})"
    return f"[{mapped['name']}]({mapped['doc']})"
