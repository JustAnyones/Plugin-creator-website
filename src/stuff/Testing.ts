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

import CryptoJS from "crypto-js";

export const PCA_VERSION = "4.0-dev"

export const enum Types {
    AIRPORT = "airport",
    AWARD = "award",
    BODY_DISPOSAL = "body disposal",
    DECORATION = "decoration",
    EDUCATION = "education",
    ENERGY = "energy",
    FIRE_BRIGADE = "fire brigade",
    LANDMARK = "landmark",
    MEDIC = "medic",
    MILITARY = "military",
    PARK = "park",
    POLICE = "police",
    PUBLIC = "public",
    RELIGION = "religion",
    SPORT = "sport",
    SWAT = "swat",
    WASTE_DISPOSAL = "waste disposal",
    WATER = "water",

    // RCI
    RESIDENTIAL = "residential",
    COMMERCIAL = "commercial",
    INDUSTRIAL = "industrial",
    FARM = "farm",
    HARBOR = "harbor",
    HARBOR_PIER = "harbor pier"
}

export function createDraftFromType(type: Types): Draft {
    console.log("Creating draft with type", type)
    switch (type) {
        default:
            return new BuildingDraft(type)
    }
}

enum Attributes {}


class Attribute {
    public readonly id: string
    readonly name: string
    readonly description: string
    readonly required: boolean
    readonly defaultValue: any

    private _value: any

    element = null

    constructor(
        id: string,
        name: string,
        description: string,
        required: boolean = false,
        defaultValue?: any | (() => any)
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.required = required
        if (typeof defaultValue === "function") {
            this.defaultValue = defaultValue()
        } else {
            this.defaultValue = defaultValue
        }
        this._value = this.defaultValue;
    }

    public get value() {
        return this._value
    }

    public set value(value: any) {
        console.log(value)
        this._value = value
    }

    public isDefault() {
        return this.value === this.defaultValue
    }

    public validate() {

    }

    public isValid(): boolean {
        return false
    }

    public toJSON() {
        return this.value
    }
}

export class StringAttribute extends Attribute {
    element = "StringInput"

    maxLength: Number

    constructor(
        id: string,
        name: string,
        description: string,
        required: boolean = false,
        defaultValue: string | (() => string) = "",
    ) {
        super(id, name, description, required, defaultValue)
    }
}

export class NumberAttribute extends Attribute {
    element = "NumberInput"
    minValue: Number
    maxValue: Number

    constructor(
        id: string,
        name: string,
        description: string,
        required: boolean = false,
        defaultValue: any = null,
        validation = {
            minValue: Number.NEGATIVE_INFINITY,
            maxValue: Number.POSITIVE_INFINITY,
        }
    ) {
        super(id, name, description, required, defaultValue)
        this.minValue = validation.minValue
        this.maxValue = validation.maxValue
    }
}

export class FileAttribute extends Attribute {
    element = "FileAttribute"
    internalFileList?: FileList
}

export class FrameAttribute extends FileAttribute {
    element = "FrameInput"
}

export class BooleanAttribute extends Attribute {
    element = "BooleanInput"

    constructor(
        id: string,
        name: string,
        description: string,
        required: boolean = false,
        defaultValue: boolean = false,
    ) {
        super(id, name, description, required, defaultValue)
    }

}

export class LevelAttribute extends NumberAttribute {
    element = "LevelInput"
}

export class Draft {
    id: StringAttribute = new StringAttribute(
        "id",
        "ID",
        "A unique identifier which is used by the game to load and use the plugin.",
        true,
        "lt.svetikas.pca.v4." + CryptoJS.MD5(new Date().getTime().toString()).toString()
    )

    active: boolean
    premium= new BooleanAttribute(
        "premium",
        "Premium",
        "Whether the plugin is premium. If it's considered premium, it will not be active in non premium" +
        "versions of the game.",
        false, false
    )
    platform: string
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



