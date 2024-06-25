/*
 * MIT License
 *
 * Copyright (c) 2024 JustAnyone
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
import {AttributeOwner, AttributeOwnerFactoryWithOptions} from "../plugin/AttributeOwner";
import {Plugin} from "../plugin/Plugin";
import { Color } from "../plugin/objects/Color";

interface ConstructorParams {
    plugin: Plugin;
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: [] | null;
    customValidator?: (() => void)
    factory: AttributeOwnerFactoryWithOptions
}

export class FactoryAttribute<T extends AttributeOwner> extends Attribute {

    private factory: AttributeOwnerFactoryWithOptions

    constructor(
        {
            plugin, id,
            name, description,
            required=false, defaultValue=null,
            customValidator,
            factory
        }: ConstructorParams,
    ) {
        super({
            plugin: plugin, id: id,
            name: name, description: description,
            required: required, defaultValue: defaultValue,
            customValidator: customValidator
        })

        this.factory = factory
    }

    declare defaultValue: T

    getComponent(): string {
        return "FactoryInput";
    }

    protected isEmpty(): boolean {
        return this.currentValue === this.defaultValue;
    }

    isDefault(): boolean {
        return this.currentValue === this.defaultValue;
    }

    public options() {
        return this.factory.getOptions()
    }


    get value() {
        return this.currentValue
    }

    set value(value: any) {
        if (!(value instanceof Color))
            this.currentValue = this.factory.fromJSON(value, this.plugin)
        else
            this.currentValue = value
    }

    reset() {
        if (this.currentValue)
            this.currentValue.reset()
        this.currentValue = this.defaultValue;
    }

    protected validate(): void {
        if (this.currentValue && !this.currentValue.isValid()) {
            this.addError("Validation failed for " + this.name.toLowerCase() + " attribute")
        }
    }
}