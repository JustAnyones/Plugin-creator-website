# Privilege system

TheoTown supports creation of plugins that use features that could be harmful for the vanilla game.

Some of these features might include, but are not limited to:

- Earning in-game currency
- Custom tunnel pricing
- Replacing the world texture
- Support for higher draft width/height values

Due to the inherit threat these features have for co-existence within the plugin ecosystem, plugin
creators wanting to use these features have to apply for a trusted plugin creator status.

## Privileged features

This is an incomplete list of features that are available to privilege drafts.
Lua functions are not included as they are documented separately.

### Monthly income

You can add monthly income to your drafts by specifying a negative monthly price:
```json
"monthly price": -100
```

## How it works

### Pre 1.11.73

Using an older privilege system, you would reach out to the developers to 
obtain a trusted plugin creator code that you would supply in a draft definition using the
`privileged` attribute like so:

```json
[{
    "id":"$police00",
    "type":"police",
    "width":2,
    "height":2,
    "frames":[{"x":1792,"y":1024,"w":64,"h":48}],
    "frames winter":[{"x":960,"y":810,"w":64,"h":48,"offset x":1024,"offset y":2048}],
    "animation":[
      {"id":"2x2l", "x":14, "y":-22},
      {"id":"2x2l", "x":20, "y":-14},
      {"id":"2x2l", "x":30, "y":-14},
      {"id":"2x2l", "x":32, "y":-13},
      {"id":"2x2l", "x":42, "y":-11}
    ],
    "price":18000,
    "monthly price":-3000, // If we want to have monthly income, we need the privileged tag
    "privileged": "your code that you obtained from the developers",
    "influence police":100,
    "requirement":{"requirements":[{"type":"RANK", "data":{"lvl":5}}]},
    "performance":true,
    "pedestrian": "$pedestrian_police00",
    "pedestrian count": 1
}]
```

### Post 1.11.73

In the new privilege system, instead of supplying a privileged key,
you simply declare whether a draft requires privileges using the `require privileges` attribute.

Whether the draft actually gets privileged is determined by the game.

- **If you are developing a local plugin**

    Game will determine if the plugin is privileged by checking whether the game account that
    you are currently logged in as has privileged access.

- **If you are using a plugin store plugin**

    Game will determine if the plugin is privileged by checking whether the author that
    uploaded the plugin has privileged access.

- **If you are using a local plugin**

    Game will determine if the plugin is privileged by checking whether the user under whom
    the plugin has been signed has privileged access.

Plugins, that have been signed before the user gained privileged access, will not retroactively gain
privileged access.
