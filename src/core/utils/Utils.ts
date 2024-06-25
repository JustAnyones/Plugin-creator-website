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

import {v4 as uuidv4} from 'uuid';
import { Attribute } from '../attribute/Attribute';

export function generateId() {
    return uuidv4()
}

const REMOVED_MARKER = "[THIS IS A MARKER THAT INDICATES THAT THE ENTRY HAS BEEN READ AND REMOVED]";


export function serialize(obj: any, destinationObj: any) {
    console.log("Serializing", obj)
    // Log keys of the source object
    Object.keys(obj).forEach(
        (key) => {
            console.log(key, obj[key]);
        }
    )

    // Do the actual loading here
    Object.keys(destinationObj).forEach((item) => {
        let attribute = destinationObj[item]
        if (attribute instanceof Attribute)
            if (obj[attribute.id] !== undefined) {
                attribute.value = obj[attribute.id]
                obj[attribute.id] = REMOVED_MARKER;
            }
    })

    // Log tags that are not supported
    console.log("Unsupported tags:")
    Object.keys(obj).forEach(
        (key) => {
            if (obj[key] !== REMOVED_MARKER)
                console.log(key, obj[key]);
        }
    )
    console.log("-----------------")

    return destinationObj
}