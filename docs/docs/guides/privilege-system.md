# Privilege system

TheoTown supports creation of plugins that use features that could be harmful for the vanilla game.

Some of these features might include, but are not limited to:

- Earning in-game currency
- Custom tunnel pricing
- Replacing the world texture
- Support for higher draft width/height values

Due to the inherit threat these features have for co-existence within the plugin ecosystem, plugin
creators wanting to use these features have to apply for a trusted plugin creator status.

## How it works

### Pre 1.11.73

Using an older privilege system, you would reach out to the developers to 
obtain a trusted plugin creator code that you would supply in a draft definition using the
`privileged` attribute like so:

```json
[{
  "id": "$police00",
  "type": "police",
  "width": 2,
  "height": 2,
  "price": 18000,
  "monthly price": -3000, // If we want to have monthly income, we need the privileged tag
  "privileged": "your code that you obtained from the developers"
}]
```

### Post 1.11.73

In the new privilege system, instead of supplying a privileged key,
you simply declare whether a draft requires privileges using the `require privileges` attribute.

The above example would be changed like so:
```json
[{
  "id": "$police00",
  "type": "police",
  "width": 2,
  "height": 2,
  "price": 18000,
  "monthly price": -3000, // If we want to have monthly income, we need the privileged tag
  "require privileges": true
}]
```

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

Plugins, that have been signed before the user gained privileged access, will not retroactively gain privileged access.


## Privileged features

!!! danger "Privileged access is required for the features described below."

This is an incomplete list of features that are available to privilege drafts.
Lua functions are not included as they are documented separately.

### Monthly income

You can add monthly income to your drafts by specifying a negative monthly price:
```json
"monthly price": -100
```
For non privileged plugins monthly income is limited to 1T.


### Tunnel price
You can override the default diamond price for tunnels:
```json
"tunnel diamond price": 0
```
Tunnels can only cost diamonds or be free.

### Image placement
You can alter the world texture by putting your own images at specified positions in it:

```json
"frames": [{"bmp": "img.png", "place x": 0, "place y": 0}]
```

This code places image **img.png** at position 0, 0 in the world texture. This might be useful to:

1. Replace in-game graphics;
2. Save plugin texture space by putting your graphics in other, maybe unused parts of the world texture.

### Higher width ceiling
You can specify a higher width/height attribute.

### Add/remove money with Fun

```json
"actions":[{"type":"money","x":100}]
```

This example gives 100T to the player.

### Bypass influence/power/water limits

You can bypass limits enforced by game on influence/power/water values.
