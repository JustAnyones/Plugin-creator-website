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

import {StringAttribute} from "./attribute/StringAttribute";
import {NumberAttribute} from "./attribute/NumberAttribute";

export class Manifest {
    id = new StringAttribute(
        "id", "Manifest ID",
        "ID of the plugin manifest. This should be a unique identifier for your plugin as a whole.",
        true
    )
    version = new NumberAttribute(
        "version", "Version",
        "Version of the plugin. Should be kept 1 for first the version and incremented for each update.",
        true, 1,
        {minValue: 1, maxValue: 999999}
    )
    title= new StringAttribute(
        "title", "Name",
        "The name or title of the plugin.",
        true
    )
    text = new StringAttribute(
        "text", "Description",
        "Description of the plugin.",
        true
    )
    author = new StringAttribute(
        "author", "Author",
        "Author of the plugin.",
        true
    )

    /**
     * Returns true if manifest is considered to be valid.
     */
    public validate(): boolean {
        let valid = true;

        if (!this.id.validate()) valid = false;
        if (!this.version.validate()) valid = false;
        if (!this.title.validate()) valid = false;
        if (!this.text.validate()) valid = false;
        if (!this.author.validate()) valid = false;

        if (this.version.value < 1) {
            this.version.addError("Manifest version is invalid. It must be a positive number and equal to at least 1.")
            valid = false;
        }

        if (this.id.value.trim().length < 5) {
            this.id.addError("ID of your plugin must be at least 5 characters long.")
            valid = false;
        }

        if (this.title.value.trim().length < 5) {
            this.title.addError("Title of your plugin must be at least 5 characters long.")
            valid = false;
        }

        if (this.text.value.trim().length < 10) {
            this.text.addError("Description of your plugin must be at least 10 characters long.")
            valid = false;
        }

        if (this.author.value.trim().length < 5) {
            this.author.addError("Author field of your plugin must be at least 5 characters long.")
            valid = false;
        }
        return valid;
    }
}

