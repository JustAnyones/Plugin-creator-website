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

import {HasAttributes, Resettable, Validatable} from "../attribute/interfaces/Interfaces";
import {Attribute} from "../attribute/Attribute";
import {Plugin} from "./Plugin";

export interface AttributeOwnerFactory {
    fromJSON(obj: any, plugin: Plugin): AttributeOwner
}

export interface AttributeOwnerFactoryWithOptions extends AttributeOwnerFactory {
    getOptions(): Object
}

export class AttributeOwner implements HasAttributes, Validatable, Resettable {

    plugin: Plugin
    constructor(plugin: Plugin) {
        this.plugin = plugin;
    }

    public getOptionalAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && !attribute.required
                    && attribute.isVisible()
                    && attribute.getComponent() !== null)
                    attrs.push(attribute)
            })
        return attrs
    }

    public getRequiredAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && attribute.required
                    && attribute.isVisible()
                    && attribute.getComponent() !== null)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns true if every attribute is valid.
     */
    public isValid(): boolean {
        let isValid = true;
        Object.keys(this).forEach((item) => {
            let attribute = this[item]
            if (attribute instanceof Attribute) {
                if (!attribute.isValid()) isValid = false;
            }
        })
        return isValid;
    }

    /**
     * Returns the JSON representation of the object.
     */
    public toJSON() {
        let data = {}
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (
                    attribute instanceof Attribute
                    && attribute.value !== null
                ) {
                    if (attribute.required || !attribute.isDefault()) {
                        data[attribute.id] = attribute.value
                    }
                }
            })
        //data["meta"] = this.meta;
        return data
    }

    /**
     * Resets every attribute of the object.
     */
    reset(): void {
        Object.keys(this).forEach((item) => {
            let attribute = this[item]
            if (attribute instanceof Attribute) {
                attribute.reset()
            }
        })
    }

    getOptionalAttributeDescription(): string {
        return "These are optional attributes that you can add to your object.";
    }
}