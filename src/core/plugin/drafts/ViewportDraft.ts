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

import {DefaultAttributes, Draft} from "./Draft";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";
import {ListAttribute} from "../../attribute/ListAttribute";
import {Frame, FrameFactory} from "../objects/Frame";

export interface ViewportDraftAttributes extends DefaultAttributes {
    frames: ListAttribute<Frame>
}

export class ViewportDraft extends Draft implements ViewportDraftAttributes {

    frames: ListAttribute<Frame>

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);
        this.frames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "frames",
            name: "Frames",
            description: "Frames define the main texture of your draft. Usually, this means the textures of a building, category and etc.",
            required: true,
            customValidator: () => {
                if (this.frames.value.length == 0) {
                    this.frames.addError("Please choose at least a single frame.")
                }
            },
            factory: new FrameFactory()
        })
    }
}