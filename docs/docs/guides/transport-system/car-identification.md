# Car identification

In the past you had to override one of the cars `"$carres00"`, `...`, `"$carind00"`, `...`
in order to get your own RCI or service cars into the game. As an alternative,
game allows you to specify car tags that the game can use to identify such cars.

To mark your car as level 1 residential car use:
```json
"meta": {
  "tags": {
    "carres0": {}
  }
}
```

For a level 3 industrial car use:
```json
"meta": {
  "tags": {
    "carind2": {}
  }
}
```

The complete definition of a level 1 residential car would look like:
```json
{
  "id": "$carres00",
  "type": "car",
  "frames": [
    {"x": 512, "y": 512, "w": 12, "h": 10, "count": 8}
  ],
  "v2": true,
  "auto colorize": true,    // Can be used to color white frames
  "flag normal": false,     // This is not a normal car as it's not a truck
  "flag pkw": true,         // And only for person transport
  "meta": {
    "tags": {
      "carres0": {}     // You may use multiple tags for one car
    }
  }
}
```

Service cars can also be tagged the same way. So you can just add new medic cars for example:
```json
"meta": {"tags": {"medic": {}}}
```

These changes were made in order to add more RCI cars without tampering with the existing ones.

You can find a full list of car tags [here](../../attribute-types/meta/tags.md#car_tags).

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=6373)
on the official TheoTown forum.
</sub>