    title = new StringAttribute("title", "Title", "Draft title, usually of a building.")
    titleId = new StringAttribute(
        "title id", "Title ID",
        "ID of the title string. Can be used to refer to specific translation key."
    )
    text = new StringAttribute("text", "Text", "Draft text, usually the description of the building or the text in notifications.")
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


    ordinal: number
    // TODO: Ordinal from
    ordinalFrom: string // "ordinal from"


    // TODO: meta
    //meta: JSONObject


    separator: boolean


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
        "Draft ID of a category this draft belongs to.")
    categoryFrom = new StringAttribute(
        "category from", "Category from",
        "Draft ID to grab category from and use for this draft as well.")


    // TODO: load aliases
    aliases: Array<string>


    // TODO: "premium requirements" and "requirements"


    // TODO: scripts
    //luaScripts: Array<Script>


    constructor(type: Types) {
        this.type = type
    }

    /**
     * Returns an array of required attributes for the draft.
     */
    public getRequiredAttributes(): Array<Attribute> {
        let attrs = []
        Object.keys(this).forEach(
            (item) => {
                let attribute = this[item]
                if (attribute instanceof Attribute && attribute.required)
                    attrs.push(attribute)
            })
        return attrs
    }

    /**
     * Returns an array of optional attributes for the draft.
     */
    public getOptionalAttributes(): Array<Attribute> {
        let attrs = []
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
        let files = [];
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
        data["pca"] = PCA_VERSION
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
}

class ViewportDraft extends Draft {
    frames = new FrameAttribute(
        "frames", "Frames",
        "Frames define your draft texture. Usually, this means the texture of the building.",
        true,
        []
    )
}

class CategoryDraft extends ViewportDraft {

}

export class BuildingDraft extends ViewportDraft {
    width = new NumberAttribute(
        "width", "Width",
        "Width of your building draft in tiles. Should be the same height.",
        true,
        1,
        {minValue: 1, maxValue: 16}
    )
    height = new NumberAttribute(
        "height", "Height",
        "Height of your building draft in tiles. Should be the same width.",
        true,
        1,
        {minValue: 1, maxValue: 16}
    )


    // TODO: implement loadComposition(draft);
    // TODO: implement more of loadFrames(draft);


    needsRoad: boolean
    needsLand: boolean
    needsWater: boolean
    minWaterTiles: number
    level = new LevelAttribute(
        "level", "Level",
        "Residential/commercial/industrial building level.",
        true, 1,
        {minValue: 1, maxValue: 3}
    )
    density: number // float
    buildHeight= new NumberAttribute(
        "build height", "Build height",
        "The building height. Should be used when frames are not provided. Otherwise, game calculates it" +
        "by itself.",
        false, -1,
    )

    //animation: boolean // draft.animation = src.optBoolean("animated", draft.animation); TODO: ???

    price = new NumberAttribute(
        "price", "Price",
        "Price of the building in Theons.",
        false, 0,
        {minValue: 0, maxValue: 10_000_000}
    )
    addPriceDrafts: Array<string> // draft.addPriceDrafts = loadDraftList(src, "add price", draft.id, draft.addPriceDrafts);
    monthlyPrice = new NumberAttribute(
        "monthly price", "Monthly price",
        "Monthly price of the building in Theons.",
        false, 0,
        {minValue: -10_000_000, maxValue: 10_000_000}
    )
    diamondPrice = new NumberAttribute(
        "diamond price", "Diamond price",
        "Diamond price of the building. Note that on premium platforms you need to specify normal price as " +
        "well, since the game does not convert diamond price to Theon price.",
        false, 0,
        {minValue: 0, maxValue: 10_000_000}
    )
    budgetItem: string
    bulldozePrice = new NumberAttribute(
        "bulldoze price", "Bulldoze price",
        "Price to bulldoze the building.",
        false, 0,
        {minValue: 0, maxValue: 10_000_000}
    )

