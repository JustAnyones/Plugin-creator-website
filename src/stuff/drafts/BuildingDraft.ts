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

import {ViewportDraft} from "./ViewportDraft";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {LevelAttribute} from "../attribute/LevelAttribute";
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {StringAttribute} from "../attribute/StringAttribute";

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

    // TODO: revisit when transport update hits, "capacity"
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

    explodes= new BooleanAttribute(
        "explodes", "Explodes",
        "Whether the building explodes after being set on fire.",
        false, false
    )
    explosionRadius: number
    nuclear = new BooleanAttribute(
        "nuclear", "Nuclear",
        "Whether the explosion of the building is nuclear.",
        false, false
    )

    disaster = new BooleanAttribute(
        "disaster", "Disaster",
        "Whether to consider the existence of the building as a disaster. " +
        "Disaster halts city development until it's over.",
        false, true
    )
    removable = new BooleanAttribute(
        "removable", "Removable",
        "Whether the building can be removed by the player.",
        false, true
    )

    //mapColor: Colour

    pickable = new BooleanAttribute(
        "pickable", "Pickable",
        "Whether the building can be picked with the picker tool.",
        false, true
    )
    renameable = new BooleanAttribute(
        "renameable", "Rename-able",
        "Whether the name of the building (title) can be changed by the player.",
        false, true
    )

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

    movable = new BooleanAttribute(
        "movable", "Movable",
        "Whether the building can be moved by the player.",
        false, true
    )

    zone = new StringAttribute(
        "zone", "Zone",
        "Draft ID of a zone this draft belongs to. " +
        "Game will place the specified zone underneath the building."
    )
    buildZone: boolean

    conductive: boolean
    superConductive: boolean
    highVoltageOnly: boolean
    liquid = new BooleanAttribute(
        "liquid", "Liquid",
        "Whether the building conducts water like a pipe.",
        false, false
    )

    drawZone: boolean

    people = new NumberAttribute(
        "people", "People",
        "Amount of inhabitants or workers the building has. " +
        "Only applies for RCI buildings.",
        false, 0
    )

    autoBuild = new BooleanAttribute(
        "auto build", "Auto build",
        "Whether the building can be auto built by the game.",
        false, null
    )
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
