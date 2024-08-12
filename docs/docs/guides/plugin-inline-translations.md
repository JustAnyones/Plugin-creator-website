# Plugin inline translations

Until now the only way to translate plugins was by doing it hardcoded in the project itself.
That means you weren't able to provide translations for your own plugins and rather had
to offer different variants in order to offer localization.

Version 1.5.56 will solve that by introducing inline translations for plugins. The way this will work is by using a special syntax within the plugin. Let's have a look at this example from the wandering animals plugin:

```json
"title":"Wandering animals"
```

That's how the title definition looks right now. This notion will still work in the future, but we can append specialized translations to it by writing `[languagetag]Translation`. For example for the case of a German translation that would look like:

```json
"title":"Wandering animals[de]Streunende Tiere"
```

You can append as many specialized translations as you want to.
The game will then pick that one that's closest to the current language.
The first case (here the English one without []) will be used as a fallback translation
if no other translation does fit. I recommend to use English for it.

This special syntax will also work for the text attribute.

Note that only languages that are supported by the game natively can be translated that way. Have a look at
[the public translation repository](https://github.com/LobbyDivinus/theotown-translation)
for the supported language codes right now.

We also suggest that you save the JSON files using UTF-8 encoding to minimize issues reading non-ASCII characters.

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=9016)
on the official TheoTown forum.
</sub>
