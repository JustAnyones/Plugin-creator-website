/*
 * MIT License
 *
 * Copyright (c) 2024 JustAnyone
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {Manifest} from "./objects/Manifest";
import {Draft} from "./drafts/Draft";
import {PluginFile} from "../PluginFile";
import {FileAttribute} from "../attribute/FileAttribute";
import {AttributeOwner} from "./AttributeOwner";
import {ListAttribute} from "../attribute/ListAttribute";

interface FileMapping {
    [path: string]: PluginFile
}

function getFilesFromObject(object: AttributeOwner): Array<string> {
    let files = [];
    Object.keys(object).forEach((item) => {
        let attribute = object[item]

        // If it's nested
        if (attribute instanceof ListAttribute) {
            for (const itemsKey in attribute.items)
                if (attribute.items[itemsKey] instanceof AttributeOwner) {
                    //console.log("Damn neuvilette, think we have to kill this", attribute.items[itemsKey])
                    files = [...files, ...getFilesFromObject(attribute.items[itemsKey])]
                }
        }

        // Otherwise, if it's a file
        if (attribute instanceof FileAttribute) {
            files.push(attribute.value)
        }
    })
    return files;
}

export class Plugin {
    manifest: Manifest
    drafts: Array<Draft>
    fileMapping: FileMapping

    constructor() {
        this.manifest = new Manifest(this);
        this.drafts = []
        this.fileMapping = {}
    }


    public addDraft(draft: Draft) {
        this.drafts.push(draft)
    }

    public removeDraftAtIndex(index: number) {
        this.drafts[index].reset()
        this.drafts.splice(index, 1) // Remove item
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

    public enumerateFiles() {
        let files = [];
        this.drafts.forEach(item => {
            files = [...files, ...getFilesFromObject(item)]
        });
        return files
    }

    public isManifestValid(): boolean {
        return this.manifest.isValid()
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
