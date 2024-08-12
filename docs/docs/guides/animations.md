# Animations

First of all, let's define our animation draft:
```json
[{
    "id": "myanimation",
    "frames": [
        {
            "bmp": "myanim.png",
            "move x": 5, //In moment number 1, our animation will be in x 5
            "move y": 16 //and in y 16
        },
        {
            "bmp": "myanim.png",
            "move x": 10, //In moment number 2, our animation will be in x 10
            "move y": 16  //and in y 16
        }     
    ],
    "handle interpolation": 5 //5 ticks between moment 1 and moment 2
}]
```

Now to use it on a building, we would add it to the animation attribute array like so:
```json
[{
    "id": "buildingwithanimation",
    "type": "decoration",
    "width": 1,
    "height": 1,
    "frames": [{"bmp": "basepart.png"}],
    "animation": [
        {"id": "myanimation"}
    ]
}]
```

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=7455)
on the official TheoTown forum.
</sub>
