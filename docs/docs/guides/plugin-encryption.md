# Plugin encryption

If you want (or are obligated, in the case of privileged plugins) to protect the contents of your plugin, TheoTown has
a system for plugin content encryption.

## .ttplugin file creation

This a relatively new encrypted plugin format, available since version 1.11.73.

It was created to facilitate a new privilege system for which the old format
was not adequate. A key difference between the old `.plugin` format is that `.ttplugin` files are signed.

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

To encrypt the file, first of all, create a ZIP archive of the `example_plugin` folder.
Ensure that it contains a manifest file, otherwise the encryption will fail. Manifest files are a requirement
for this encryption format.

After you have the ZIP archive, go to the [plugin encryption page](https://forum.theotown.com/plugins/export).
Ensure that you are logged into your TheoTown account.

Then follow all the steps on the page and if you're successful, it will yield an encrypted
`.ttplugin` file which you can share with others.

**Note that you cannot restore files from the encrypted file, so don't delete the source folder.**

## .plugin file creation

!!! danger "Removed feature"
    This is an old method of plugin encryption that has been superseded by the
    new [`.ttplugin`](#ttplugin_file_creation) format.

    While the ability to read old `.plugin` files remains, the ability to create
    new files has been removed in 1.11.81.

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

It's very simple, simply open up the in-game console and run the command:
<!-- JS has nice colors -->
```js
export:{dir:"example_plugin"}
```

If everything went successfully, a file should get created under TheoTown folder
called `example_plugin.plugin`.

Now you can share that file with anyone as you would
with a normal folder archive.

**Note that you cannot restore files from the encrypted file, so don't delete the source folder.**
