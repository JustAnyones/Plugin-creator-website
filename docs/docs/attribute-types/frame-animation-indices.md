# Frame animation indices

Frame animation indices attributes provide precise control over which of the defined animations should be visible for each of the building's specified frames.

While frames are often used to represent different rotations (a common use case), they can be used for any situation where a single building definition needs to display different animations at different times or states.

## How it works

1. The array of animations is defined under the `"animation"` attribute. These are indexed starting from 0 (e.g., the first animation is index 0, the second is index 1, and so on).
2. The `"frames"` attribute dictates the total number of frames the object has.
3. The `"frame animation indices"` attribute is a array of arrays. The index of the outer array corresponds to the frame number (starting at 0), and the inner array contains the indices of the animations that should be visible in that specific frame.

## Example: Rotation-Aware Blinking Light

This example shows how to make a blinking light animation appear in a different position for each of the four rotations (frames 0, 1, 2, and 3) of a 2x2 building:
```json
[
  {
    "id": "$random_plugin",
    "type": "deco",
    "width": 2,
    "height": 2,
    "frames": [{...}, {...}, {...}, {...}],
    "rotation aware": true,
    "animation": [
      {"id": "$animationblinkingredlight3x3", "x": 52, "y": -10}, // Animation 0
      {"id": "$animationblinkingredlight3x3", "x": 52, "y": -20}, // Animation 1
      {"id": "$animationblinkingredlight3x3", "x": 12, "y": -20}, // Animation 2
      {"id": "$animationblinkingredlight3x3", "x": 12, "y": -10}  // Animation 3
    ],
    "frame animation indices": [
      [0],    // Only show Animation 0 in the first frame
      [1],    // Only show Animation 1 in the second frame
      [2, 3], // Only show Animation 2 and 3 in the third frame
      [3]     // Only show Animation 3 in the fourth frame
    ]
  }
]
```

<sub>
This page has been adapted from
[a post](https://forum.theotown.com/viewtopic.php?p=49471#p49471)
on the official TheoTown forum.
</sub>
