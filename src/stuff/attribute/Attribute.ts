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

export abstract class Attribute {
    readonly id: string
    readonly name: string
    readonly description: string
    errors: Array<string> = []
    required: boolean
    readonly defaultValue: any

    private _value: any

    customValidator?: (() => boolean)

    element: string = null

    constructor(
        id: string,
        name: string,
        description: string,
        required: boolean = false,
        defaultValue?: any | (() => any)
    ) {
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
     */
    public isDefault() {
        return this.value === this.defaultValue
    }

    /**
     * Returns true if current attribute is valid and has no errors.
     */
    public isValid() {
        return this.errors.length === 0
    }

    /**
     * Creates a validation error.
     * @param message Message of the validation error.
     */
    public addError(message: string) {
        this.errors.push(message)
    }

    /**
     * Validates attribute values and returns if it's valid.
     */
    public validate(): boolean {
        this.errors = []
        // If it's required and it's empty
        if (this.required && this.isEmpty()) {
            this.addError(`${this.name} field cannot be empty.`)
        }
        // Call the custom validator, if defined
        if (this.customValidator)
            this.customValidator()
        return this.isValid()
    }

    public toJSON() {
        return this.value
    }
}
