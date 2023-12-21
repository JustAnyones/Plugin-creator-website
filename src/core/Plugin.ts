import {Manifest} from "./Manifest";
import {Draft} from "./drafts/Draft";
import {PluginFile} from "./PluginFile";

interface FileMapping {
    [path: string]: PluginFile
}

export class Plugin {
    manifest: Manifest
    drafts: Array<Draft>
    fileMapping: FileMapping

    constructor() {
        this.manifest = new Manifest();
        this.drafts = []
        this.fileMapping = {}
    }


    public addDraft(draft: Draft) {
        draft.setOwner(this);
        this.drafts.push(draft)
    }

    public getFile(logicalPath: string) {
        return this.fileMapping[logicalPath] ?? null
    }


    public addFile(logicalPath: string, pluginFile: PluginFile) {
        const file = this.getFile(logicalPath)
        if (file === null) {
            this.fileMapping[logicalPath] = pluginFile
            return
        }
        file.owners++
    }

    public removeFile(logicalPath: string) {
        const file = this.getFile(logicalPath)
        if (file === null) return;
        file.owners--;
        if (file.owners <= 0) delete this.fileMapping[logicalPath]
    }







    public removeDraftAtIndex(index: number) {
        // Clean up the files
        const files = this.drafts[index].getFiles()
        console.log("Files to be purged:", files)
        for (let i = 0; i < files.length; i++) {
            this.removeFile(files[i])
        }


        this.drafts.splice(index, 1) // Remove item
    }






    public isManifestValid(): boolean {
        return this.manifest.validate()
    }




    public getJsonBlob(): Blob {
        return new Blob([JSON.stringify(this.drafts, null, 2)], {
            type: "application/json;charset=utf-8"
        });
    }

    public getManifestBlob(): Blob {
        return new Blob([JSON.stringify(this.manifest, null, 2)], {
            type: "text/plain;charset=utf-8"
        });
    }

}
