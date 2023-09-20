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

export class BiomeDraft extends Draft {
    isWater = new BooleanAttribute(
        "water", "Is water",
        "Whether the biome is considered to be water",
        false, false
    )
    noiseScale = new NumberAttribute(
        "noise scale", "Noise scale",
        "...",
        false, 1.0
    )
    noiseOffset = new NumberAttribute(
        "noise offset", "Noise offset",
        "...",
        false, 0.0
    )
    noiseFactor = new NumberAttribute(
        "noise factor", "Noise factor",
        "...",
        false, 0.0
    )
    heightCenter = new NumberAttribute(
        "height center", "Height center",
        "...",
        false, 0.0
    )
    heightRadius = new NumberAttribute(
        "height radius", "Height radius",
        "...",
        false, 10.0
    )
    heightOffset = new NumberAttribute(
        "height offset", "Height offset",
        "...",
        false, 0.0
    )
    heightFactor = new NumberAttribute(
        "height factor", "Height factor",
        "...",
        false, 0.0
    )

    tempIndex: number
}