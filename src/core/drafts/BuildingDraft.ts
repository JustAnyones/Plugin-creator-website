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
import {DraftType} from "../Types";

export class BuildingDraft extends ViewportDraft {
    width = new NumberAttribute({
        id: "width",
        name: "Width",
        description: "Tile width of the base of the building. Each tile has a pixel size of 32x16.",
        required: true,
        defaultValue: 1,
        validation: {minValue: 1, maxValue: 16}
    })
    height = new NumberAttribute({
        id: "height",
        name: "Height",
        description: "Tile width of the base of the building. " +
            "Has to be the same as width, as only squared buildings are possible.",
        required: true,
        defaultValue: 1,
        validation: {minValue: 1, maxValue: 16}
    })


    // TODO: implement loadComposition(draft);
    // TODO: implement more of loadFrames(draft);


    needsRoad = new BooleanAttribute(
        "needs road", "Needs road",
        "Whether the building needs a road connection to operate.",
        false, true
    )
    needsLand = new BooleanAttribute(
        "needs land", "Needs land",
        "Whether the building needs to be on land to be built.",
        false, null
    )
    needsWater = new BooleanAttribute(
        "needs water", "Needs water",
        "Whether the building needs to be on water to be built.",
        false, null
    )
    minWaterTiles: number
    level = new LevelAttribute({
        id: "level",
        name: "Level",
        description: "Building wealth level. Only applicable for RCI buildings.",
        validation: {minValue: 1, maxValue: 3}
    })
    density: number // float
    buildHeight = new NumberAttribute({
        id: "build height",
        name: "Build height",
        description: "The height of the building in 8px units. Should be used when frames are not provided. " +
            "Otherwise, game will calculate it on its own. " +
            "Used for auto build time calculation, collision checks, " +
            "clipping during drawing, helicopters and much more."
    })

    //animation: boolean // draft.animation = src.optBoolean("animated", draft.animation); TODO: ???

