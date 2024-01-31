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

import {Draft} from "../plugin/drafts/Draft";
import {Resettable, Validatable} from "./interfaces/Interfaces";
import {Plugin} from "../plugin/Plugin";

interface ConstructorParamsOld {
    owner: Draft;
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: any;
}

interface ConstructorParams {
    plugin: Plugin;
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: any | (() => any);
    customValidator?: (() => void)
}

/**
 * Attribute refers to one of the possible key/value pairs a draft can have.
 */
export abstract class Attribute implements Resettable, Validatable {

    /**
     * Plugin that owns this attribute. Attributes by design must be owned by a plugin object
     * in order to facilitate internal file management.
     */
    readonly plugin: Plugin

    /**
     * ID of the attribute as it is represented in JSON.
     */
    readonly id: string

    /**
     * User-friendly name of the attribute.
     */
    readonly name: string

    /**
     * A brief, user-friendly description of the attribute.
     */
    readonly description: string

    /**
     * Whether this attribute is required for the draft.
     * @private
     */
    public required: boolean

    /**
     * The current raw value of the attribute.
     * @private
     */
    protected currentValue: any

    /**
     * Default value of the attribute.
     * @private
     */
    protected readonly defaultValue: any

    /**
     * An array that holds attribute errors. Empty, if no errors.
     * @private
     */
    errors: Array<string> = [];

    /**
     * Custom validator that is called for the specific attribute instance on validation.
     * @private
     */
    private readonly customValidator?: (() => void);


    /**
     * Returns the raw attribute value.
     */
    public get value() {
        return this.currentValue;
    }

    /**
     * Sets the raw attribute value.
     * @param value
     */
    public set value(value: any) {
        this.currentValue = value;
    }

    /**
     * Returns true whether the attribute should be visible to the end user in the UI.
     */
    public isVisible() {
        return true;
    }

    /**
     * Returns true if the current attribute value is the default value.
     */
    public isDefault() {
        return this.currentValue === this.defaultValue;
    }

    /**
     * Returns true if the attribute is considered empty.
     * @protected
     */
    protected abstract isEmpty(): boolean

    public reset() {
        this.currentValue = this.defaultValue
    }

    /**
     * Registers a new error with the attribute.
     * @param errorMessage An error message that will be shown to the user.
     * @protected
     */
    public addError(errorMessage: string) {
        this.errors.push(errorMessage)
    }

    /**
     * Run validation and add errors for every error in the attribute.
     * @protected
     */
    protected abstract validate(): void

    /**
     * Runs validation and returns true if the attribute values are valid.
     */
    public isValid() {
        this.errors = []

        // If it's required and it's empty
        if (this.required && this.isEmpty()) {
            this.addError(`${this.name} field cannot be empty.`)
        }

        // Call default attribute validator
        this.validate()

        // Call the custom validator for the attribute, if defined
        if (this.customValidator !== undefined) {
            this.customValidator()
        }

        // Return the check
        return this.errors.length === 0
    }

    /**
     * Returns the JSON representation of the attribute.
     */
    public toJSON() {
        return this.value
    }

    constructor(
        {plugin, id, name, description, required=false, defaultValue=null, customValidator}: ConstructorParams
    ) {
        this.plugin = plugin;
        this.id = id;
        this.name = name;
        this.description = description;
        this.required = required
        if (typeof defaultValue === "function") {
            defaultValue = defaultValue()
        }
        this.defaultValue = defaultValue
        this.currentValue = defaultValue;
        this.customValidator = customValidator
    }

    /**
     * Returns the name of the component to be used in UI.
     */
    public abstract getComponent(): string
}
