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

interface ConstructorParams {
    id: string;
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: number | null;
    validation?: { minValue: number; maxValue: number };
    isInteger?: boolean
}

/**
 * This represents a draft number attribute.
 * 
 * It can refer to integers or floating point values.
 */
export class NumberAttribute extends Attribute {
    element = "NumberInput"
    readonly isInteger: boolean
    readonly minValue: Number
    readonly maxValue: Number

    constructor(
        {id, name, description, required=false, defaultValue=null, validation={
            minValue: Number.NEGATIVE_INFINITY,
            maxValue: Number.POSITIVE_INFINITY,
        }, isInteger=true}: ConstructorParams
    ) {
        super(id, name, description, required, defaultValue)
        this.isInteger = isInteger
        this.minValue = validation.minValue
        this.maxValue = validation.maxValue
    }

    isEmpty(): boolean {
        return this.value === null || Number.isNaN(this.value);
    }

    validate(): boolean {
        super.validate();

        // Check if number is within range
        if (this.value > this.maxValue || this.value < this.minValue) {
            this.addError(
                "Value must be in range (" + this.minValue + "," + this.maxValue + ")."
            )
        }

        return this.isValid();
    }

}