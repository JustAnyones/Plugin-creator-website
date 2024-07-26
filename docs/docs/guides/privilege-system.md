# Privilege system

This guide will contain an overview on the privilege system.

## How it works

### Pre 1.11.73

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
