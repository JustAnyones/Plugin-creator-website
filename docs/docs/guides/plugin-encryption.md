# Plugin encryption

If you want (or are obligated, in the case of privileged plugins) to protect the contents of your plugin, TheoTown has
a system for plugin content encryption.

## .plugin file creation
!!! warning "Deprecated"
    This is an old method of plugin encryption that has been superseded by the
    new [`.ttplugin`](#ttplugin_file_creation) format.

    While ability to read old `.plugin` files will continue to be supported,
    the ability to create new ones will be removed in the future.

!!! warning "Note"
    If you want to encrypt a plugin that requires privileges,
    consider using the [`.ttplugin`](#ttplugin_file_creation) format instead.

Let's assume we want to encrypt our plugin which is in the `example_plugin` sub folder
in our plugins folder:
```sh
- TheoTown
  - plugins
    - example_plugin
      - code.json
      - image.png
      - plugin.manifest
    - sample
```

Open up the in-game console and run the command:
<!-- JS has nice colors -->
```js
export:{dir:"example_plugin"}
```

If everything went successfully, a file should get created under TheoTown folder
called `example_plugin.plugin`. **Note that the process cannot be reversed so don't delete your folder.**

Now you can share that file with anyone as you would
with a normal folder archive.

## .ttplugin file creation

This a new format, available since version 1.11.73.

It was created to facilitate a new privilege system for which the old format
was not adequate enough.

Let's assume this is your current folder structure with `example_plugin` folder being
the folder of a plugin you want to encrypt:
```sh
- TheoTown
  - plugins
    - example_plugin
      - code.json
      - image.png
      - plugin.manifest
    - sample
```

A key difference between the old `.plugin` format is that `.ttplugin` files are signed.

To encrypt the file, first of all, create a ZIP archive of the `example_plugin` folder.
Ensure that it contains a manifest file, otherwise the encryption will fail. Manifest files have
become a requirement for this new format.

After you have the ZIP archive, go to the [plugin encryption page](https://forum.theotown.com/plugins/export).
Ensure that you are logged in.

Then follow all the steps on the page and if you're successful, it will yield an encrypted
`.ttplugin` file which you can share with others.

**Note that you cannot restore files from the encrypted file, so don't delete the source folder.**