    price = new NumberAttribute({
        id: "price",
        name: "Price",
        description: "Price of the building in Theons.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    addPriceDrafts: Array<string> // draft.addPriceDrafts = loadDraftList(src, "add price", draft.id, draft.addPriceDrafts);
    monthlyPrice = new NumberAttribute({
        id: "monthly price",
        name: "Monthly price",
        description: "Monthly price of the building in Theons.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })
    diamondPrice = new NumberAttribute({
        id: "diamond price",
        name: "Diamond price",
        description: "Diamond price of the building. Note that on premium platforms you need to " +
            "specify normal price as well, since the game does not convert diamond price to Theon price.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    budgetItem = new StringAttribute(
        "budget item", "Budget item",
        "ID of the budget draft to put the building under in estate menu of the city."
    )
    bulldozePrice = new NumberAttribute({
        id: "bulldoze price",
        name: "Bulldoze price",
        description: "Price to bulldoze the building.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })

    power = new NumberAttribute({
        id: "power",
        name: "Power",
        description: "Amount of power used. Use negative values to produce power instead.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })
    water = new NumberAttribute({
        id: "water",
        name: "Water",
        description: "Amount of water used. Use negative values to produce water instead.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })

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
    useFireFrames = new BooleanAttribute(
        "use fire frames",
        "Use fire frames",
        "Whether the building will draw the usual fire when burning. " +
        "Can be disabled to draw a custom fire animation.",
        false, true
    )

    maxCount = new NumberAttribute({
        id: "max count",
        name: "Max count",
        description: "Maximum amount of buildings that can exist on the city.",
        validation: {minValue: -1, maxValue: 10_000_000}}
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
    explosionRadius = new NumberAttribute({
        id: "explosion radius",
        name: "Explosion radius",
        description: "Radius of the explosion.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
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

    rciCars = new NumberAttribute({
        id: "rci cars",
        name: "RCI cars",
        description: "Amount of RCI cars that the building spawns. " +
            "By default, it's usually the amount of residents + workers in a building. " +
            "Used to estimate rci car spawning and targeting."
    })

    easyRemove: boolean
    supportsSlope: boolean
    supportsTerrain: boolean
    supportsShoreline: boolean

    drawWaterBorders = new BooleanAttribute(
        "draw water borders", "Draw water borders",
        "Whether to draw the water borders when near water.",
        false, null
    )
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

    conductive = new BooleanAttribute(
        "conductive",
        "Conductive",
        "Whether the building can conduct power.",
    )
    superConductive = new BooleanAttribute(
        "super conductive",
        "Super conductive",
        "Whether the building can connect to regular and high voltage power lines.",
    )
    highVoltageOnly = new BooleanAttribute(
        "high voltage only",
        "High voltage only",
        "Whether the building can only connect to high voltage power lines.",
    )
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

    people = new NumberAttribute({
        id: "people",
        name: "People",
        description: "Amount of inhabitants or workers the building has. " +
            "Only applies for RCI buildings."
    })

    autoBuild = new BooleanAttribute(
        "auto build", "Auto build",
        "Whether the building can be auto built by the game.",
        false, null
    )
    autoBuildFactor = new NumberAttribute({
        id: "auto build factor",
        name: "Auto build factor",
        description: "The auto build factor can be used to tweak the auto spawn rate of the building. " +
            "Higher values will cause the building to be built more likely.",
        isInteger: false,
        defaultValue: 1.0
    })
    rebuild: boolean

    buildTime= new NumberAttribute({
        id: "build time",
        name: "Build time",
        description: "Build time of the building. Can be left blank for game to calculate itself. " +
            "Value of 0 will let building finish instantly.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
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
    provideAspectEducationLow = new NumberAttribute({
        id: "provide aspect education low",
        name: "Provide aspect education low",
        description: "..."
    })
    provideAspectEducationHigh = new NumberAttribute({
        id: "provide aspect education high",
        name: "Provide aspect education high",
        description: "..."
    })
    provideAspectHealthCare = new NumberAttribute({
        id: "provide aspect health care",
        name: "Provide aspect health care",
        description: "..."
    })
    provideAspectWasteDisposal = new NumberAttribute({
        id: "provide aspect waste disposal",
        name: "Provide aspect waste disposal",
        description: "..."
    })
    provideAspectBodyDisposal = new NumberAttribute({
        id: "provide aspect body disposal",
        name: "Provide aspect body disposal",
        description: "..."
    })

    // Aspect capacities
    aspectEducationLowCapacity = new NumberAttribute({
        id: "aspect education low capacity",
        name: "Aspect education low capacity",
        description: "..."
    })
    aspectEducationHighCapacity = new NumberAttribute({
        id: "aspect education high capacity",
        name: "Aspect education high capacity",
        description: "..."
    })
    aspectHealthCareCapacity = new NumberAttribute({
        id: "aspect health care capacity",
        name: "Aspect health care capacity",
        description: "..."
    })
    aspectWasteDisposalCapacity = new NumberAttribute({
        id: "aspect waste disposal capacity",
        name: "Aspect waste disposal capacity",
        description: "..."
    })
    aspectBodyDisposalCapacity = new NumberAttribute({
        id: "aspect body disposal capacity",
        name: "Aspect body disposal capacity",
        description: "..."
    })


    pedestrian = new StringAttribute(
        "pedestrian", "Pedestrian",
        "ID of Pedestrian draft to spawn from this building."
    )
    pedestrianCount = new NumberAttribute({
        id: "pedestrian count",
        name: "Pedestrian count",
        description: "Amount of pedestrians to spawn from this building.",
        defaultValue: 0
    })

    constructor(type: DraftType) {
        super(type)

        this.width.required = true;
        this.height.required = true;
    }

    validate(): boolean {
        let valid = super.validate()

        if (this.frames.value.length == 0) {
            this.frames.addError("Please choose at least a single frame.")
            valid = false;
        }

        if (this.rotationAware.value === true && this.frames.value.length % 4 != 0) {
            this.frames.addError("Rotation aware requires you to specify a multiple of 4 frames.")
            valid = false;
        }

        if (this.width.value != this.height.value) {
            this.height.addError("Width and height must be the same.")
            valid = false;
        }

        return valid
    }
}
