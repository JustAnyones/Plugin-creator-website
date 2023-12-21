import {NumberAttribute} from "./NumberAttribute";
import {Attribute} from "./Attribute";
import {OptionalFileAttr} from "./OptionalFileAttr";
import {Draft} from "../drafts/Draft";

// Used in ref
const example_silent_frames = {
    "silent frames": -1,
    "x": 0,
    "y": 0
}

const example_ref = {
    "ref": 0,
    "move x": 0,
    "move y": 0,
    "count": 1,
    "silent ": false
}
export class Frame {

    owningDraft: Draft

    constructor(ownerDraft: Draft) {
        this.owningDraft = ownerDraft
    }

    public toJSON() {
        let data = {}
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (
                    (attribute instanceof Attribute
                    && attribute.value !== null)
                    || (attribute instanceof OptionalFileAttr)
                )
                    if (attribute.required || !attribute.isDefault()) {
                        data[attribute.id] = attribute.value
                    }
            })
        return data
    }

    /**
     * Returns an array of required attribute for the fraem.
     */
    public getRequiredAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && attribute.required
                    && attribute.isExposed()
                    && attribute.element != null)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns an array of optional attribute for the frame.
     */
    public getOptionalAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && !attribute.required
                    && attribute.isExposed()
                    && attribute.element != null)
                    attrs.push(attribute)
            })
        return attrs
    }

    static fromJSON(json: object) {


        let obj = new BmpFrame(null)


        let jsonAttrs = Object.keys(json);


        Object.keys(json).forEach(
            (key) => {
                console.log(key, json[key]);
            }
        )

        let removed = {
            "deleted": "this is a custom entry for listing unsupported pca tags"
        }

        Object.keys(obj).forEach((item) => {
            let attribute = obj[item]
            if (attribute instanceof Attribute)
                if (json[attribute.id] !== undefined) {
                    attribute.value = json[attribute.id]
                    json[attribute.id] = removed;
                }
        })

        console.log("Unsupported tags:")
        jsonAttrs.forEach(
            (key) => {
                if (json[key] !== removed)
                    console.log(key, json[key]);
            }
        )


        return obj
    }
}


class TextureFrame extends Frame {

    example = {
        "offset x": 0,
        "offset y": 0,
        "x": 0,
        "y": 0,
        "w": 0,
        "h": 0,

        //Shared
        "target w": 0, // w,
        "target h": 0, //h
        "count": 1,
        "skip width factor": 1,
        "skip height factor": 0,
        "copies": 0,
        "n": 1, // (copies + 1)
    }

    steal: string
    bmp: string
    x: number
    y: number
}


class StealFrame extends Frame {
    example = {
        "steal": "$my_plugin_id",
        "type": "frames/preview frames",
        "frame": 0,
        "count": 1,
        "move x": 0,
        "move y": 0,
        "handle x": 0,
        "handle y": 0,
        "share": false
    }

}

export class BmpFrame extends Frame {

    bmp: OptionalFileAttr = new OptionalFileAttr({
        owner: this.owningDraft, id: "bmp",
        name: "Image file", description: "The texture file of your draft, usually the building texture." +
            " Leave empty to have a null frame that acts as an invisible frame.",
        required: true, defaultValue: null
    })

    placeX: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "place x",
        name: "Place X", description: "X coordinate to place the frame in the texture space. " +
            "Only available for privileged drafts.",
        defaultValue: 0
    })
    placeY: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "place y",
        name: "Place Y", description: "Y coordinate to place the frame in the texture space. " +
            "Only available for privileged drafts.",
        defaultValue: 0
    })

    x: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "x",
        name: "X", description: "",
        defaultValue: 0
    })
    y: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "y",
        name: "Y", description: "",
        defaultValue: 0
    })
    w: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "w",
        name: "W", description: ""
    })
    h: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "h",
        name: "H", description: ""
    })

    targetW: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "target w",
        name: "Target w", description: ""
    })
    targetH: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "target h",
        name: "Target h", description: ""
    })
    count: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "count",
        name: "Count", description: ""
    })
    skipWidthFactor: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "skip width factor",
        name: "Skip width factor", description: "",
        defaultValue: 1
    })
    skipHeightFactor: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "skip height factor",
        name: "Skip height factor", description: ""
    })
    copies: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "copies",
        name: "Copies", description: ""
    })
    n: NumberAttribute = new NumberAttribute({
        owner: this.owningDraft, id: "n",
        name: "n", description: ""
    })
}
export class FrameAttribute extends Attribute {
    element = "FrameInput"
    declare _value: Array<Frame>

    isEmpty(): boolean {
        return this._value.length == 0;
    }

    isDefault(): boolean {
        return this._value.length === 0
    }

    get value() {
        return this._value
    }

    set value(value: any) {
        console.log("Asked to set value of FrameAttribute", value)
        if (value instanceof Array) {
            for (const valueKey in value) {
                let frame = Frame.fromJSON(value[valueKey])
                frame.owningDraft = this.owner
                this._value.push(frame)
            }
        }
    }

    get frames() {
        return this._value
    }

    public addFrame(frame: Frame) {
        this._value.push(frame)
    }

    public removeFrame(index: number) {
        // Clean up tangling file mapping
        let frame = this.value[index]
        if (frame instanceof BmpFrame && frame.bmp.value !== null) {
            this.owner.plugin.removeFile(frame.bmp.value)
        }
        // Remove from current attribute
        this._value.splice(index, 1)
    }
}