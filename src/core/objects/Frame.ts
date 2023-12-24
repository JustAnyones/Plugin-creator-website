
/*
 * MIT License
 *
 * Copyright (c) 2023 JustAnyone
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

import {Attribute} from "../attribute/Attribute";
import {OptionalFileAttr} from "../attribute/OptionalFileAttr";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {OwnedAttributeContainer} from "../attribute/interfaces/OwnedAttributeContainer";
import {Draft} from "../drafts/Draft";

export class Frame extends OwnedAttributeContainer {

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



    static fromJSON(json: object, owner: Draft) {

        let obj: Frame
        switch (json) {
            case null:
                obj = new EmptyFrame(owner)
                return obj
            default:
                obj = new BmpFrame(owner)
                break
        }


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
        Object.keys(json).forEach(
            (key) => {
                if (json[key] !== removed)
                    console.log(key, json[key]);
            }
        )


        return obj
    }
}


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

export class EmptyFrame extends Frame {
    toJSON(): {} {
        return null
    }
}

export class BmpFrame extends Frame {
    bmp: OptionalFileAttr = new OptionalFileAttr({
        owner: this.owningDraft, id: "bmp",
        name: "Image file", description: "The texture file of your draft, usually the building texture.",
        required: true
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
