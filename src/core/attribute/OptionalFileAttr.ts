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

import {Attribute} from "./Attribute";
import {Draft} from "../drafts/Draft";

interface ConstructorParams {
    owner: Draft;
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: number | null;
}

export class OptionalFileAttr extends Attribute {
    element = "OptionalFileInput"
    //element2 = OptionalFileInput

    multiple = false
    selected = false

    constructor(
        {owner, id, name, description, required=false, defaultValue=null}: ConstructorParams
    ) {
        super({
            owner: owner, id: id,
            name: name, description: description,
            required: required, defaultValue: defaultValue
        })
    }

    isEmpty(): boolean {
        return this.selected === false;
    }

    protected validate() {
        console.log("Running validation, is file selected", this.selected)
        if (!this.selected) {
            this.addError("A file is required, but not selected")
        }
    }
}