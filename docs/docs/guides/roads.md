# Roads

Let's create a road plugin. We would like to have a blue road similar to the existing country road that looks like this:
[img]http://www.theotown.com/forum/userpix/15_unbenannt_2.png[/img]


To get started we need some frames for the base graphics first: [i]road.png[/i]
[img]http://www.theotown.com/forum/userpix/15_road_1.png[/img]
The orientation follows a specific order. For your own road it's sufficient to use this graphic as template. You have to provide 16 frames here.

As we want to have a bridge we also have to provide graphics for it: [i]bridge.png[/i]
[attachment=1]image.png[/attachment]
The ordering is important :!: 
The number of frames must be a multiple of frames per bridge type. If you have 12 frames per bridge type (the default) and provide 24 frames for example, your road will have two types of bridges. You can set a higher frames per bridge type value by using
[code]"frames per bridge":X[/code]
with X being 12, 16, 18 or 20 dependent on how many frames you want to provide per bridge. Providing more frames gives you more flexibility on how the bridge will look like. The bridge frames will be used that way:
[code]At least 12 frames per bridge
16 to provide ramp graphics which will be used for bridges starting from ground
18 to support "mid" pile frames
20 to support top pile frames

Frame usage:
0-3: slopes
4-7: small railings
8-9: piles
10-11: piles on water (only used on lowest part)
12-13: pile frames for mid part (and top if not provided) (if frames >= 18)
14-15: pile frames for top part (if frames >= 20)
last 4 frames: ramp under road for bridge slopes starting at level 0 (if frames >= 16)[/code]

Additionally, in case we want to have some traffic lights, we might use this ones: [i]tf.png[/i]
[img]http://www.theotown.com/forum/userpix/15_tf_1.png[/img]
If we use traffic lights, we also have to provide more information about phase lengths.

Our json code may now look like
```json
[
  {
    "id":"$testroad00",
    "type":"road",
    "level":1,
    "speed":2.0,

    "frames":[{"bmp":"road.png","w":32,"h":16,"count":16}],

    "bridge frames":[{"bmp":"bridge.png","w":32,"h":48,"count":12}],
    "frames per bridge":12,

    "traffic lights":[{"bmp":"tf.png","w":32,"h":32,"count":4}],
    "green phase":3000,
    "yellow phase":500,

    "price":50,
    "bridge price":200,
    "monthly price":2
  }
]
```

Note how we use can reference multiple frames from one image by providing values **[b]w[/b]**, **[b]h[/b]** and **[b]count[/b]**.

The value [b]level[/b] determines whether this road overrides other road types. Every road has it's own level and can only override roads which have a lower level. Value [b]speed[/b] determines how fast cars will drive on this road. For reference, the slowest road has speed 1.0, the fastest road has speed 5.0 (natively in the game).

If you don't provide any frames for [b]traffic lights[/b] your road won't have any. The values [b]green phase[/b] and [b]yellow phase[/b] indicate phase length in milliseconds (1000ms = 1s).



 :66: 
For recent versions please note that the road on the ramp needs one additional line of pixels on the top end to cover specific transitions between slopes and none slopes. The ramps in the image above have already been fixed.

Since terrain was added you can now specify your own frames that will be used for road that is placed directly onto slopes:
```json
"slope frames":[
  {"x":120,"y":311,"w":32,"h":32,"count":4,"offset x":2048,"offset y":1024}
],
```
For example:
[attachment=0]image.png[/attachment]
By default the game will use the frames provided for flat road and squeeze them onto the slope. Alternatively, if provided, the ramps of the bridge(s) will be used.

See here for how to support pedestrians on your road: https://forum.theotown.com/viewtopic.php?f=41&t=14155
For diagonal roads see here: https://forum.theotown.com/viewtopic.php?p=171988#p171988

## Diagonal roads

Following update 1.9.68, an official support for diagonal roads has been added.

Unfortunately, pre-existing diagonal plugins won't work as there are additional things to consider.

Below is an example of how you would define diagonal roads:
```json
[
  {
    "hidden":true, // Hide the diagonal road parts from toolbar
    "id":"$diagonal_road_diagonal00",
    // ...
    "type":"road",
    "draw ground":true,
    "frames":[
      {"bmp":"diagonal.png","w":32,"h":16,"count":16}
    ],
    "allow diagonal":true // Tell the game to display cars diagonally for this road
  },

  {
    "id":"$diagonal_road00", 
    // ...
    "type":"road",
    "frames":[
      {"bmp":"regular.png","w":32,"h":16,"count":16}
    ],
    "diagonal road":"$diagonal_road_diagonal00" // We reference the real diagonal road, that way the road itself can have regular curves too
  }
]
```
Frames associated with the JSON code above
[attachment=0]regular.png[/attachment]
[attachment=1]diagonal.png[/attachment]

Example of working implementation of such roads provided in a zip here:
[attachment=2]Diagonal Road Test.zip[/attachment]

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=2964)
on the official TheoTown forum.
</sub>
