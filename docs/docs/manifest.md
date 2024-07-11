# Plugin manifest

The manifest file `plugin.manifest` was introduced in version 1.8.15 to support
the use of local plugins in the online mode.

It must be included at the root directory of your plugin and must be named exactly `plugin.manifest` for the game to recognize it.

This file is a requirement if you want to create an encrypted `.plugin` file and use privileged features.

## Minimal example

An example manifest file could look like this:

**plugin.manifest:**
```json
{
    "id":"$justanyone_dsa_manifest00",
    "version":42,
    "title":"DSA Integration",
    "text": "This integration adds better supply systems, few new service cars, a new road which is faster and cheaper, a new disaster, DSA flags, new buildings, a lot of events, a space dimension to explore, new methods to earn money and much more.",
    "author": "JustAnyone",
    "thumbnail": "iap.png"
}
```

The `iap.png` is an image included together with the manifest file.

## Attributes

Manifest file support the following attributes:

### id
::: type: string
::: required: true

A unique identifier that uniquely identifies the plugin.

### version
::: type: integer

A positive integer that specifies the plugin version.

### title
::: type: string
::: required: true

The title of the plugin.

### text
::: type: string

The description of the plugin.

### author
::: type: string

The name of the author behind the plugin.

### thumbnail
::: type: string

The path to the plugin thumbnail image.

### url
::: type: string
::: version-added: 1.8.16

A URL from where the plugin can be obtained from.

### min version
::: type: integer

Specifies the minimum version of the game that the plugin can run under.

### permanent
::: type: boolean
::: default: false

Whether the plugin counts as a local plugin.

### multiplayer
::: type: boolean
::: default: true
::: version-added: 1.8.33

Whether the plugin can be used in online mode.

### once
::: type: boolean
::: default: false

Whether the plugin manifest should be loaded once.

What this means is that if another manifest is encountered with the same ID, game will ignore loading it
rather than failing with an error message.

### platforms
::: type: string[]

An array of platforms that the plugin can run under. Generally, this should only be used in case of
Lua or shader plugins as regular plugins should be compatible with every platform.

Internally, the platform is determined by `ApplicationType` enumerable which is provided by libgdx.

Supported values: `android`, `desktop`, `ios`.

#### Example

In this example we limit our plugin to iOS and PC platforms.

```json
{
    "id": "$my_amazing_plugin_manifest00",
    "title": "My amazing plugin",
    "platforms": ["desktop", "ios"]
}
```

### category
::: type: boolean
::: default: true

Whether the plugin should show up in the plugins category.