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

// @ts-ignore
import CryptoJS from "crypto-js";
import {Attribute} from "../attribute/Attribute";
import {StringAttribute} from "../attribute/StringAttribute";
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {FileAttribute} from "../attribute/FileAttribute";
import {Types, ValidationException} from "../Testing";

export class Draft {
    id = new StringAttribute(
        "id",
        "ID",
        "A unique identifier which is used by the game to load and use the plugin.",
        true,
        "lt.svetikas.pca.v4." + CryptoJS.MD5(new Date().getTime().toString()).toString()
    )

    active = new BooleanAttribute(
        "active",
        "Active",
        "Whether the draft is active and should be loaded by the game.",
        false, true
    )
    premium= new BooleanAttribute(
        "premium",
        "Premium",
        "Whether the plugin is premium. If it's considered premium, it will not be active in non premium" +
        "versions of the game.",
        false, false
    )
    platform: string // TODO: figure out possible values and create a custom attribute
    readonly type: Types
    once = new BooleanAttribute(
        "once", "Once",
        "Whether to load a draft by the specified ID once. It will not load any extra drafts whose" +
        "ID is already loaded.",
        false, false
    )
    inherit = new BooleanAttribute(
        "inherit", "Inherit",
        "Whether to inherit an already defined draft by the specified ID.",
        false, false
    )
    override = new BooleanAttribute(
        "override", "Override",
        "Whether to override an already defined draft by the specified ID.",
        false, false
    )
    privileged = new StringAttribute(
        "privileged", "Privileged key",
        "Privileged key for your draft. Allows to use special features, which are restricted to " +
        "trusted plugin creators only."
    )
    mute= new BooleanAttribute(
        "mute", "Mute",
        "Whether to suppress any errors that have occurred while loading the draft.",
        false, false
    )

    minVersion = new NumberAttribute(
        "min version",
        "Minimal version",
        "Minimal game version required to run this draft",
        false, 0,
        {minValue: 0, maxValue: 99999}
    )
    maxVersion = new NumberAttribute(
        "max version",
        "Max version",
        "Maximum game version required to run this draft",
        false, 0,
        {minValue: 0, maxValue: 99999}
    )


    // TODO: Template related
    //String templatePrefix = src.optString("template prefix");
    //String templatesAttribName = src.has("template") ? "template" : "templates";



    title = new StringAttribute(
        "title", "Title",
        "Draft title, usually of a building."
    )
    titleId = new StringAttribute(
        "title id", "Title ID",
        "ID of the title string. Can be used to refer to specific translation key."
    )
    text = new StringAttribute(
        "text", "Text",
        "Draft text, usually the description of the building or the text in notifications."
    )
    textId= new StringAttribute(
        "text id", "Text ID",
        "ID of the text string. Can be used to refer to specific translation key."
    )
    hidden = new BooleanAttribute(
        "hidden", "Hidden",
        "Whether the draft will be hidden in the toolbar.",
        false, false
    )
    author = new StringAttribute(
        "author", "Author",
        "The author of this plugin draft.",
        true,
        "Plugin creator website 4.0"
    )


    final = new BooleanAttribute(
        "final",
        "Final",
        "Whether the draft can be overridden.",
        false, false
    )
    hideId= new BooleanAttribute(
        "hide id", "Hide ID",
        "Whether the user can see the ID of the draft.",
        false, false
    )
    muteLua = new BooleanAttribute(
        "mute lua", "Mute Lua",
        "Whether to mute Lua errors.",
        false
    )
    // TODO: improve description
    strictLua = new BooleanAttribute(
        "strict lua", "Strict Lua",
        "???",
        false
    )
    index = new BooleanAttribute(
        "index", "Index",
        "Whether to allow the draft to be indexed by Lua methods.",
        false, false
    )


    // TODO: Sound click related
    soundClick: number


    ordinal = new NumberAttribute(
        "ordinal",
        "Ordinal",
        "Position of the draft in category.",
        false, null
    )
    // TODO: improve description
    ordinalFrom = new StringAttribute(
        "ordinal",
        "Ordinal from",
        "ID of the draft to grab ordinal from. Must be used in combination with ordinal attribute."
    )


    // TODO: meta
    //meta: JSONObject


    separator = new BooleanAttribute(
        "separator", "Separator",
        "Whether to separate draft from others in category.", // TODO: improve, is separator before or after?
        false, false
    )


    // TODO: preview and icon frames
    previewFrames: Array<number>
    iconFrames: Array<number>
    showNewMarker= new BooleanAttribute(
        "show new marker", "Show new marker",
        "Whether to draft will show a new marker in the toolbar.",
        false, true
    )
    searchable = new BooleanAttribute(
        "searchable", "Searchable",
        "Whether to draft can be searched.",
        false, true
    )


    category = new StringAttribute(
        "category", "Category",
        "Draft ID of a category this draft belongs to."
    )
    categoryFrom = new StringAttribute(
        "category from", "Category from",
        "Draft ID to grab category from and use for this draft as well."
    )


    // TODO: load aliases
    //aliases: Array<string>


    // TODO: "premium requirements" and "requirements"


    // TODO: scripts
    //luaScripts: Array<Script>


    constructor(type: Types) {
        this.type = type
    }

    /**
     * Returns an array of required attribute for the draft.
     */
    public getRequiredAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute && attribute.required)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns an array of optional attribute for the draft.
     */
    public getOptionalAttributes(): Array<Attribute> {
        let attrs: Array<Attribute> = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute && !attribute.required)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns a list of files associated with the draft which have to be included together with the plugin.
     */
    public getFiles(): Array<File> {
        let files: Array<File> = [];
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof FileAttribute && attribute.internalFileList != null) {
                    for (let i = 0; i < attribute.internalFileList.length; i++) {
                        files.push(attribute.internalFileList[i])
                    }
                }
            })
        return files
    }

    /**
     * Returns the JSON representation of the draft.
     */
    public toJSON() {
        let data = {}
        data["type"] = this.type
        // @ts-ignore
        data["pca"] = __APP_VERSION__
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (
                    attribute instanceof Attribute
                    && attribute.value !== null
                )
                    if (attribute.required || !attribute.isDefault()) {
                        data[attribute.id] = attribute.value
                    }
            })
        return data
    }

    public validate() {
        if (this.id.isEmpty())
            throw new ValidationException(this.id, "ID field cannot be empty")

        if (this.author.isEmpty())
            throw new ValidationException(this.author, "Author field cannot be empty")
    }
}