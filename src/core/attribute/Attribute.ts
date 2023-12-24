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

import {Draft} from "../drafts/Draft";

interface ConstructorParams {
    owner: Draft;
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: any;
}

export abstract class Attribute {
    readonly id: string
    readonly name: string
    readonly description: string
    errors: Array<string> = []
    required: boolean
    readonly defaultValue: any

    protected _value: any
    owner: Draft

    customValidator?: (() => boolean)

    element: string = null

    constructor(
        {owner, id, name, description, required=false, defaultValue}: ConstructorParams
    ) {
        this.owner = owner;
        this.id = id;
        this.name = name;
        this.description = description;
        this.required = required
        if (typeof defaultValue === "function") {
            this.defaultValue = defaultValue()
        } else {
            this.defaultValue = defaultValue
        }
        this._value = this.defaultValue;
    }

    /**
     * Returns true if the attribute is empty.
     */
    public abstract isEmpty(): boolean

    /**
     * Returns true if attribute is exposed to the end user.
     */
    public isExposed() {
        return true;
    }

    /**
     * Returns the raw attribute value.
     */
    public get value() {
        return this._value
    }

    /**
     * Sets the raw attribute value.
     * @param value Attribute value to set.
     */
    public set value(value: any) {
        this._value = value
    }

    /**
     * Resets the attribute to the default value.
     */
    public reset() {
        this.value = this.defaultValue
    }

    /**
     * Returns true if current attribute value is the default value.
     *
     * Used to omit default values from the generated JSON.
     */
    public isDefault() {
        return this.value === this.defaultValue
    }

    /**
     * Creates a validation error.
     * @param message Message of the validation error.
     */
    public addError(message: string) {
        this.errors.push(message)
    }

    protected abstract validate()

    /**
     * Runs validation and returns true if the attribute values are valid.
     */
    public isValid() {
        this.errors = []
        // If it's required and it's empty
        if (this.required && this.isEmpty()) {
            this.addError(`${this.name} field cannot be empty.`)
        }

        // Call validator
        this.validate()

        // Return the check
        return this.errors.length === 0
    }

    public toJSON() {
        return this.value
    }
}
