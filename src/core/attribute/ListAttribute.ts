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
import {IListable} from "./interfaces/Interfaces";
import {Plugin} from "../plugin/Plugin";

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

export class ListAttribute<T extends AttributeOwner & IListable> extends Attribute {

    private factory: AttributeOwnerFactoryWithOptions

    constructor(
        {
            plugin, id,
            name, description,
            required=false, defaultValue=[],
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

    declare defaultValue: Array<T>

    getComponent(): string {
        return "ListInput";
    }

    protected isEmpty(): boolean {
        return this.currentValue.length === 0;
    }

    isDefault(): boolean {
        return this.currentValue.length === 0;
    }

    public options() {
        return this.factory.getOptions()
    }

    get items(): Array<T> {
        return this.currentValue
    }

    public add(element: T) {
        this.currentValue.push(element)
    }

    public remove(index: number) {
        this.items[index].reset();
        this.currentValue.splice(index, 1)
    }

    get value() {
        return this.currentValue
    }

    set value(value: any) {
        if (value instanceof Array)
            for (const valueKey in value)
                this.currentValue.push(this.factory.fromJSON(value[valueKey], this.plugin))
    }

    reset() {
        for (const item of this.items) {
            item.reset()
        }
        this.currentValue = [];
    }

    protected validate(): void {
        let validationFailed = false;
        for (const item of this.items) {
            if (!item.isValid()) validationFailed = true;
        }
        if (validationFailed)
            this.addError("Validation failed for " + this.name.toLowerCase() + " attribute")
    }

}