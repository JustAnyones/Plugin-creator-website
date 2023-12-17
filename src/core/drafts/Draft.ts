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
import {Attribute} from "../attribute/Attribute";
import {StringAttribute} from "../attribute/StringAttribute";
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {FileAttribute} from "../attribute/FileAttribute";
import {Types} from "../Types";
import {MetaAttribute} from "../attribute/MetaAttribute";
import {DraftType} from "../DraftType";

export class Draft {
    id = new StringAttribute(
        "id",
        "ID",
        "Each object has to have a unique ID to identify it. " +
        "So you should add some specific information about the plugin to ensure nobody else ever gonna use this ID. " +
        "Avoid changes to the ID afterwards, as it is used to identify buildings in saved cities. " + 
        "If you need to change it, please use the \"aliases\" attribute instead.",
        true
    )

    active = new BooleanAttribute(
        "active",
        "Active",
        "Whether the draft is active and should be loaded by the game.",
        false, true
    )
    premium = new BooleanAttribute(
        "premium",
        "Premium",
        "Whether the plugin is premium. If it's considered premium, it will not be active in non premium " +
        "versions of the game.",
        false, false
    )
    platform: string // TODO: figure out possible values and create a custom attribute
    readonly type: DraftType
    once = new BooleanAttribute(
        "once", "Once",
        "Whether to load a draft by the specified ID once. It will not load any extra drafts whose " +
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
    mute = new BooleanAttribute(
        "mute", "Mute",
        "Whether to suppress any errors that have occurred while loading the draft.",
        false, false
    )

    minVersion = new NumberAttribute({
        id: "min version",
        name: "Minimal version",
        description: "Minimal game version required to run this draft.",
        defaultValue: 0,
        validation: {minValue: 0, maxValue: 99999}
    })
    maxVersion = new NumberAttribute({
        id: "max version",
        name: "Max version",
        description: "Maximum game version required to run this draft.",
        defaultValue: 0,
        validation: {minValue: 0, maxValue: 99999}
    })


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
    textId = new StringAttribute(
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
        true
    )


    final = new BooleanAttribute(
        "final",
        "Final",
        "Whether the draft can be overridden.",
        false, false
    )
    hideId = new BooleanAttribute(
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


    ordinal = new NumberAttribute({
        id: "ordinal",
        name: "Ordinal",
        description: "Position of the draft in category. Lower ordinal value will list the draft higher. Negative values are allowed."
    })
    // TODO: improve description
    ordinalFrom = new StringAttribute(
        "ordinal",
        "Ordinal from",
        "ID of the draft to grab ordinal from. Must be used in combination with ordinal attribute."
    )


    // TODO: proper meta implementation
    meta = new MetaAttribute(
        "meta", "Meta",
        "Draft metadata. Useful for defining special draft data. By default, PCA includes some information about itself.",
        // @ts-ignore
        false, {"pca": {"version": __APP_VERSION__}}
    )

    separator = new BooleanAttribute(
        "separator", "Separator",
        "Whether to separate draft from others in a category.", // TODO: improve, is separator before or after?
        false, false
    )


    // TODO: preview and icon frames
    previewFrames: Array<number>
    iconFrames: Array<number>
    showNewMarker = new BooleanAttribute(
        "show new marker", "Show new marker",
        "Whether the draft will show a new marker in the toolbar.",
        false, true
    )
    searchable = new BooleanAttribute(
        "searchable", "Searchable",
        "Whether the draft can be searched.",
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


    constructor(type: DraftType) {
        this.type = type

        let authorName = localStorage.getItem("authorName");
        if (authorName == null) {
            authorName = "pca.svetikas.lt";
        } else {
            this.author.value = authorName;
        }

        let date = new Date().getTime()
        let fmt = {
            year: Intl.DateTimeFormat('en', {year: "numeric"}).format(date),
            month: Intl.DateTimeFormat('en', {month: "2-digit"}).format(date),
            day: Intl.DateTimeFormat('en', {day: "2-digit"}).format(date),
            hour: Intl.DateTimeFormat('en', {hour: "2-digit", hour12: false}).format(date),
            minute: Intl.DateTimeFormat('en', {minute: "2-digit"}).format(date),
        }

        this.id.value = `$`;
        this.id.value += `${authorName.replace(" ", "_").toLowerCase()}`;
        this.id.value += `.${type.tag}`;
        this.id.value += `.${fmt.year}-${fmt.month}-${fmt.day}-${fmt.hour}:${fmt.minute}`;
    }

    /**
     * Returns an array of required attribute for the draft.
     */
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
     * Returns an array of optional attribute for the draft.
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
        data["type"] = this.type.tag
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
        //data["meta"] = this.meta;
        return data
    }

    public static fromType(type: string) {
        const draftType = Types.getType(type);
        if (draftType === null) return null;
        return draftType.getDraft();
    }

    public static fromJSON(json: any) {
        let obj = this.fromType(json["type"]);
        if (obj === null) return null;


        let jsonAttrs = Object.keys(json);


        Object.keys(json).forEach(
            (key) => {
                console.log(key, json[key]);
            }
        )

        let removed = {
            "deleted": "this is a custom entry for listing unsupported pca tags"
        }

        Object.keys(obj).forEach((item) => {
            let attribute = obj[item]
            if (attribute instanceof Attribute)
                if (json[attribute.id] !== undefined) {
                    attribute.value = json[attribute.id]
                    json[attribute.id] = removed;
                    // TODO: does not display optional attributes visually, should be resolved
                    // TODO: does not load frames
                }
        })

        console.log("Unsupported tags:")
        jsonAttrs.forEach(
            (key) => {
                if (json[key] !== removed)
                    console.log(key, json[key]);
            }
        )


        return obj
    }

    /**
     * Validates every attribute of the draft.
     *
     * Returns whether the draft is valid.
     */
    private validateFields(): boolean {
        let valid = true;
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute)
                    if (!attribute.validate()) valid = false;
            })
        return valid
    }

    /**
     * Runs validation for the draft.
     */
    public validate(): boolean {
        return this.validateFields()
    }
}