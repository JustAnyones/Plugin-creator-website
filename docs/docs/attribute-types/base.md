# Base JSON types

This covers the base types that are part of the [JSON specification](https://www.json.org/json-en.html).

TheoTown's JSON parser is fault tolerant, henceforth it can treat values
provided in a string format as some other type.
However, there are [cases](../draft-types/decoration.md#draw_water_ground) where it can create ambiguities due to an attribute accepting different types of values.
Therefore, you are recommended to not rely on TheoTown's JSON parser to always treat your string type values as some other type.

TheoTown also silently ignores attributes (keys) that a specific draft doesn't support.

## Boolean

Booleans refer to truthy values. They can have 2 values: either `true` or `false`.

```json
{
    "auto build": false, // whether a building should be auto built
    "draw ground": true  // whether to draw ground under the building where transparent
}
```

## Integer

Integers refer to numeric values.

```json
{
    "price": 5000,    // price of a building
    "build time": 46  // amount of days it takes to build a building
}
```

## Float

Floats (floating-point numbers) refer to real numbers.

```json
{
    "pi": 3.14,
    "g": 9.8,
    "speed multiplier": 2.5
}
```

## String

Strings refer to text values. These values have to be enclosed in quotation marks.

Examples of such include:
```json
{
    "title": "My amazing building",
    "text": "This building was built in 1988 when..."
}
```

To add a new line in the string, you would use [escape sequence](https://en.wikipedia.org/wiki/Escape_sequence),
in this case, `\n`.

It would look like this:
```json
{
    "text": "Top text\nI'm on the new line now!!!"
}
```

## Arrays

Arrays are used for providing multiple values for an attribute.

```json
{
    "id": "$my_new_id00",
    "aliases": ["$my alternative id", "$my_old_id"]
}
```

## Objects

Objects are used for providing multiple attributes for an attribute. Most of the types covered in this
documentation section are considered objects. A simple plugin begins with an array that contains the draft object with draft attributes.

```json
{
    "meta": {
        "dsa": true,
        "some data one can access through lua": ["industrial", "complex"]
    }
}
```
