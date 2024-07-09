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
import {Plugin} from "../plugin/Plugin";

interface ConstructorParams {
    plugin: Plugin
    id: string
    name: string
    description: string
    required?: boolean
    defaultValue?: boolean | null
    disabled?: boolean
    customValidator?: (() => void)
}

export class BooleanAttribute extends Attribute {

    constructor(
        {
            plugin, id, name, description,
            required=false, defaultValue=false,
            disabled=false,
            customValidator
        }: ConstructorParams,
    ) {
        super({
            plugin: plugin, id: id,
            name: name, description: description,
            required: required, defaultValue: defaultValue,
            disabled: disabled,
            customValidator: customValidator
        })
    }

    protected isEmpty(): boolean {
        return this.currentValue === null;
    }

    reset(): void {
        this.currentValue = this.defaultValue;
    }

    getComponent() {
        return "BooleanInput"
    }

    validate(): void {
    }
}