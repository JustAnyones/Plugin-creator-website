# Templates

A common issue in writing plugins is code duplication as you use the same code over and over again to define similar things. A solution to this problem are templates.

Let's say your code (simplified) looks something like this:
```json
[
  {
    "id":"$myid00",
    "type":"something",
    "author":"anyone",
    "A":1,
    "B":2,
    "C":[1,2,3,4]
  },
  {
    "id":"$myid01",
    "type":"something",
    "author":"anyone",
    "A":1,
    "B":2,
    "C":[1,2,3,4],
    "D":"Test"  // Additional attribute
  },
  {
    "id":"$myid02",
    "type":"something",
    "author":"anyone",
    "A":8,  // Different value for A
    "B":2,
    "C":[1,2,3,4]
  }
]
```

As you might notice there's some duplication here. Templates can help to extract common definitions into a single object. Here that would look like:

```json
[
  {
    "id":"$mytemplate00",
    "type":"template",
    "author":"anyone",
    "A":1,
    "B":2,
    "C":[1,2,3,4]
   },
  {
    "id":"$myid00",
    "type":"something",
    "template":"$mytemplate00"  // Reference to template, no author, A, B, C needed here anymore
  },
  {
    "id":"$myid01",
    "type":"something",
    "template":"$mytemplate00",  // Reference to template
    "D":"Test"  // Additional attribute can still be applied
  },
  {
    "id":"$myid02",
    "type":"something",
    "template":"$mytemplate00",  // Reference to template
    "A":8  // Override value of A
  }
]
```

So templates are of `template` type (`"type":"template"`) and can predefine anything that can be defined in plugin objects (except `id` and `type` for obvious reasons). To use a template just add `"template":"$templateid"` to your using objects. As usual, order matters. So in order to use a template you have to ensure that it is already defined. You can overwrite definitions provided by a template by just redefining it. Templates can reference to other templates. Any object can only reference to one template at max.

For convenience it can be useful to inherit from multiple templates, you can do so by providing an array of template ids:
```json
"template":["$templateid0", "$templateid1", ...]
```

## Example with buses

Here's how the code for a single bus would look like without templates:
```json
{
  "id":"$bus00",
  "type":"car",
  "frames":[{"x":0,"y":0,"w":10,"h":8,"count":4,"offset x":1024,"offset y":3328}],
  "overlay frames":[{"x":0,"y":0,"w":10,"h":8,"count":4,"offset x":1112,"offset y":3328}],
  "v2":[4,1,3,-1],
  "auto colorize":true,            // These attributes will be needed by any bus
  "flag normal":false,             //
  "flag bus":true,                 //
  "meta":{"tags":{"idle bus":{}}}  //
}
```

This code wouldn't be an issue if you have just a few buses, but here 9 different bus types are needed, so templates were introduced.

Let's define the template:
```json
{
  "id":"$template_bus00",
  "type":"template",
  "auto colorize":true,
  "flag normal":false,
  "flag bus":true,
  "meta":{"tags":{"idle bus":{}}}
}
```
The code that's now needed for each bus:
```json
{
  "id":"$bus00",
  "type":"car",
  "template":"$template_bus00",
  "frames":[{"x":0,"y":0,"w":10,"h":8,"count":4,"offset x":1024,"offset y":3328}],
  "overlay frames":[{"x":0,"y":0,"w":10,"h":8,"count":4,"offset x":1112,"offset y":3328}],
  "v2":[4,1,3,-1]
}
```


<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=6236)
on the official TheoTown forum.
</sub>
