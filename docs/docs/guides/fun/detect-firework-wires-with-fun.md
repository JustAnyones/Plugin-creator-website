# Detect firework wires using Fun

This tutorial should help those of you who want to utilize the firework wire's functionality without having to make your own wire.  

It is very simple to use a wire in your condition:
```json
"condition":{"type":"building","id":"$on"}
```

All you need is something like this that checks for the ID `"$on"`. Very simple, but very useful.
If you want to detect when the wire is off, then you'll need to use the ID `"$off"`.  
There's no need to worry about detecting frames.  Checking for the ID will be enough.

Here's an example of its usage:
```json
[{
	"frames":[{"steal":"$res00"}],
	"height":1,
	"id":"wire_sensor.kt101",
	"needs road":false,
	"power":0,
	"price":0,
	"text":"Wire sensor",
	"title":"Wire sensor",
	"type":"terrain",
	"water":0,
	"width":1,
	"fun":[
		{
			"condition":{"type":"building","id":"$on","x":1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","x":-1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","y":1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","y":-1},
			"actions":[{"type":"remove"}]
		}
	]
}]
```

This code checks for an activated wire nearby and removes the building when the condition is true.

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=10492)
on the official TheoTown forum.
</sub>
