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

import {StringAttribute} from "../../attribute/StringAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {Types} from "../../Types";
import {MetaAttribute} from "../../attribute/MetaAttribute";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";
import {Frame, FrameFactory} from "../objects/Frame";
import {AttributeOwner, AttributeOwnerFactory} from "../AttributeOwner";
import {ListAttribute} from "../../attribute/ListAttribute";
import { serialize } from "@/core/utils/Utils";

export class DraftFactory implements AttributeOwnerFactory {

    fromJSON(json: any, plugin: Plugin): Draft {
        let obj = this.fromType(json["type"], plugin);
        if (obj === null) return null;
        return serialize(json, obj);
    }

    fromType(type: string, plugin: Plugin): Draft {
        const draftType = Types.getType(type);
        if (draftType === null) return null;
        const draft = draftType.getDraft();
        return new draft(draftType, plugin);
    }
}

export interface DefaultAttributes {
    privileged: StringAttribute
    id: StringAttribute
    inherit: BooleanAttribute
    override: BooleanAttribute
    minVersion: NumberAttribute
    maxVersion: NumberAttribute
    // TODO: template related
    type: DraftType
    title: StringAttribute
    text: StringAttribute
    hidden: BooleanAttribute
    author: StringAttribute
    // TODO: dev
    final: BooleanAttribute
    hideId: BooleanAttribute
    muteLua: BooleanAttribute
    strictLua: BooleanAttribute
    index: BooleanAttribute
    notImplemented: BooleanAttribute
    // TODO: soundclick related
    ordinal: NumberAttribute
    ordinalFrom: StringAttribute
    // TODO: meta
    titleId: StringAttribute
    textId: StringAttribute
    separator: BooleanAttribute
    previewFrames: ListAttribute<Frame>
    iconFrames: ListAttribute<Frame>
    showNewMarker: BooleanAttribute
    searchable: BooleanAttribute
    category: StringAttribute
    categoryFrom: StringAttribute
    // TODO: aliases
    // TODO: requirements
    // TODO: scripts
}

export class Draft extends AttributeOwner implements DefaultAttributes {

    readonly type: DraftType

    id: StringAttribute
    active: BooleanAttribute
    premium: BooleanAttribute
    once: BooleanAttribute
    mute: BooleanAttribute
    privileged: StringAttribute
    requirePrivileges: BooleanAttribute
    requireSuperPrivileges: BooleanAttribute
    inherit: BooleanAttribute
    override: BooleanAttribute
    minVersion: NumberAttribute
    maxVersion: NumberAttribute
    title: StringAttribute
    text: StringAttribute
    hidden: BooleanAttribute
    author: StringAttribute
    final: BooleanAttribute
    hideId: BooleanAttribute
    muteLua: BooleanAttribute
    strictLua: BooleanAttribute
    index: BooleanAttribute
    notImplemented: BooleanAttribute
    ordinal: NumberAttribute
    ordinalFrom: StringAttribute
    // TODO: proper meta implementation
    meta: MetaAttribute
    titleId: StringAttribute
    textId: StringAttribute
    separator: BooleanAttribute
    previewFrames: ListAttribute<Frame>
    iconFrames: ListAttribute<Frame>
    showNewMarker: BooleanAttribute
    searchable: BooleanAttribute
    category: StringAttribute
    categoryFrom: StringAttribute

