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
import {InfluenceAttribute} from "../attribute/InfluenceAttribute";

export class BuildingDraft extends ViewportDraft {
    width = new NumberAttribute(
        "width", "Width",
        "Tile width of the base of the building. Each tile has a pixel size of 32x16.",
        true,
        1,
        {minValue: 1, maxValue: 16}
    )
    height = new NumberAttribute(
        "height", "Height",
        "Tile width of the base of the building. " +
        "Has to be the same as width, as only squared buildings are possible.",
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
        "Building wealth level. Only applicable for RCI buildings.",
        false, null,
        {minValue: 1, maxValue: 3}
    )
    density: number // float
    buildHeight = new NumberAttribute(
        "build height", "Build height",
        "The building height in pixels. Should be used when frames are not provided. Otherwise, game will calculate it" +
        " on its own.",
        false, null,
    )

    //animation: boolean // draft.animation = src.optBoolean("animated", draft.animation); TODO: ???

    price = new NumberAttribute(
        "price", "Price",
        "Price of the building in Theons.",
        false, null,
        {minValue: 0, maxValue: 10_000_000}
    )
    addPriceDrafts: Array<string> // draft.addPriceDrafts = loadDraftList(src, "add price", draft.id, draft.addPriceDrafts);
    monthlyPrice = new NumberAttribute(
        "monthly price", "Monthly price",
        "Monthly price of the building in Theons.",
        false, null,
        {minValue: -10_000_000, maxValue: 10_000_000}
    )
    diamondPrice = new NumberAttribute(
        "diamond price", "Diamond price",
        "Diamond price of the building. Note that on premium platforms you need to specify normal price as " +
        "well, since the game does not convert diamond price to Theon price.",
        false, null,
        {minValue: 0, maxValue: 10_000_000}
    )
    budgetItem: string
    bulldozePrice = new NumberAttribute(
        "bulldoze price", "Bulldoze price",
        "Price to bulldoze the building.",
        false, null,
        {minValue: 0, maxValue: 10_000_000}
    )

