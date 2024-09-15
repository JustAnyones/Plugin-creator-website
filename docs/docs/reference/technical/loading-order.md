# Loading order

This provides a slightly more in-depth look at how the game loads local plugins.

The general draft loading order looks something like:

1. Native game drafts and contents are loaded
2. Generated game drafts and contents are loaded (these drafts are generated on demand, usually for some complex light definitions)
3. External (local) plugins are loaded
4. Managed (plugin store) plugins are loaded


## Local plugin loading

Plugins are loaded in a recursive fashion.

First, game goes to the plugin directory, prepares to load all files and directories that are not [ignored](#ignored_files_and_directories).

Then it begins loading the current directory (`plugins` directory for the first time) by sorting files and directories by English locale in
an ascending way. Files and directories are sorted separately.

### Manifest loading

If we're on any subdirectory of the plugins directory that has a plugin.manifest file, manifest should be loaded.

### File loading

After files get sorted, each file runs through the following logic:

- **if file ends with .json:**

    It is treated as a definition and the parent manifest is included

- **if file ends with .zip/.plugin**

    The file will be decrypted/extracted and loaded like a directory immediately.

- **if file ends with .ttplugin**

    If file is included inside another plugin, will throw an error.
    If file is in a directory or subdirectory where plugin.manifest was defined, will throw an error.

    Otherwise, the file will be decrypted/extracted and loaded like a directory immediately.

### Directory loading

After files get loaded, game proceeds to repeat these loading steps for every discovered directory
in a recursive fashion.

## Ignored files and directories

Files or directories that begin with the following characters are ignored: `_` or `.`.

Game will also ignore a .zip file if there's a directory with the same name.
For example, if we have a `sample` directory, the sibling file `sample.zip` won't get loaded.
