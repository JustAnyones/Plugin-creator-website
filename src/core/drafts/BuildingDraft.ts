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
import {DraftType} from "../DraftType";

export class BuildingDraft extends ViewportDraft {
    width = new NumberAttribute({
        owner: this, id: "width",
        name: "Width",
        description: "Tile width of the base of the building. Each tile has a pixel size of 32x16.",
        required: true,
        defaultValue: 1,
        validation: {minValue: 1, maxValue: 16}
    })
    height = new NumberAttribute({
        owner: this, id: "height",
        name: "Height",
        description: "Tile width of the base of the building. " +
            "Has to be the same as width, as only squared buildings are possible.",
        required: true,
        defaultValue: 1,
        validation: {minValue: 1, maxValue: 16}
    })


    // TODO: implement loadComposition(draft);
    // TODO: implement more of loadFrames(draft);


    needsRoad = new BooleanAttribute({
        owner: this, id : "needs road",
        name: "Needs road", description: "Whether the building needs a road connection to operate.",
        required: false, defaultValue: true
    })
    needsLand = new BooleanAttribute({
        owner: this, id: "needs land",
        name: "Needs land", description: "Whether the building needs to be on land to be built.",
        required: false, defaultValue: null
    })
    needsWater = new BooleanAttribute({
        owner: this, id: "needs water",
        name: "Needs water", description: "Whether the building needs to be on water to be built.",
        required: false, defaultValue: null
    })
    minWaterTiles: number
    level = new LevelAttribute({
        owner: this, id: "level",
        name: "Level",
        description: "Building wealth level. Only applicable for RCI buildings.",
        validation: {minValue: 1, maxValue: 3}
    })
    density = new NumberAttribute({
        owner: this, id: "density",
        name: "Density",
        description: "Used for expectation calculations, as more dense buildings usually have higher expectations. " +
            "By default the number of people in the building divided by the building's area.",
        isInteger: false,
        defaultValue: -1.0
    })
    buildHeight = new NumberAttribute({
        owner: this, id: "build height",
        name: "Build height",
        description: "The height of the building in 8px units. Should be used when frames are not provided. " +
            "Otherwise, game will calculate it on its own. " +
            "Used for auto build time calculation, collision checks, " +
            "clipping during drawing, helicopters and much more."
    })

    // TODO: add support for building animations
    //animation: boolean // draft.animation = src.optBoolean("animated", draft.animation); TODO: ???

