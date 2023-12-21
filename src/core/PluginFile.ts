export class PluginFile {
    logicalPath: string
    raw: Uint8Array
    owners: number

    constructor(path: string, raw?: Uint8Array) {
        this.logicalPath = path
        this.raw = raw
        this.owners = 1
    }

    public toJSON() {
        return {
            "logicalPath": this.logicalPath,
            "rawLength": this.raw.length,
            "owners": this.owners
        }
    }
}