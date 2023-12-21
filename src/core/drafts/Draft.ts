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
import {Types} from "../Types";
import {MetaAttribute} from "../attribute/MetaAttribute";
import {DraftType} from "../DraftType";
import {Plugin} from "../Plugin";
import {BmpFrame, FrameAttribute} from "../attribute/FrameAttribute";

export class Draft {
    id = new StringAttribute({
        owner: this, id: "id",
        name: "ID", description: "Each object has to have a unique ID to identify it. " +
        "So you should add some specific information about the plugin to ensure nobody else ever gonna use this ID. " +
        "Avoid changes to the ID afterwards, as it is used to identify buildings in saved cities. " +
        "If you need to change it, please use the \"aliases\" attribute instead.",
        required: true
    })

    active = new BooleanAttribute({
        owner: this,
        id: "active",
        name: "Active", description: "Whether the draft is active and should be loaded by the game.",
        required: false, defaultValue: true
    })
    premium = new BooleanAttribute({
        owner: this, id : "premium",
        name : "Premium", description : "Whether the plugin is premium. If it's considered premium, it will not be active in non premium " +
        "versions of the game.",
        required : false, defaultValue : false
    })
    platform: string // TODO: figure out possible values and create a custom attribute
    readonly type: DraftType
    plugin: Plugin
    once = new BooleanAttribute({
        owner: this, id : "once",
        name : "Once", description : "Whether to load a draft by the specified ID once. It will not load any extra drafts whose " +
        "ID is already loaded.",
        required : false, defaultValue : false
    })
    inherit = new BooleanAttribute({
        owner: this, id : "inherit",
        name : "Inherit", description : "Whether to inherit an already defined draft by the specified ID.",
        required : false, defaultValue : false
    })
    override = new BooleanAttribute({
        owner: this, id : "override",
        name : "Override", description : "Whether to override an already defined draft by the specified ID.",
        required : false, defaultValue : false
    })
    privileged = new StringAttribute({
        owner: this, id: "privileged",
        name: "Privileged key", description: "Privileged key for your draft. Allows to use special features, which " +
            "are restricted to trusted plugin creators only."
    })
    mute = new BooleanAttribute({
        owner: this, id : "mute",
        name : "Mute", description : "Whether to suppress any errors that have occurred while loading the draft.",
        required : false, defaultValue : false
    })

    minVersion = new NumberAttribute({
        owner: this, id: "min version",
        name: "Minimal version", description: "Minimal game version required to run this draft.",
        defaultValue: 0,
        validation: {minValue: 0, maxValue: 99999}
    })
    maxVersion = new NumberAttribute({
        owner: this, id: "max version",
        name: "Max version", description: "Maximum game version required to run this draft.",
        defaultValue: 0,
        validation: {minValue: 0, maxValue: 99999}
    })


    // TODO: Template related
    //String templatePrefix = src.optString("template prefix");
    //String templatesAttribName = src.has("template") ? "template" : "templates";



    title = new StringAttribute({
        owner: this, id: "title",
        name : "Title", description : "Draft title, usually of a building."
    })
    titleId = new StringAttribute({
        owner: this, id: "title id",
        name : "Title ID", description : "ID of the title string. Can be used to refer to specific translation key."
    })
    text = new StringAttribute({
        owner: this, id: "text",
        name: "Text", description: "Draft text, usually the description of the building or the text in notifications."
    })
    textId = new StringAttribute({
        owner: this, id: "text id",
        name: "Text ID", description: "ID of the text string. Can be used to refer to specific translation key."
    })
    hidden = new BooleanAttribute({
        owner: this, id : "hidden",
        name : "Hidden", description : "Whether the draft will be hidden in the toolbar.",
        required : false, defaultValue : false
    })
    author = new StringAttribute({
        owner: this, id: "author",
        name: "Author", description : "The author of this plugin draft.",
        required : true
    })


    final = new BooleanAttribute({
        owner: this, id : "final",
        name : "Final", description : "Whether the draft can be overridden.",
        required : false, defaultValue : false
    })
    hideId = new BooleanAttribute({
        owner: this, id : "hide id",
        name : "Hide ID", description : "Whether the user can see the ID of the draft.",
        required : false, defaultValue : false
    })
    muteLua = new BooleanAttribute({
        owner: this, id : "mute lua",
        name : "Mute Lua", description : "Whether to mute Lua errors.",
        required : false
    })
    // TODO: improve description
    strictLua = new BooleanAttribute({
        owner: this, id : "strict lua",
        name : "Strict Lua", description : "???",
        required : false
    })
    index = new BooleanAttribute({
        owner: this, id : "index",
        name : "Index", description : "Whether to allow the draft to be indexed by Lua methods.",
        required : false, defaultValue : false
    })


    // TODO: Sound click related
    soundClick: number


    ordinal = new NumberAttribute({
        owner: this, id: "ordinal",
        name: "Ordinal", description: "Position of the draft in category. Lower ordinal value will list the draft " +
            "higher. Negative values are allowed."
    })
    // TODO: improve description
    ordinalFrom = new StringAttribute({
        owner: this, id: "ordinal",
        name: "Ordinal from", description: "ID of the draft to grab ordinal from. Must be used in combination " +
            "with ordinal attribute."
    })


    // TODO: proper meta implementation
    meta = new MetaAttribute({
        owner: this, id: "meta",
        name: "Meta", description: "Draft metadata. Useful for defining special draft data. " +
            "By default, PCA includes some information about itself.",
        // @ts-ignore
        required: false, defaultValue: {"pca": {"version": __APP_VERSION__}}
    })

    separator = new BooleanAttribute({
        owner: this, id: "separator",
        name : "Separator", description : "Whether to separate draft from others in a category.",
        required : false, defaultValue : false
    })


    // TODO: preview and icon frames
    previewFrames: Array<number>
    iconFrames: Array<number>
    showNewMarker = new BooleanAttribute({
        owner: this, id: "show new marker",
        name : "Show new marker", description : "Whether the draft will show a new marker in the toolbar.",
        required : false, defaultValue : true
    })
    searchable = new BooleanAttribute({
        owner: this, id: "searchable",
        name : "Searchable", description : "Whether the draft can be searched.",
        required : false, defaultValue : true
    })


    category = new StringAttribute({
        owner: this, id: "category",
        name: "Category", description: "Draft ID of a category this draft belongs to."
    })
    categoryFrom = new StringAttribute({
        owner: this, id: "category from",
        name: "Category from", description: "Draft ID to grab category from and use for this draft as well."
    })


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

    public setOwner(owningPlugin: Plugin) {
        this.plugin = owningPlugin
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
    public getFiles(): Array<string> {
        let files: Array<string> = [];
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof FrameAttribute) {
                    attribute.value.forEach(frame => {
                        if (frame instanceof BmpFrame && frame.bmp.value !== null) {
                            files.push(frame.bmp.value)
                        }
                    })
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

    public static fromType(type: string): Draft {
        const draftType = Types.getType(type);
        if (draftType === null) return null;
        const draft = draftType.getDraft();
        return new draft(draftType);
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
            if (attribute instanceof Attribute) {
                if (json[attribute.id] !== undefined) {
                    attribute.value = json[attribute.id]
                    json[attribute.id] = removed;
                    // TODO: does not display optional attributes visually, should be resolved
                }
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