    price = new NumberAttribute({
        owner: this, id: "price",
        name: "Price",
        description: "Price of the building in Theons.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    // TODO: add support for addPriceDrafts
    addPriceDrafts: Array<string> // draft.addPriceDrafts = loadDraftList(src, "add price", draft.id, draft.addPriceDrafts);
    monthlyPrice = new NumberAttribute({
        owner: this, id: "monthly price",
        name: "Monthly price",
        description: "Monthly price of the building in Theons.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })
    diamondPrice = new NumberAttribute({
        owner: this, id: "diamond price",
        name: "Diamond price",
        description: "Diamond price of the building. Note that on premium platforms you need to " +
            "specify normal price as well, since the game does not convert diamond price to Theon price. " +
            "Will be ignored in case the building was unlocked by a feature.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    budgetItem = new StringAttribute({
        owner: this, id : "budget item",
        name : "Budget item", description : "ID of the budget draft to put the building under in estate menu of the city."
    })
    bulldozePrice = new NumberAttribute({
        owner: this, id: "bulldoze price",
        name: "Bulldoze price",
        description: "Price to bulldoze the building.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })

    power = new NumberAttribute({
        owner: this, id: "power",
        name: "Power",
        description: "Amount of power used. Use negative values to produce power instead.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })
    water = new NumberAttribute({
        owner: this, id: "water",
        name: "Water",
        description: "Amount of water used. Use negative values to produce water instead.",
        validation: {minValue: -10_000_000, maxValue: 10_000_000}
    })

    // TODO: revisit when transport update hits, "capacity"
    destroyable = new BooleanAttribute({
        owner: this, id : "destroyable",
        name : "Destroyable", description : "Whether the building can be destroyed by disasters.",
        required : false, defaultValue : true
    })
    destroyableByFun = new BooleanAttribute({
        owner: this, id : "destroyable by fun",
        name : "Destroyable by fun", description : "Whether the building can be destroyed by fun.",
        required : false, defaultValue : true
    })
    destruction = new StringAttribute({
        owner: this, id : "destruction",
        name : "Destruction", description : "ID of the building that will be used to replace the destructed building. " +
        "Must be either 1x1 in which case it will fill up the area of the destructed building, " +
        "or match the size of the destructed building."
    })
    burnable = new BooleanAttribute({
        owner: this, id : "burnable",
        name : "Burnable", description : "Whether the building can be set on fire.",
        required : false, defaultValue : true}
    )
    useFireFrames = new BooleanAttribute({
        owner: this, id : "use fire frames",
        name : "Use fire frames", description : "Whether the building will draw the usual fire when burning. " +
        "Can be disabled to draw a custom fire animation.",
        required : false, defaultValue : true}
    )

    maxCount = new NumberAttribute({
        owner: this, id: "max count",
        name: "Max count",
        description: "Maximum amount of buildings that can exist on the city.",
        validation: {minValue: -1, maxValue: 10_000_000}}
    )
    priceFactor: number // float

    waterWaste: number // float
    drawGround = new BooleanAttribute({
        owner: this, id : "draw ground",
        name : "Draw ground", description : "Whether to draw ground underneath the building in place of transparency.",
        required : false, defaultValue : false}
    )
    frameAlignmentArea: boolean
    frameAlignment: boolean
    alignable: boolean
    rotationAware = new BooleanAttribute({
        owner: this, id : "rotation aware",
        name : "Rotation aware", description : "Whether the building is rotation aware. " +
        "If set to aware, you have to provide a multiple of 4 frames.",
        required : false, defaultValue : false
    })
    extRotationAware: boolean
    selectableFrames: boolean
    volatile: boolean

    useFence: Array<String>

    // TODO: "ships", "ship count", "ship radius"
    // TODO: "helicopter spawner"
    // TODO: "car spawner"
    // TODO: "spawn"

    explodes= new BooleanAttribute({
        owner: this, id : "explodes",
        name : "Explodes", description : "Whether the building explodes after being set on fire.",
        required : false, defaultValue : false
    })
    explosionRadius = new NumberAttribute({
        owner: this, id: "explosion radius",
        name: "Explosion radius", description: "Radius of the explosion.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    nuclear = new BooleanAttribute({
        owner: this, id : "nuclear",
        name : "Nuclear", description : "Whether the explosion of the building is nuclear.",
        required : false, defaultValue : false
    })

    disaster = new BooleanAttribute({
        owner: this, id : "disaster",
        name : "Disaster", description : "Whether to consider the existence of the building as a disaster. " +
        "Disaster halts city development until it's over.",
        required : false, defaultValue : true
    })
    removable = new BooleanAttribute({
        owner: this, id : "removable",
        name : "Removable", description : "Whether the building can be removed by the player.",
        required : false, defaultValue : true
    })

    //mapColor: Colour

    pickable = new BooleanAttribute({
        owner: this, id : "pickable",
        name : "Pickable", description : "Whether the building can be picked with the picker tool.",
        required : false, defaultValue : true
    })
    renameable = new BooleanAttribute({
        owner: this, id : "renameable",
        name : "Rename-able", description : "Whether the name of the building (title) can be changed by the player.",
        required : false, defaultValue : true
    })

    performance = new BooleanAttribute({
        owner: this, id : "performance",
        name : "Performance", description : "Whether the building uses performance.",
        required : false, defaultValue : false
    })

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
        owner: this, id: "rci cars",
        name: "RCI cars",
        description: "Amount of RCI cars that the building spawns. " +
            "By default, it's usually the amount of residents + workers in a building. " +
            "Used to estimate rci car spawning and targeting."
    })

    easyRemove: boolean
    supportsSlope = new BooleanAttribute({
        owner: this, id: "supports slope",
        name: "Supports slope", description: "Whether the building can be placed on slopes."
    })
    supportsTerrain: boolean
    supportsShoreline: boolean

    drawWaterBorders = new BooleanAttribute({
        owner: this, id : "draw water borders",
        name : "Draw water borders", description : "Whether to draw the water borders when near water.",
        required : false, defaultValue : null}
    )
    drawWaterGround: any // either a boolean or ID of the ground to draw

    movable = new BooleanAttribute({
        owner: this, id : "movable",
        name : "Movable", description : "Whether the building can be moved by the player.",
        required : false, defaultValue : true
    })

    zone = new StringAttribute({
        owner: this, id : "zone",
        name : "Zone", description : "Draft ID of a zone this draft belongs to. " +
        "Game will place the specified zone underneath the building."
    })
    buildZone = new BooleanAttribute({
        owner: this, id : "build zone",
        name : "Build zone", description : "Whether to build the zone under the building, if available.",
        required : false, defaultValue : true
    })

    conductive = new BooleanAttribute({
        owner: this, id : "conductive",
        name : "Conductive", description : "Whether the building can conduct power."
    })
    superConductive = new BooleanAttribute({
        owner: this, id : "super conductive",
        name : "Super conductive", description : "Whether the building can connect to regular and high voltage power lines."},
    )
    highVoltageOnly = new BooleanAttribute({
        owner: this, id : "high voltage only",
        name : "High voltage only", description : "Whether the building can only connect to high voltage power lines."
    })
    liquid = new BooleanAttribute({
        owner: this, id : "liquid",
        name : "Liquid", description : "Whether the building conducts water like a pipe.",
        required : false, defaultValue : false
    })

    drawZone = new BooleanAttribute({
        owner: this, id : "draw zone",
        name : "Draw zone", description : "Whether to draw the zone under the building.",
        required : false, defaultValue : false
    })

    people = new NumberAttribute({
        owner: this, id: "people",
        name: "People",
        description: "Amount of inhabitants or workers the building has. " +
            "Only applies for RCI buildings."
    })

    autoBuild = new BooleanAttribute({
        owner: this, id : "auto build",
        name : "Auto build", description : "Whether the building can be auto built by the game.",
        required : false, defaultValue : null
    })
    autoBuildFactor = new NumberAttribute({
        owner: this, id: "auto build factor",
        name: "Auto build factor",
        description: "The auto build factor can be used to tweak the auto spawn rate of the building. " +
            "Higher values will cause the building to be built more likely.",
        isInteger: false,
        defaultValue: 1.0
    })
    rebuild: boolean

    buildTime= new NumberAttribute({
        owner: this, id: "build time",
        name: "Build time",
        description: "Build time of the building. Can be left blank for game to calculate itself. " +
            "Value of 0 will let building finish instantly.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
    influencePreview = new BooleanAttribute({
        owner: this, id : "influence preview",
        name : "Influence preview", description : "Whether the show a preview of building influences in the build mode.",
        required : false, defaultValue : true
    })

    // Visible Influences
    pollutionInfluence = new InfluenceAttribute({
        owner: this,  id : "influence pollution",
        name : "Influence pollution", description : "...",
        required : false, defaultValue : null, isPositive : false
    })
    noiseInfluence = new InfluenceAttribute({
        owner: this, id : "influence noise",
        name : "Influence noise", description : "...",
        required : false, defaultValue : null, isPositive : false
    })
    healthInfluence= new InfluenceAttribute({
        owner: this, id : "influence health",
        name : "Influence health", description : "..."
    })
    policeInfluence= new InfluenceAttribute({
        owner: this, id : "influence police",
        name : "Influence police", description : "..."
    })
    fireDepartmentInfluence = new InfluenceAttribute({
        owner: this, id : "influence fire department",
        name : "Influence fire department", description : "..."
    })
    parkInfluence= new InfluenceAttribute({
        owner: this, id : "influence park",
        name : "Influence park", description : "..."
    })
    sportInfluence= new InfluenceAttribute({
        owner: this, id : "influence sport",
        name : "Influence sport", description : "..."
    })
    educationLowInfluence= new InfluenceAttribute({
        owner: this, id : "influence education low",
        name : "Influence education low", description : "..."
    })
    educationHighInfluence= new InfluenceAttribute({
        owner: this, id : "influence education high",
        name : "Influence education high", description : "..."
    })
    cultureInfluence = new InfluenceAttribute({
        owner: this, id : "influence culture",
        name : "Influence culture", description : "..."
    })
    managementInfluence= new InfluenceAttribute({
        owner: this, id : "influence management",
        name : "Influence management", description : "..."
    })
    religionInfluence= new InfluenceAttribute({
        owner: this, id : "influence religion",
        name : "Influence religion", description : "..."
    })
    passengerBusInfluence= new InfluenceAttribute({
        owner: this, id : "influence passenger bus",
        name : "Influence passenger bus", description : "..."
    })
    passengerTrainInfluence= new InfluenceAttribute({
        owner: this, id : "influence passenger train",
        name : "Influence passenger train", description : "..."
    })
    radioactivityInfluence= new InfluenceAttribute({
        owner: this, id : "influence radioactive",
        name : "Influence radioactive", description : "...",
        required : false, defaultValue : null, isPositive : false
    })
    natureInfluence= new InfluenceAttribute({
        owner: this, id : "influence nature",
        name : "Influence nature", description : "..."
    })
    wasteDisposalInfluence= new InfluenceAttribute({
        owner: this, id : "influence waste disposal",
        name : "Influence waste disposal", description : "..."
    })
    bodyDisposalInfluence= new InfluenceAttribute({
        owner: this, id : "influence body disposal",
        name : "Influence body disposal", description : "..."
    })
    trafficInfluence= new InfluenceAttribute({
        owner: this, id : "influence traffic",
        name : "Influence traffic", description : "...",
        required : false, defaultValue : null, isPositive : false
    })


    // TODO: loadUpgrades



    // Aspects
    provideAspectEducationLow = new NumberAttribute({
        owner: this, id: "provide aspect education low",
        name: "Provide aspect education low",
        description: "The capacity of low education students the building can support."
    })
    provideAspectEducationHigh = new NumberAttribute({
        owner: this, id: "provide aspect education high",
        name: "Provide aspect education high",
        description: "The capacity of high education students the building can support."
    })
    provideAspectHealthCare = new NumberAttribute({
        owner: this, id: "provide aspect health care",
        name: "Provide aspect health care",
        description: "The capacity of health care receiving citizens the building can support."
    })
    provideAspectWasteDisposal = new NumberAttribute({
        owner: this, id: "provide aspect waste disposal",
        name: "Provide aspect waste disposal",
        description: "..."
    })
    provideAspectBodyDisposal = new NumberAttribute({
        owner: this, id: "provide aspect body disposal",
        name: "Provide aspect body disposal",
        description: "..."
    })

    // Aspect capacities
    aspectEducationLowCapacity = new NumberAttribute({
        owner: this, id: "aspect education low capacity",
        name: "Aspect education low capacity",
        description: "..."
    })
    aspectEducationHighCapacity = new NumberAttribute({
        owner: this, id: "aspect education high capacity",
        name: "Aspect education high capacity",
        description: "..."
    })
    aspectHealthCareCapacity = new NumberAttribute({
        owner: this, id: "aspect health care capacity",
        name: "Aspect health care capacity",
        description: "..."
    })
    aspectWasteDisposalCapacity = new NumberAttribute({
        owner: this, id: "aspect waste disposal capacity",
        name: "Aspect waste disposal capacity",
        description: "..."
    })
    aspectBodyDisposalCapacity = new NumberAttribute({
        owner: this, id: "aspect body disposal capacity",
        name: "Aspect body disposal capacity",
        description: "..."
    })


    pedestrian = new StringAttribute({
        owner: this, id : "pedestrian",
        name : "Pedestrian", description : "ID of Pedestrian draft to spawn from this building."
    })
    pedestrianCount = new NumberAttribute({
        owner: this, id: "pedestrian count",
        name: "Pedestrian count",
        description: "Amount of pedestrians to spawn from this building.",
        defaultValue: 0
    })
    constructor(type: DraftType) {
        super(type)

        this.width.required = true;
        this.height.required = true;

        if (this.type.isRCI()) {
            this.level.required = true;
        }
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
