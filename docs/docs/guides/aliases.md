# ID aliases

!!! info "Added in version 1.8.96"

A new feature introduced with version 1.8.96 are plugin ids aliases. They can be useful if you want to change the ids of objects that can be used by others (e.g. light definitions). Since changing the ids would break plugins that depend on the former ids you can now specify aliases for the id under which the plugin can be found, too.

Let's assume you have the following json code:
```json
[
  {
    "id": "myoldid",
    ...
  }
]
```

You can now define an alias just like that:
```json
[
  {
    "id": "myoldid",
    "alias": "newid",
    ...
  }
]
```

You can also define multiple aliases:
```json
[
  {
    "id": "myoldid",
    "aliases": ["newid", "anothernewid"],
    ...
  }
]
```

It doesn't matter if you write `alias` or `aliases` as attribute name, both can take a single string or an array of strings. Plugin references to other plugins by id should behave equivalent no matter if it uses the original id or an alias id of it.

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=11864)
on the official TheoTown forum.
</sub>