    constructor(type: DraftType, plugin: Plugin) {
        super(plugin);
        this.type = type


        this.id = new StringAttribute({
            plugin: this.plugin, id: "id",
            name: "ID", description: "Each object has to have a unique ID to identify it. " +
                "So you should add some specific information about the plugin to ensure nobody else ever gonna use this ID. " +
                "Avoid changes to the ID afterwards, as it is used to identify buildings in saved cities. " +
                "If you need to change it, please use the \"aliases\" attribute instead.",
            required: true
        })

        this.active = new BooleanAttribute({
            plugin: this.plugin,
            id: "active",
            name: "Active", description: "Whether the draft is active and should be loaded by the game.",
            required: false, defaultValue: true
        })
        this.premium = new BooleanAttribute({
            plugin: this.plugin, id : "premium",
            name : "Premium", description : "Whether the plugin is premium. If it's considered premium, it will not be active in non premium " +
                "versions of the game.",
            required : false, defaultValue : false
        })
        this.once = new BooleanAttribute({
            plugin: this.plugin, id : "once",
            name : "Once", description : "Whether to load a draft by the specified ID once. It will not load any extra drafts whose " +
                "ID is already loaded.",
            required : false, defaultValue : false
        })
        this.inherit = new BooleanAttribute({
            plugin: this.plugin, id : "inherit",
            name : "Inherit", description : "Whether to inherit an already defined draft by the specified ID.",
            required : false, defaultValue : false
        })
        this.override = new BooleanAttribute({
            plugin: this.plugin, id : "override",
            name : "Override", description : "Whether to override an already defined draft by the specified ID.",
            required : false, defaultValue : false
        })
        this.privileged = new StringAttribute({
            plugin: this.plugin, id: "privileged",
            name: "Privileged key", description: "Privileged key for your draft. Allows to use special features, which " +
                "are restricted to trusted plugin creators only."
        })
        this.requirePrivileges = new BooleanAttribute({
            plugin: this.plugin, id: "require privileges",
            name: "Require privileges",
            description: "Whether the draft requires features such as monthly income, frame placement, etc.",
            required: false, defaultValue: false
        })
        this.requireSuperPrivileges = new BooleanAttribute({
            plugin: this.plugin, id: "require super privileges",
            name: "Require super privileges",
            description: "Whether the draft requires features that are restricted to DSA.",
            required: false, defaultValue: false,
            disabled: true
        })
        this.mute = new BooleanAttribute({
            plugin: this.plugin, id : "mute",
            name : "Mute", description : "Whether to suppress any errors that have occurred while loading the draft.",
            required : false, defaultValue : false
        })

        this.minVersion = new NumberAttribute({
            plugin: this.plugin, id: "min version",
            name: "Minimal version", description: "Minimal game version required to run this draft.",
            defaultValue: 0,
            validation: {minValue: 0, maxValue: 99999}
        })
        this.maxVersion = new NumberAttribute({
            plugin: this.plugin, id: "max version",
            name: "Max version", description: "Maximum game version required to run this draft.",
            defaultValue: 0,
            validation: {minValue: 0, maxValue: 99999}
        })

        this.title = new StringAttribute({
            plugin: this.plugin, id: "title",
            name : "Title", description : "Draft title, usually of a building."
        })
        this.titleId = new StringAttribute({
            plugin: this.plugin, id: "title id",
            name : "Title ID", description : "ID of the title string. Can be used to refer to specific translation key."
        })
        this.text = new StringAttribute({
            plugin: this.plugin, id: "text",
            name: "Text", description: "Draft text, usually the description of the building or the text in notifications."
        })
        this.textId = new StringAttribute({
            plugin: this.plugin, id: "text id",
            name: "Text ID", description: "ID of the text string. Can be used to refer to specific translation key."
        })
        this.hidden = new BooleanAttribute({
            plugin: this.plugin, id : "hidden",
            name : "Hidden", description : "Whether the draft will be hidden in the toolbar.",
            required : false, defaultValue : false
        })
        this.author = new StringAttribute({
            plugin: this.plugin, id: "author",
            name: "Author", description : "The author of this plugin draft.",
            required : true
        })


        this.final = new BooleanAttribute({
            plugin: this.plugin, id : "final",
            name : "Final", description : "Whether the draft can be overridden.",
            required : false, defaultValue : false
        })
        this.hideId = new BooleanAttribute({
            plugin: this.plugin, id : "hide id",
            name : "Hide ID", description : "Whether the user can see the ID of the draft.",
            required : false, defaultValue : false
        })
        this.muteLua = new BooleanAttribute({
            plugin: this.plugin, id : "mute lua",
            name : "Mute Lua", description : "Whether to mute Lua errors.",
            required : false
        })
        // TODO: improve description
        this.strictLua = new BooleanAttribute({
            plugin: this.plugin, id : "strict lua",
            name : "Strict Lua", description : "???",
            required : false
        })
        this.index = new BooleanAttribute({
            plugin: this.plugin, id : "index",
            name : "Index", description : "Whether to allow the draft to be indexed by Lua methods.",
            required : false, defaultValue : false
        })

        this.ordinal = new NumberAttribute({
            plugin: this.plugin, id: "ordinal",
            name: "Ordinal", description: "Position of the draft in category. Lower ordinal value will list the draft " +
                "higher. Negative values are allowed."
        })
        // TODO: improve description
        this.ordinalFrom = new StringAttribute({
            plugin: this.plugin, id: "ordinal",
            name: "Ordinal from", description: "ID of the draft to grab ordinal from. Must be used in combination " +
                "with ordinal attribute."
        })


        // TODO: proper meta implementation
        this.meta = new MetaAttribute({
            plugin: this.plugin, id: "meta",
            name: "Meta", description: "Draft metadata. Useful for defining special draft data. " +
                "By default, PCA includes some information about itself.",
            // @ts-ignore
            required: false, defaultValue: {"pca": {"version": __APP_VERSION__}}
        })

        this.separator = new BooleanAttribute({
            plugin: this.plugin, id: "separator",
            name: "Separator", description: "Whether to separate draft from others in a category.",
            defaultValue: false
        })

        this.previewFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "preview frames",
            name: "Preview frames", description: "The preview frames of your draft visible in the toolbar.",
            factory: new FrameFactory()
        })
        this.iconFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "icon frames",
            name: "Icon frames", description: "The icon frames of your draft. Visible in the building information panel.",
            factory: new FrameFactory()
        })

        this.showNewMarker = new BooleanAttribute({
            plugin: this.plugin, id: "show new marker",
            name: "Show new marker", description: "Whether the draft will show a new marker in the toolbar.",
            defaultValue: true
        })
        this.searchable = new BooleanAttribute({
            plugin: this.plugin, id: "searchable",
            name: "Searchable", description: "Whether the draft can be searched.",
            defaultValue: true
        })


        this.category = new StringAttribute({
            plugin: this.plugin, id: "category",
            name: "Category", description: "Draft ID of a category this draft belongs to."
        })
        this.categoryFrom = new StringAttribute({
            plugin: this.plugin, id: "category from",
            name: "Category from", description: "Draft ID to grab category from and use for this draft as well."
        })


        this.notImplemented = new BooleanAttribute({
            plugin: this.plugin, id: "not implemented",
            name: "Not implemented", description: "Whether this draft has to be inherited to be considered implemented.",
            defaultValue: false
        })




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
     * Returns the JSON representation of the draft.
     */
    public toJSON() {
        let data = super.toJSON();
        if (this.type.base)
            data["type"] = this.type.tag
        //data["meta"] = this.meta;
        return data
    }

    getOptionalAttributeDescription(): string {
        return "These are optional attributes you can add to your plugin draft. " +
            "They are not required, however useful such as adding a title, a description or a price for your building.";
    }
}