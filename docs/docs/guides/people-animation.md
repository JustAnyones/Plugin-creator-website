# People animation

Maybe you want to put animated people into your plugins. We tried to make it easier for you by providing both, people graphics as well as an easier way to define animations. This will work since version 1.2.81.

Let's start with the example. The json code is:
```json
[
  {
    "id":"$anim_peoplesample00_people00",
    "type":"animation",
    "frames":[
      {"steal":"$anim_people_source00","frame":0,"move x":6,"move y":0},   // These are the important lines here
      {"steal":"$anim_people_source00","frame":0,"move x":22,"move y":-2}, //
      {"steal":"$anim_people_source00","frame":0,"move x":16,"move y":4}   //
    ],
    "handle interpolation":8
  },
  {
    "id":"$anim_peoplesample00_people01",
    "type":"animation",
    "frames":[
      {"steal":"$anim_people_source00","frame":1,"move x":15,"move y":-6},  // These are important, too
      {"steal":"$anim_people_source00","frame":1,"move x":16,"move y":-6}   //
    ],
    "handle interpolation":8
  },
  
  {
    "id":"$peoplesample00",
    "type":"decoration",
    "width":1,
    "height":1,
    "frames":[{"steal":"$ground00","frame":0}],
    "animation":[
      {"id":"$anim_peoplesample00_people00"},
      {"id":"$anim_peoplesample00_people01"}
    ]
  }
]
```

For this sample, no external graphics are needed as we use a feature called frame stealing.

The result of this sample can be seen here:
<iframe width="560" height="315" src="https://www.youtube.com/embed/UXA5pTx3m_I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Let's have a closer look at the sample code. We define two animations which we use then later for the decoration on which the animations should be shown. The important part of the animation definitions is frame stealing of an animation called "$anim_people_source00". We provide these frames for you so you don't have to waste plugin texture space with it. The used image looks like this:

![](../assets/guides/people.png)

Remember that people in the game have a size of 1x3 pixels, so we have 16 frames of different people here. We can steal a single frame of the animation by writing
```json
{"steal":"$anim_people_source00","frame":0,"move x":6,"move y":0}
```
This will steal frame 0 and will move it to position (6|0) relative to the pivot point of our decoration (which we'll define later). In our sample we steal frame 0 three times in the first animation, each time with a different movement. The second animation steals frame 1 two times.

On animation side, most of the work is already done. We have an animation with three frames, each frame containing a human frame at a different position. If we would use this animation just as it is, it wouldn't look as if the human is walking around. Instead he would jump between the three points we defined by the frame movement. To solve this issue we can tell the plugin loader to interpolate movements between the given movements. In order to do so we define `"handle interpolation":8` which will increase our frame count by 8 times. Now the animation looks good.

In the last step we have to define something that uses the animation. In this case it's a decoration which steals it's frame from the default ground frames. We don't have to provide a position for the animations as they will implicitly have position (0|0) (as always, relative to the pivot point).

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=2232)
on the official TheoTown forum.
</sub>
