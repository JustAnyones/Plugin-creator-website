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

import {Attribute} from "../Attribute";

export interface HasAttributes {
    /**
     * Returns an array of required attributes.
     */
    getRequiredAttributes(): Array<Attribute>
    /**
     * Returns an array of optional attributes.
     */
    getOptionalAttributes(): Array<Attribute>

    /**
     * Returns a description describing what the optional attributes are for.
     */
    getOptionalAttributeDescription(): string
}


export interface Validatable {
    /**
     * Returns true if current object is valid.
     */
    isValid(): boolean
}

export interface Resettable {
    /**
     * Resets the property ensuring that all associated resources are cleaned up.
     */
    reset(): void;
}

export interface DraftProperty extends Validatable {

    /**
     * Resets the property ensuring that all associated resources are cleaned up.
     */
    reset(): void;
}

export interface IListable {
    getTitle(index: number): string
    getDescription(): string
}
