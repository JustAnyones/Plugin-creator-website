
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

import {Attribute} from "../../attribute/Attribute";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {StringAttribute} from "../../attribute/StringAttribute";
import {IListable} from "../../attribute/interfaces/Interfaces";
import {Plugin} from "../Plugin";
import {AttributeOwner, AttributeOwnerFactory, AttributeOwnerFactoryWithOptions} from "../AttributeOwner";
import {FileAttribute} from "../../attribute/FileAttribute";
import { serialize } from "@/core/utils/Utils";

export class FrameFactory implements AttributeOwnerFactory, AttributeOwnerFactoryWithOptions {
    fromJSON(obj: any, plugin: Plugin): AttributeOwner {
        let frameObj: Frame
        switch (obj) {
            case null:
                frameObj = new EmptyFrame(plugin)
                return frameObj
            default:
                frameObj = new BmpFrame(plugin)
                break
        }
        return serialize(obj, frameObj)
    }

    getOptions() {
        return {
            "Add a custom frame": ((plugin: Plugin) => new BmpFrame(plugin)),
            "Add an empty frame": ((plugin: Plugin) => new EmptyFrame(plugin))
        }
    }

}

export abstract class Frame extends AttributeOwner implements IListable {
    abstract getDescription(): string
    abstract getTitle(index: number): string
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

    getDescription(): string {
        return "";
    }

    getTitle(index: number): string {
        return "";
    }
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



    steal = new StringAttribute({
        plugin: this.plugin, id: "steal",
        name: "Steal", description: "ID of the draft to steal frames from.",
        required: true
    })

    type // TODO: add either some selector attribute type or something to allow selecting one of 2 options


    frame: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "frame",
        name: "Frame", description: "Index of the frame to steal."
    })
    count: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "count",
        name: "Count", description: ""
    })
    moveX: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "move x",
        name: "Move x", description: ""
    })
    moveY: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "move y",
        name: "Move y", description: ""
    })
    handleX: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "handle x",
        name: "Handle x", description: ""
    })
    handleY: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "handle y",
        name: "Handle y", description: ""
    })
    shared = new BooleanAttribute({
        plugin: this.plugin, id: "share",
        name: "Share", description: "",
        defaultValue: false
    })

    getDescription(): string {
        return "";
    }

    getTitle(index: number): string {
        return "";
    }
}

export class EmptyFrame extends Frame {

    toJSON(): {} {
        return null
    }

    getDescription(): string {
        return "Empty frame is useful for making invisible or fake frames for whatever purpose."
    }
    getTitle(index: number): string {
        return `Frame ${index} (empty)`
    }
}

export class BmpFrame extends Frame {

    bmp: FileAttribute
    placeX: NumberAttribute
    placeY: NumberAttribute
    x: NumberAttribute
    y: NumberAttribute
    w: NumberAttribute
    h: NumberAttribute
    targetW: NumberAttribute
    targetH: NumberAttribute
    count: NumberAttribute
    skipWidthFactor: NumberAttribute
    skipHeightFactor: NumberAttribute
    copies: NumberAttribute
    n: NumberAttribute

    constructor(plugin: Plugin) {
        super(plugin);

        this.bmp = new FileAttribute({
            plugin: this.plugin, id: "bmp",
            name: "Image file", description: "The texture file of your draft, usually the building texture.",
            required: true
        })

        this.placeX = new NumberAttribute({
            plugin: this.plugin, id: "place x",
            name: "Place X", description: "X coordinate to place the frame in the texture space. " +
                "Only available for privileged drafts.",
            defaultValue: 0
        })
        this.placeY = new NumberAttribute({
            plugin: this.plugin, id: "place y",
            name: "Place Y", description: "Y coordinate to place the frame in the texture space. " +
                "Only available for privileged drafts.",
            defaultValue: 0
        })

        this.x = new NumberAttribute({
            plugin: this.plugin, id: "x",
            name: "X", description: "",
            defaultValue: 0
        })
        this.y = new NumberAttribute({
            plugin: this.plugin, id: "y",
            name: "Y", description: "",
            defaultValue: 0
        })
        this.w = new NumberAttribute({
            plugin: this.plugin, id: "w",
            name: "W", description: ""
        })
        this.h = new NumberAttribute({
            plugin: this.plugin, id: "h",
            name: "H", description: ""
        })

        this.targetW = new NumberAttribute({
            plugin: this.plugin, id: "target w",
            name: "Target w", description: "Scales the frame to the specified width."
        })
        this.targetH = new NumberAttribute({
            plugin: this.plugin, id: "target h",
            name: "Target h", description: "Scales the frame to the specified height."
        })
        this.count = new NumberAttribute({
            plugin: this.plugin, id: "count",
            name: "Count", description: ""
        })
        this.skipWidthFactor = new NumberAttribute({
            plugin: this.plugin, id: "skip width factor",
            name: "Skip width factor", description: "",
            defaultValue: 1
        })
        this.skipHeightFactor = new NumberAttribute({
            plugin: this.plugin, id: "skip height factor",
            name: "Skip height factor", description: ""
        })
        this.copies = new NumberAttribute({
            plugin: this.plugin, id: "copies",
            name: "Copies", description: ""
        })
        this.n = new NumberAttribute({
            plugin: this.plugin, id: "n",
            name: "n", description: ""
        })
    }

    getTitle(index: number): string {
        return `Frame ${index} (${this.bmp.value ?? 'not set'})`
    }

    getDescription(): string {
        return "Custom frame is useful for adding your own texture from a file."
    }
}
