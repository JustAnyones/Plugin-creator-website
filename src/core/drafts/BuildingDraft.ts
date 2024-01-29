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

import {NumberAttribute} from "../attribute/NumberAttribute";
import {LevelAttribute} from "../attribute/LevelAttribute";
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {StringAttribute} from "../attribute/StringAttribute";
import {DraftType} from "../DraftType";
import {BuildingDraftAttributes} from "./Interfaces";
import {BuildingBasedDraft} from "./BuildingBasedDraft";
import {FrameAttribute} from "../attribute/FrameAttribute";

export class BuildingDraft extends BuildingBasedDraft implements BuildingDraftAttributes {
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

    decoFrames = new FrameAttribute({
        owner: this, id: "deco frames",
        name: "Deco frames", description: "...",
        defaultValue: []
    })
    decoFramesWinter = new FrameAttribute({
        owner: this, id: "deco frames winter",
        name: "Deco winter frames", description: "...",
        defaultValue: []
    })

    waterBorderFrames = new FrameAttribute({
        owner: this, id: "water border frames",
        name: "Water border frames", description: "...",
        defaultValue: []
    })
    waterBorderFramesWinter = new FrameAttribute({
        owner: this, id: "water border frames winter",
        name: "Water border winter frames", description: "...",
        defaultValue: []
    })

    groundFrames = new FrameAttribute({
        owner: this, id: "ground frames",
        name: "Ground frames", description: "...",
        defaultValue: []
    })
    groundFramesWinter = new FrameAttribute({
        owner: this, id: "ground frames winter",
        name: "Ground winter frames", description: "...",
        defaultValue: []
    })

    randomFrame = new BooleanAttribute({
        owner: this, id: "random frame",
        name: "Random frame", description: "If true, a random frame will be used when building the building.",
        defaultValue: true
    })

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
    priceFactor = new NumberAttribute({
        owner: this, id: "price factor",
        name: "Price factor",
        description: "...",
        isInteger: false
    })

    waterWaste = new NumberAttribute({
        owner: this, id: "water waste",
        name: "Water waste",
        description: "How much waste water the building produces.",
        isInteger: false
    })
    drawGround = new BooleanAttribute({
        owner: this, id : "draw ground",
        name : "Draw ground", description : "Whether to draw ground underneath the building in place of transparency.",
        required : false, defaultValue : false}
    )
    rotationAware = new BooleanAttribute({
        owner: this, id : "rotation aware",
        name : "Rotation aware", description : "Whether the building is rotation aware. " +
        "If set to aware, you have to provide a multiple of 4 frames.",
        required : false, defaultValue : false
    })

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

    powerRadius = new NumberAttribute({
        owner: this, id: "power radius",
        name: "Power radius", description: "Radius of how far the power spreads from the building, if connected.",
        validation: {minValue: 0, maxValue: 1024}
    })

    idleBuildTime = new BooleanAttribute({
        owner: this, id: "idle build time",
        name: "Idle build time", description: "Whether this building can get build progress through idle time.",
        defaultValue: true
    })

    serviceCars = new NumberAttribute({
        owner: this, id: "service cars",
        name: "Service cars",
        description: "Amount of service cars that the building spawns."
    })

    rciCars = new NumberAttribute({
        owner: this, id: "rci cars",
        name: "RCI cars",
        description: "Amount of RCI cars that the building spawns. " +
            "By default, it's usually the amount of residents + workers in a building. " +
            "Used to estimate rci car spawning and targeting."
    })

    supportsSlope = new BooleanAttribute({
        owner: this, id: "supports slope",
        name: "Supports slope", description: "Whether the building can be placed on slopes."
    })
    supportsTerrain = new BooleanAttribute({
        owner: this, id: "supports terrain",
        name: "Supports terrain", description: "Whether the building supports terrain."
    })
    supportsShoreline = new BooleanAttribute({
        owner: this, id: "supports shoreline",
        name: "Supports shoreline", description: "Whether the building supports shoreline."
    })

    drawWaterBorders = new BooleanAttribute({
        owner: this, id : "draw water borders",
        name : "Draw water borders", description : "Whether to draw the water borders when near water.",
        required : false, defaultValue : null}
    )

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

    influencePreview = new BooleanAttribute({
        owner: this, id : "influence preview",
        name : "Influence preview", description : "Whether the show a preview of building influences in the build mode.",
        required : false, defaultValue : true
    })

    pedestrian = new StringAttribute({
        owner: this, id: "pedestrian",
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
