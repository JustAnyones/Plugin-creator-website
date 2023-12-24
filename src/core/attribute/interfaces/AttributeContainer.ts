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

import {Attribute} from "../Attribute";

export abstract class AttributeContainer {

    /**
     * True if all the attributes are valid.
     */
    private _isValid: boolean

    /**
     * Returns true if all the attributes are valid.
     */
    public get isValid(): boolean {
        return this._isValid;
    }

    private set isValid(value: boolean) {
        this._isValid = value
    }

    /**
     * Returns an array of required attributes.
     * */
    public getRequiredAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && attribute.required
                    && attribute.isExposed()
                    && attribute.element != null)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns an array of optional attributes.
     */
    public getOptionalAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute
                    && !attribute.required
                    && attribute.isExposed()
                    && attribute.element != null)
                    attrs.push(attribute)
            })
        return attrs
    }


    /**
     * Returns the JSON representation of the object.
     */
    abstract toJSON(): Object

    //fromJSON(json: any): this


    /**
     * Validates every attribute of the object.
     */
    private validateAttributes(): void {
        this.isValid = true;
        Object.keys(this).forEach((item) => {
            let attribute = this[item]
            if (attribute instanceof Attribute) {
                if (!attribute.isValid()) this.isValid = false;
                console.log(attribute.errors)
            }

        })

    }

    /**
     * Validates every attribute of the object.
     */
    public validate(): boolean {
        this.validateAttributes()
        return this.isValid
    }
}
