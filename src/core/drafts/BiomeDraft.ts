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

import { BooleanAttribute } from "../attribute/BooleanAttribute";
import { NumberAttribute } from "../attribute/NumberAttribute";
import {Draft} from "./Draft";

// A biome is used to decide on ground and decorations to place during map creation phase.
export class BiomeDraft extends Draft {
    isWater = new BooleanAttribute(
        "water", "Is water",
        "Whether the biome is considered to be water",
        false, false
    )


    noiseScale = new NumberAttribute({
        id: "noise scale",
        name: "Noise scale",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })
    noiseOffset = new NumberAttribute({
        id: "noise offset",
        name: "Noise offset",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    noiseFactor = new NumberAttribute({
        id: "noise factor",
        name: "Noise factor",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    noiseVariance = new NumberAttribute({
        id: "noise variance",
        name: "Noise variance",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })


    heightCenter = new NumberAttribute({
        id: "height center",
        name: "Height center",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    heightRadius = new NumberAttribute({
        id: "height radius",
        name: "Height radius",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })
    heightOffset = new NumberAttribute({
        id: "height offset",
        name: "Height offset",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    heightFactor = new NumberAttribute({
        id: "height factor",
        name: "Height factor",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })


    derivCenter = new NumberAttribute({
        id: "deriv center",
        name: "Deriv center",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    derivRadius = new NumberAttribute({
        id: "deriv radius",
        name: "Deriv radius",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })
    derivOffset = new NumberAttribute({
        id: "deriv offset",
        name: "Deriv offset",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })
    derivFactor = new NumberAttribute({
        id: "deriv factor",
        name: "Deriv factor",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })


    offset = new NumberAttribute({
        id: "offset",
        name: "Offset",
        description: "...",
        isInteger: false,
        defaultValue: 0.0
    })


    coverage = new NumberAttribute({
        id: "coverage",
        name: "Coverage",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })
    precedence = new NumberAttribute({
        id: "precedence",
        name: "Precedence",
        description: "...",
        isInteger: false,
        defaultValue: 1.0
    })

    // "ground" array of ground IDs

    tempIndex: number
}