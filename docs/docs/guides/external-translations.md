# External translations

An easy way to provide translations for your plugins is given by
[inline translations](plugin-inline-translations.md).
However, these can be hard to maintain if you want to collaborate on translations
for larger projects.
So the idea here is to separate translations into separate files that contain nothing else than translations.

As an example you might have exactly one json file right now that contains all the translations:
```json
[
  {
    "id":"$mypark00",
    "type":"park",
    "title":"Park[de]Parkanlage",
    "text":"A small but nice park.[de]Ein kleiner aber gemütlicher Park.",
    ...
  },
  {
    "id":"$mypark01",
    "type":"park",
    "title":"Fountain[de]Springbrunnen",
    "text":"Have some fresh water.[de]Hier gibt es kühles Nass.",
    ...
  },
  ...
]
```

What you can do instead is to have the sole definitions in one file (e.g. main.json)
```json
[
  {
    "id":"$mypark00",
    "type":"park",
    ...
  },
  {
    "id":"$mypark01",
    "type":"park",
    ...
  },
  ...
]
```

which makes your code a bit cleaner :teach 

Translations can be put in separate files e.g. like (let's call it translations.json)
```json
[{
    "id":"$myparkplugin_translations00",
    "type":"translation",
    "*":{ // * is the fallback if no more appropriate translation is available; it's like the first case of inline translations
      "draft_mypark00_title":"Park",
      "draft_mypark01_text":"A small but nice park.",
      "draft_mypark00_title":"Fountain",
      "draft_mypark01_text":"Have some fresh water."
    },
    "de":{
      "draft_mypark00_title":"Parkanlage",
      "draft_mypark01_text":"Ein kleiner aber gemütlicher Park.",
      "draft_mypark00_title":"Springbrunnen",
      "draft_mypark01_text":"Hier gibt es kühles Nass."
    }
}]
```

The translation follows the same scheme as the
[translation for in-game content](https://github.com/LobbyDivinus/theotown-translation)
(which is no coincidence).
It consists of key:translation pairs where the key is automatically generated for each plugin.
For the key special characters are removed from the id, "draft_" is prefixed and,
depending on placement, "_title" or "_text" appended.
This structure allows you to even split up the translations for different languages into different files, e.g. into translations.json and translations_de.json.
Also note that for translations there's no specific order to obey. The objects you translate don't have to be already defined.

You can access translations from Lua using the
[`TheoTown.translate`](https://doc.theotown.com/modules/TheoTown.html#translate) function:
```lua
print(TheoTown.translate('draft_mypark00_title'))
```

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=9436)
on the official TheoTown forum.
</sub>
