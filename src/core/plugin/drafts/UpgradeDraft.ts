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

import {DraftType} from "../../DraftType";
import {BuildingBasedAttributes, BuildingBasedDraft} from "./BuildingBasedDraft";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {IListable} from "../../attribute/interfaces/Interfaces";
import {Plugin} from "../Plugin";
import {Draft, DraftFactory} from "./Draft";
import {AttributeOwnerFactoryWithOptions} from "../AttributeOwner";
import {Types} from "../../Types";

interface UpgradeDraftAttributes extends
    BuildingBasedAttributes
{
    onlyOne: BooleanAttribute
}

export class UpgradeDraftFactory extends DraftFactory implements AttributeOwnerFactoryWithOptions {

    fromJSON(json: any, plugin: Plugin): Draft {
        let obj = new UpgradeDraft(Types.UPGRADE, plugin);
        return this.loadKeysFromJsonToObject(json, obj)
    }

    getOptions() {
        return {
            "Add an upgrade": ((plugin: Plugin) => new UpgradeDraft(Types.UPGRADE, plugin))
        }
    }

}

export class UpgradeDraft extends BuildingBasedDraft implements UpgradeDraftAttributes, IListable {

    onlyOne: BooleanAttribute

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.onlyOne = new BooleanAttribute({
            plugin: this.plugin, id: "only one",
            name: "Only one", description: "Whether only one upgrade is supported for the building.",
            defaultValue: false
        })

        this.author.required = false;
        this.author.reset();
    }

    getDescription(): string {
        return "";
    }

    getTitle(index: number): string {
        return `${index + 1}. Upgrade ${this.id.value}`;
    }

}