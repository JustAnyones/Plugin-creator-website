# Real time script editing

If you tried to use Lua for your plugins in the past you may have noticed that restarting the game every time you made a change to the script can be really time consuming. Wouldn't it be nice - and way more productive - to be able to edit a script with the game applying the changed automatically in real time? That's exactly what can be done by a helper script called #LuaWrapper.

Right now your json to include a script may look like that:
```json
"script":"myscript.lua"
```

For real time scripting use this form:
```json
"script":"#LuaWrapper",            // Use the wrapper as primary script
"meta":{
    "luawrapper":{
        "script":"myscript.lua",   // This is your script file
        "dev":true                 // Actually enable real time editing
    }
}
```

This looks complicated, so how does it work? The #LuaWrapper script (that is predefined in the game) handles loading and reloading the given script file "myscript.lua" once it detects changes. The "dev":true is there as an easy switch to disable real time scripting, e.g. for release of the plugin.

## Caveats
Of course there are some caveats because of which real time scripting is not used by default for scripts. Especially, it should not be used in published plugins:

* **Performance**

    The game makes static assumptions about when a script has to be executed. For example, if a script doesn't implement the script:update function then it won't even be considered once the update event triggers. Scripts that may change at any point in time cannot be optimized in this regard as they have to be considered all the time. Another aspect is that the #LuaWrapper redirects calls on the real time script which adds some overhead.

* **Lua lifecycle**

    The lifecycle for Lua scripts provides a well defined order of when script functions will be called.
    See [the documentation](https://doc.theotown.com/topics/00-intro.md.html) about that.
    Real time scripts break this lifecycle by being loaded at a later point in time (usually after all other scripts have been initialized). Although the #LuaWrapper ensures that the init functions of the real time script will be called, dependencies to other scripts might not work as expected.

* **Hidden script object**

    For normal scripts you can use `Draft:getScripts()` to access the script objects that are attached to a draft. However, since the real time script is wrapped by the #LuaWrapper you can only get access to that one. The real time script doesn't exist as an usual script object, instead it uses a table that uses the #LuaWrapper as a prototype. This is done so that from the point of view of the real time script, it is a full fledged script object.

See here for a video of how real time editing looks like: <br/>
[https://www.youtube.com/watch?v=EE9qoKTCbZ0](https://www.youtube.com/watch?v=EE9qoKTCbZ0)

The example can be downloaded from here: <br/>
[realtimelua.zip](../assets/guides/realtimelua.zip)

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=10834)
on the official TheoTown forum.
</sub>