    power = new NumberAttribute(
        "power", "Power",
        "Amount of power used. Use negative values to produce power instead.",
        false, 0,
        {minValue: -10_000_000, maxValue: 10_000_000}
    )
    water = new NumberAttribute(
        "water", "Water",
        "Amount of water used. Use negative values to produce water instead.",
        false, 0,
        {minValue: -10_000_000, maxValue: 10_000_000}
    )

    capacity: number //???
    destroyable = new BooleanAttribute(
        "destroyable", "Destroyable",
        "Whether the building can be destroyed by disasters.",
        false, true
    )
    destroyableByFun = new BooleanAttribute(
        "destroyable by fun", "Destroyable by fun",
        "Whether the building can be destroyed by fun.",
        false, true
    )
    destruction = new StringAttribute(
        "destruction", "Destruction",
        "ID of the building that will be used to replace the destructed building. " +
        "Must be either 1x1 in which case it will fill up the area of the destructed building, " +
        "or match the size of the destructed building."
    )
    burnable = new BooleanAttribute(
        "burnable", "Burnable",
        "Whether the building can be set on fire.",
        false, true
    )
    useFireFrames: boolean

    maxCount = new NumberAttribute(
        "max count", "Max count",
        "Maximum amount of buildings that can exist on the city.",
        false, -1,
        {minValue: -1, maxValue: 10_000_000}
    )
    priceFactor: number // float

    waterWaste: number // float
    drawGround = new BooleanAttribute(
        "draw ground", "Draw ground",
        "Whether to draw ground underneath the building in place of transparency.",
        false, false
    )
    frameAlignmentArea: boolean
    frameAlignment: boolean
    alignable: boolean
    rotationAware: boolean
    extRotationAware: boolean
    selectableFrames: boolean
    volatile: boolean

    useFence: Array<String>

    // TODO: "ships", "ship count", "ship radius"
    // TODO: "helicopter spawner"
    // TODO: "car spawner"
    // TODO: "spawn"

    explodes: boolean
    explosionRadius: number
    nuclear: boolean

    disaster: boolean
    removable: boolean

    //mapColor: Colour

    pickable: boolean
    renameable: boolean

    performance: boolean

    powerRadius: number

    idleBuildTime: boolean

    randomizeAnimation: boolean
    randomizeLights: boolean


    // TODO: loadFun

    // TODO: loadSmoke

    // TODO: loadAnimations

    buildTimeFactor: number // float
    freeBuildTimeSkip: boolean

    serviceCars: number
    // TODO: serviceCarTags

    // TODO: roadFlags

    nightLightProbability: number // float

    rciCars: number

    easyRemove: boolean
    supportsSlope: boolean
    supportsTerrain: boolean
    supportsShoreline: boolean

    drawWaterBorders: boolean
    drawWaterGround: any // either a boolean or ID of the ground to draw

    movable: boolean

    zone = new StringAttribute(
        "zone", "Zone",
        "Draft ID of a zone this draft belongs to. " +
        "Game will place the specified zone underneath the building."
    )
    buildZone: boolean

    conductive: boolean
    superConductive: boolean
    highVoltageOnly: boolean
    liquid: boolean

    drawZone: boolean

    people = new NumberAttribute(
        "people", "People",
        "Amount of inhabitants or workers the building has.",
        false, 0
    ) // joint habitants and workers attribute

    autoBuild: boolean
    autoBuildFactor: number // float
    rebuild: boolean

    buildTime= new NumberAttribute(
        "build time",
        "Build time",
        "Build time of the building. Can be left blank for game to calculate itself. Value of 0 will let" +
        "building finish instantly.",
        false, 0,
        {minValue: 0, maxValue: 10_000_000}
    )
    influencePreview: boolean

    // TODO: loadInfluences
    // TODO: loadUpgrades
    // TODO: loadAspects
    // TODO: loadPedestrian


    influences: any
    aspect: any
}
