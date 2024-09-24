# Fireworks

Fireworks are not defined as any special format, bus as an animation with a [firework meta tag](../attribute-types/meta/tags.md#firework).

This guide documents how to make your own firework. You won't need any graphics here, because the particle frames are stolen from a game draft.

```json
[
  {
    "id":"$firework30","type":"animation","frames":[{"steal":"$anim_firework00","frame":2}],
    "meta":{"tags":{"firework":{
      "alpha":0.5, 
      "speed":15,
      "speed variation":0,
      "n":1,
      "time":2500,
      "time variation":0,
      "next":[
          {"id":"$firework31",  "always":true}, 
          {"id":"$firework32"}
       ]
    }}}
  },
  {
    "id":"$firework31","type":"animation","frames":[{"steal":"$anim_firework00","frame":2}],
    "meta":{"tags":{"firework":{
      "alpha":100, 
      "speed":5,
      "speed variation":1,
      "n":1000,
      "time":750,
      "time variation":1
    }}}
  },
  {
    "id":"$firework32","type":"animation","frames":[{"steal":"$anim_firework00","frame":3}],
    "meta":{"tags":{"firework":{
      "alpha":100, 
      "speed":5,
      "speed variation":1,
      "n":1000,
      "time":750,
      "time variation":1
    }}}
  },
  {
    "id":"$syl_spawner03",
    "type":"decoration",
    "category":"$category_firework00",
    "title":"Willow",
    "text":"A big willow.",
    "width":1,
    "height":1,
    "frames":[{"x":960,"y":524,"w":32,"h":20,"offset x":1024,"offset y":1024}],
    "on click fun":[
      {
        "actions":[{"type":"firework","id":"$firework30","z":1}]
      }
    ],
    "fun":[
      {
        "condition":{"type":"or","inner":[
          {"type":"building","id":"$on","x":1},
          {"type":"building","id":"$on","y":1},
          {"type":"building","id":"$on","x":-1},
          {"type":"building","id":"$on","y":-1}
        ]},
        "actions":[{"type":"firework","id":"$firework30","z":1}]
      }
    ],
    "requirements":[{"type":"FEATURE","id":"$feature_firework00"}]
  }
]
```

The frames are from a draft called $anim_firework00, from left to right (0-14):

![](../assets/guides/firework-particles.png){: style="width:30%;image-rendering:crisp-edges;"}

The whole code for the huge willow. Let's go through it!

- **"alpha"** - The direction of the particle(s).
- **"speed"** - The speed of a particle(s).
- **"speed variation"** - If there should be variation in speed of the particle(s).
- **"n"** - The number of particles to spawn.
- **"time"** - The duration of the particle(s).
- **"time variation"** - If there should be variation in the duration of the particle(s).
- **"next"** - The id of the particle(s) that should spawn after the lifetime of the current particle(s) expired.

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=5683)
on the official TheoTown forum.
</sub>
