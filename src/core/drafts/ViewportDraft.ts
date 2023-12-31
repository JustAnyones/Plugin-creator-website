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

import {Draft} from "./Draft";
import {FrameAttribute} from "../attribute/FrameAttribute";

export class ViewportDraft extends Draft {
    frames = new FrameAttribute({
        owner: this,
        id: "frames",
        name: "Frames",
        description: "Frames define your draft texture. Usually, this means the textures of a building, category and etc.",
        required: true,
        defaultValue: []
    })

    validate(): boolean {
        let valid = super.validate()

        /*
        // Ensure that every frame passed is a PNG file
        if (this.frames.internalFileList != null) {
            for (let i = 0; i < this.frames.internalFileList.length; i++) {
                if (!this.frames.internalFileList[i].name.endsWith(".png")) {
                    this.frames.addError("All frames must be of a PNG format")
                    valid = false;
                    break;
                }
            }
        }*/

        return valid
    }

}