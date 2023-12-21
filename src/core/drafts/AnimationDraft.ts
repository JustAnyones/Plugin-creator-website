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
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {NumberAttribute} from "../attribute/NumberAttribute";

export class AnimationDraft extends ViewportDraft {
    additive = new BooleanAttribute({
        owner: this, id: "additive",
        name: "Additive", description: "...",
        defaultValue: false
    })

    light = new BooleanAttribute({
        owner: this, id: "light",
        name: "Light", description: "...",
        defaultValue: false
    })

    lightSwitching = new BooleanAttribute({
        owner: this, id: "light switching",
        name: "Light switching", description: "...",
        defaultValue: false
    })


    nightLightProbability = new NumberAttribute({
        owner: this, id: "night light probability",
        name: "Night light probability", description: "...",
        isInteger: false,
        defaultValue: 1.0
    })

    speed = new NumberAttribute({
        owner: this, id: "speed",
        name: "Speed", description: "...",
        isInteger: false,
        defaultValue: 1.0
    })

    rotationAware = new BooleanAttribute({
        owner: this, id: "rotation aware",
        name: "Rotation aware", description: "Whether the animation is rotation aware. " +
            "If set to aware, you have to provide a multiple of 4 frames.",
        defaultValue: false
    })

    // TODO: implement "colors"

    loop = new BooleanAttribute({
        owner: this, id: "loop",
        name: "Loop", description: "...",
        defaultValue: true
    })

    handleInterpolation = new NumberAttribute({
        owner: this, id: "handle interpolation",
        name: "Handle interpolation", description: "...",
        defaultValue: 1
    })

    pingPong = new BooleanAttribute({
        owner: this, id: "ping pong",
        name: "Ping pong", description: "...",
        defaultValue: false
    })


    // TODO: implement "animation" and "frame animation indices"


}
