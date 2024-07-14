# Base types

These are base types covered that are a part of the [JSON specification](https://www.json.org/json-en.html).

TheoTown's JSON parser is fault tolerant, henceforth it can treat values
provided in a string format as some other type. 

However, there are [cases](../draft-types/decoration.md#draw_water_ground) where it can create ambiguities
due to an attribute accepting different types of values. Therefore, you are recommended to not rely on
TheoTown's JSON parser to always treat your string type values as some other type.

## Boolean

Booleans refer to truthy values. They can have 2 values: either `true` or `false`.

```json
{
    "auto build": false,
    "draw ground": true
}
```

## Integer

Integers refer to numeric values.

```json
{
    "price": 5000,
    "build time": 46
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
