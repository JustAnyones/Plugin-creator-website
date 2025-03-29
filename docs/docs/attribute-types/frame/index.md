# Frame

This refers to an attribute object that is used to define frames (textures) for drafts.

Presence of specific attributes defines what kind of frame is loaded, the following is the loading order:

- If it's an empty array -- [Empty frame](empty.md)
- If the object is null -- [Invisible frame](invisible.md)
- If the object has attribute `"silent frames"` -- [Silent frame](silent.md)
- If the object has attribute `"steal"` -- [Steal frame](steal.md)
- If the object has attribute `"ref"` -- [Reference frame](reference.md)
- If the object has attribute `"bmp"` -- [Image frame](bmp.md)
- Otherwise -- [Texture space frame](texture-space.md)
