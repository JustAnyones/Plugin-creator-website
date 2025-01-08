# Construction cranes

TheoTown allows plugins to add custom construction cranes that spawn on construction sites when the building is being built.

As cranes are almost hardcoded, they don't have any special features apart from ID, type and the frames:
```json
[
  {
    "id": "$sample_crane",
    "type": "crane",
    "frames": [{"bmp": "sample_crane.png", "w": 64, "h": 32, "count": 4}]
  }
]
```

The png file has 4 frames: 2 for the tower, and 2 for the actual crane structure (heading east and north-east).
<!--As an example here's my custom crane image. The image is always 256x64.
matisoncrane.png
You can create your pictures based on this one, but keep in mind the original one was created by Theo.-->

The in-game crane has the ID "$crane" and contains all available cranes. If you add one with an own ID it will be picked with a chance of 50%.

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=4798)
on the official TheoTown forum.
</sub>
