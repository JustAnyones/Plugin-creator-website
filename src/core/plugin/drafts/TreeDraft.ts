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

import {ViewportDraft} from "./ViewportDraft";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";

export class TreeDraft extends ViewportDraft {

    framesPerTree: NumberAttribute
    autoBuild: BooleanAttribute
    buildHeight: NumberAttribute
    supportsSlope: BooleanAttribute
    price: NumberAttribute


    // TODO: add support for mapColor and mapColorWinter
    //mapColor: Colour
    //mapColorWinter: Colour

    // TODO: add support for "biomes" tag
    // TODO: add support for the following:
    /*
        optBoolean("burnable")
        optBoolean("water")
        optBoolean("land")
        "add price" for addPriceDrafts
     */

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.framesPerTree = new NumberAttribute({
            plugin: this.plugin, id: "frames per tree",
            name: "Frames per tree", description: "How many frames a single tree has.",
            defaultValue: 1
        })

        this.autoBuild = new BooleanAttribute({
            plugin: this.plugin, id: "auto build",
            name: "Auto build", description: "Whether to generate trees during the map generation stage.",
            defaultValue: false
        })

        this.buildHeight = new NumberAttribute({
            plugin: this.plugin, id: "build height",
            name: "Build height",
            description: "The height of the tree in 8px units. Should be used when frames are not provided. " +
                "Otherwise, game will calculate it on its own. " +
                "Used for collision checks, clipping during drawing, helicopters and much more."
        })

        this.supportsSlope = new BooleanAttribute({
            plugin: this.plugin, id: "supports slope",
            name: "Supports slope", description: "Whether trees can be placed on slopes."
        })

        this.price = new NumberAttribute({
            plugin: this.plugin, id: "price",
            name: "Price",
            description: "Price of the tree in Theons.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })

    }
}