    power = new NumberAttribute(
        "power", "Power",
        "Amount of power used. Use negative values to produce power instead.",
        false, null,
        {minValue: -10_000_000, maxValue: 10_000_000}
    )
    water = new NumberAttribute(
        "water", "Water",
        "Amount of water used. Use negative values to produce water instead.",
        false, null,
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
        false, null,
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
    rotationAware = new BooleanAttribute(
        "rotation aware", "Rotation aware",
        "Whether the building is rotation aware. " +
        "If set to aware, you have to provide a multiple of 4 frames.",
        false, false
    )
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
    explosionRadius = new NumberAttribute(
        "explosion radius", "Explosion radius",
        "Radius of the explosion.",
        false, null,
        {minValue: 0, maxValue: 10_000_000}
    )
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

    performance = new BooleanAttribute(
        "performance", "Performance",
        "Whether the building uses performance.", // TODO: improve desc
        false, false
    )

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
    buildZone = new BooleanAttribute(
        "build zone", "Build zone",
        "Whether to build the zone under the building, if available.",
        false, true
    )

    conductive: boolean
    superConductive: boolean
    highVoltageOnly: boolean
    liquid = new BooleanAttribute(
        "liquid", "Liquid",
        "Whether the building conducts water like a pipe.",
        false, false
    )

    drawZone = new BooleanAttribute(
        "draw zone", "Draw zone",
        "Whether to draw the zone under the building.",
        false, false
    )

    people = new NumberAttribute(
        "people", "People",
        "Amount of inhabitants or workers the building has. " +
        "Only applies for RCI buildings.",
        false, null
    )

    autoBuild = new BooleanAttribute(
        "auto build", "Auto build",
        "Whether the building can be auto built by the game.",
        false, null
    )
    autoBuildFactor: number // float
    rebuild: boolean

    buildTime= new NumberAttribute(
        "build time", "Build time",
        "Build time of the building. Can be left blank for game to calculate itself. Value of 0 will let " +
        "building finish instantly.",
        false, null,
        {minValue: 0, maxValue: 10_000_000}
    )
    influencePreview = new BooleanAttribute(
        "influence preview", "Influence preview",
        "Whether the show a preview of building influences in the build mode.",
        false, true
    )

    // Visible Influences
    pollutionInfluence = new InfluenceAttribute(
        "influence pollution", "Influence pollution",
        "...",
        false, null,
        false
    )
    noiseInfluence = new InfluenceAttribute(
        "influence noise", "Influence noise",
        "...",
        false, null,
        false
    )
    healthInfluence= new InfluenceAttribute(
        "influence health", "Influence health",
        "...",
    )
    policeInfluence= new InfluenceAttribute(
        "influence police", "Influence police",
        "...",
    )
    fireDepartmentInfluence = new InfluenceAttribute(
        "influence fire department", "Influence fire department",
        "...",
    )
    parkInfluence= new InfluenceAttribute(
        "influence park", "Influence park",
        "...",
    )
    sportInfluence= new InfluenceAttribute(
        "influence sport", "Influence sport",
        "...",
    )
    educationLowInfluence= new InfluenceAttribute(
        "influence education low", "Influence education low",
        "...",
    )
    educationHighInfluence= new InfluenceAttribute(
        "influence education high", "Influence education high",
        "...",
    )
    cultureInfluence = new InfluenceAttribute(
        "influence culture", "Influence culture",
        "..."
    )
    managementInfluence= new InfluenceAttribute(
        "influence management", "Influence management",
        "..."
    )
    religionInfluence= new InfluenceAttribute(
        "influence religion", "Influence religion",
        "..."
    )
    passengerBusInfluence= new InfluenceAttribute(
        "influence passenger bus", "Influence passenger bus",
        "..."
    )
    passengerTrainInfluence= new InfluenceAttribute(
        "influence passenger train", "Influence passenger train",
        "..."
    )
    radioactivityInfluence= new InfluenceAttribute(
        "influence radioactive", "Influence radioactive",
        "...",
        false, null,
        false
    )
    natureInfluence= new InfluenceAttribute(
        "influence nature", "Influence nature",
        "..."
    )
    wasteDisposalInfluence= new InfluenceAttribute(
        "influence waste disposal", "Influence waste disposal",
        "..."
    )
    bodyDisposalInfluence= new InfluenceAttribute(
        "influence body disposal", "Influence body disposal",
        "..."
    )
    trafficInfluence= new InfluenceAttribute(
        "influence traffic", "Influence traffic",
        "...",
        false, null,
        false
    )


    // TODO: loadUpgrades



    // Aspects
    provideAspectEducationLow = new NumberAttribute(
        "provide aspect education low", "Provide aspect education low",
        "..."
    )
    provideAspectEducationHigh = new NumberAttribute(
        "provide aspect education high", "Provide aspect education high",
        "..."
    )
    provideAspectHealthCare = new NumberAttribute(
        "provide aspect health care", "Provide aspect health care",
        "..."
    )
    provideAspectWasteDisposal = new NumberAttribute(
        "provide aspect waste disposal", "Provide aspect waste disposal",
        "..."
    )
    provideAspectBodyDisposal = new NumberAttribute(
        "provide aspect body disposal", "Provide aspect body disposal",
        "..."
    )

    // Aspect capacities
    aspectEducationLowCapacity = new NumberAttribute(
        "aspect education low capacity", "Aspect education low capacity",
        "..."
    )
    aspectEducationHighCapacity = new NumberAttribute(
        "aspect education high capacity", "Aspect education high capacity",
        "..."
    )
    aspectHealthCareCapacity = new NumberAttribute(
        "aspect health care capacity", "Aspect health care capacity",
        "..."
    )
    aspectWasteDisposalCapacity = new NumberAttribute(
        "aspect waste disposal capacity", "Aspect waste disposal capacity",
        "..."
    )
    aspectBodyDisposalCapacity = new NumberAttribute(
        "aspect body disposal capacity", "Aspect body disposal capacity",
        "..."
    )


    pedestrian = new StringAttribute(
        "pedestrian", "Pedestrian",
        "ID of Pedestrian draft to spawn from this building."
    )
    pedestrianCount = new NumberAttribute(
        "pedestrian count", "Pedestrian count",
        "Amount of pedestrians to spawn from this building.",
        false, 0
    )

    validate(): boolean {
        let valid = super.validate()

        if (this.frames.value.length == 0) {
            this.frames.addError("Please choose at least a single frame.")
            valid = false;
        }

        if (this.width.value != this.height.value) {
            this.height.addError("Width and height must be the same.")
            valid = false;
        }

        return valid
    }
}
