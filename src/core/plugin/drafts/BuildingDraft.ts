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

import {NumberAttribute} from "../../attribute/NumberAttribute";
import {LevelAttribute} from "../../attribute/LevelAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {StringAttribute} from "../../attribute/StringAttribute";
import {DraftType} from "../../DraftType";
import {BuildingBasedAttributes, BuildingBasedDraft} from "./BuildingBasedDraft";
import {Plugin} from "../Plugin";
import {UpgradeDraft, UpgradeDraftFactory} from "./UpgradeDraft";
import {ListAttribute} from "../../attribute/ListAttribute";
import {Frame, FrameFactory} from "../objects/Frame";

interface IBuildingAnimationFg {
    //TODO: animationFg // loadAnimations
    //TODO: frameAnimationFgIndices // loadFrameAnimationIndices
}

interface SupportsExtendedBuildingFrames {
    decoFrames: ListAttribute<Frame>
    decoFramesWinter: ListAttribute<Frame>
    randomFrame: BooleanAttribute
    groundFrames: ListAttribute<Frame>
    groundFramesWinter: ListAttribute<Frame>
    waterBorderFrames: ListAttribute<Frame>
    waterBorderFramesWinter: ListAttribute<Frame>
    //TODO: groundTiles
}

export interface BuildingDraftAttributes extends
    BuildingBasedAttributes,
    IBuildingAnimationFg,
    SupportsExtendedBuildingFrames
{
    width: NumberAttribute
    height: NumberAttribute
    // TODO: loadComposition
    needsRoad: BooleanAttribute
    needsLand: BooleanAttribute
    needsWater: BooleanAttribute
    //TODO: minWaterTiles: NumberAttribute
    level: NumberAttribute
    density: NumberAttribute
    buildHeight: NumberAttribute
    // "animated" will not be supported as it's an old tag
    //TODO: addPriceDrafts
    budgetItem: StringAttribute
    bulldozePrice: NumberAttribute
    //TODO: capacity: NumberAttribute
    destroyable: BooleanAttribute
    destroyableByFun: BooleanAttribute
    destruction: StringAttribute
    burnable: BooleanAttribute
    useFireFrames: BooleanAttribute
    maxCount: NumberAttribute
    priceFactor: NumberAttribute
    waterWaste: NumberAttribute
    drawGround: BooleanAttribute
    //TODO: frameAlignmentArea: BooleanAttribute
    //TODO: frameAlignment: BooleanAttribute
    //TODO: alignable: BooleanAttribute
    rotationAware: BooleanAttribute
    //TODO: extRotationAware: BooleanAttribute
    //TODO: selectableFrames: BooleanAttribute
    //TODO: volatile: BooleanAttribute
    //TODO: useFence
    //TODO: ships
    //TODO: helicopterSpawner
    //TODO: biome
    explodes: BooleanAttribute
    explosionRadius: NumberAttribute
    nuclear: BooleanAttribute
    disaster: BooleanAttribute
    removable: BooleanAttribute
    //TODO: mapColor
    pickable: BooleanAttribute
    renameable: BooleanAttribute
    performance: BooleanAttribute
    powerRadius: NumberAttribute
    idleBuildTime: BooleanAttribute
    //TODO: randomizeAnimation: BooleanAttribute
    //TODO: randomizeLights: BooleanAttribute
    // TODO: loadFun()
    // TODO: loadSmoke()
    //buildTimeFactor: NumberAttribute
    //freeBuildTimeSkip: BooleanAttribute
    serviceCars: NumberAttribute
    //TODO: serviceCarTags
    // TODO: loadRoadFlags("road flags")
    //TODO: nightLightProbability: NumberAttribute
    rciCars: NumberAttribute
    //easyRemove: BooleanAttribute
    supportsSlope: BooleanAttribute
    supportsTerrain: BooleanAttribute
    supportsShoreline: BooleanAttribute
    drawWaterBorders: BooleanAttribute
    //TODO: drawWaterGround // boolean or string
    movable: BooleanAttribute
    zone: StringAttribute
    buildZone: BooleanAttribute
    conductive: BooleanAttribute
    superConductive: BooleanAttribute
    highVoltageOnly: BooleanAttribute
    liquid: BooleanAttribute
    drawZone: BooleanAttribute
    people: NumberAttribute
    autoBuild: BooleanAttribute
    autoBuildFactor: NumberAttribute
    //TODO: rebuild: BooleanAttribute
    influencePreview: BooleanAttribute
    upgrades: ListAttribute<UpgradeDraft>
    pedestrian: StringAttribute
    pedestrianCount: NumberAttribute
}

export class BuildingDraft extends BuildingBasedDraft implements BuildingDraftAttributes {

    width: NumberAttribute
    height: NumberAttribute

    decoFrames: ListAttribute<Frame>
    decoFramesWinter: ListAttribute<Frame>
    randomFrame: BooleanAttribute
    groundFrames: ListAttribute<Frame>
    groundFramesWinter: ListAttribute<Frame>
    waterBorderFrames: ListAttribute<Frame>
    waterBorderFramesWinter: ListAttribute<Frame>

    needsRoad: BooleanAttribute
    needsLand: BooleanAttribute
    needsWater: BooleanAttribute
    level: NumberAttribute
    density: NumberAttribute
    buildHeight: NumberAttribute
    budgetItem: StringAttribute
    bulldozePrice: NumberAttribute
    destroyable: BooleanAttribute
    destroyableByFun: BooleanAttribute
    destruction: StringAttribute
    burnable: BooleanAttribute
    useFireFrames: BooleanAttribute
    maxCount: NumberAttribute
    priceFactor: NumberAttribute
    waterWaste: NumberAttribute
    drawGround: BooleanAttribute
    rotationAware: BooleanAttribute
    explodes: BooleanAttribute
    explosionRadius: NumberAttribute
    nuclear: BooleanAttribute
    disaster: BooleanAttribute
    removable: BooleanAttribute
    pickable: BooleanAttribute
    renameable: BooleanAttribute
    performance: BooleanAttribute
    powerRadius: NumberAttribute
    idleBuildTime: BooleanAttribute
    serviceCars: NumberAttribute
    rciCars: NumberAttribute
    supportsSlope: BooleanAttribute
    supportsTerrain: BooleanAttribute
    supportsShoreline: BooleanAttribute
    drawWaterBorders: BooleanAttribute
    movable: BooleanAttribute
    zone: StringAttribute
    buildZone: BooleanAttribute
    conductive: BooleanAttribute
    superConductive: BooleanAttribute
    highVoltageOnly: BooleanAttribute
    liquid: BooleanAttribute
    drawZone: BooleanAttribute
    people: NumberAttribute
    autoBuild: BooleanAttribute
    autoBuildFactor: NumberAttribute
    influencePreview: BooleanAttribute
    upgrades: ListAttribute<UpgradeDraft>
    pedestrian: StringAttribute
    pedestrianCount: NumberAttribute

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.width = new NumberAttribute({
            plugin: this.plugin, id: "width",
            name: "Width",
            description: "Tile width of the base of the building. Each tile has a pixel size of 32x16.",
            required: true,
            defaultValue: 1,
            validation: {minValue: 1, maxValue: 16}
        })

        this.height = new NumberAttribute({
            plugin: this.plugin, id: "height",
            name: "Height",
            description: "Tile width of the base of the building. " +
                "Has to be the same as width, as only squared buildings are possible.",
            required: true,
            defaultValue: 1,
            validation: {minValue: 1, maxValue: 16},
            customValidator: () => {
                if (this.width.value != this.height.value) {
                    this.height.addError("Width and height must be the same.")
                }
            }
        })


        this.decoFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "deco frames",
            name: "Deco frames", description: "...",
            factory: new FrameFactory()
        })
        this.decoFramesWinter = new ListAttribute<Frame>({
            plugin: this.plugin, id: "deco frames winter",
            name: "Deco winter frames", description: "...",
            factory: new FrameFactory()
        })

        this.waterBorderFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "water border frames",
            name: "Water border frames", description: "...",
            factory: new FrameFactory()
        })
        this.waterBorderFramesWinter = new ListAttribute<Frame>({
            plugin: this.plugin, id: "water border frames winter",
            name: "Water border winter frames", description: "...",
            factory: new FrameFactory()
        })

        this.groundFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "ground frames",
            name: "Ground frames", description: "...",
            factory: new FrameFactory()
        })
        this.groundFramesWinter = new ListAttribute<Frame>({
            plugin: this.plugin, id: "ground frames winter",
            name: "Ground winter frames", description: "...",
            factory: new FrameFactory()
        })

        this.randomFrame = new BooleanAttribute({
            plugin: this.plugin, id: "random frame",
            name: "Random frame", description: "If true, a random frame will be used when building the building.",
            defaultValue: true
        })

        this.needsRoad = new BooleanAttribute({
            plugin: this.plugin, id : "needs road",
            name: "Needs road", description: "Whether the building needs a road connection to operate.",
            required: false, defaultValue: true
        })
        this.needsLand = new BooleanAttribute({
            plugin: this.plugin, id: "needs land",
            name: "Needs land", description: "Whether the building needs to be on land to be built.",
            required: false, defaultValue: null
        })
        this.needsWater = new BooleanAttribute({
            plugin: this.plugin, id: "needs water",
            name: "Needs water", description: "Whether the building needs to be on water to be built.",
            required: false, defaultValue: null
        })
        this.level = new LevelAttribute({
            plugin: this.plugin, id: "level",
            name: "Level",
            description: "Building wealth level. Only applicable for RCI buildings.",
            validation: {minValue: 1, maxValue: 3}
        })
        this.density = new NumberAttribute({
            plugin: this.plugin, id: "density",
            name: "Density",
            description: "Used for expectation calculations, as more dense buildings usually have higher expectations. " +
                "By default the number of people in the building divided by the building's area.",
            isInteger: false,
            defaultValue: -1.0
        })
        this.buildHeight = new NumberAttribute({
            plugin: this.plugin, id: "build height",
            name: "Build height",
            description: "The height of the building in 8px units. Should be used when frames are not provided. " +
                "Otherwise, game will calculate it on its own. " +
                "Used for auto build time calculation, collision checks, " +
                "clipping during drawing, helicopters and much more."
        })

        this.budgetItem = new StringAttribute({
            plugin: this.plugin, id : "budget item",
            name : "Budget item", description : "ID of the budget draft to put the building under in estate menu of the city."
        })
        this.bulldozePrice = new NumberAttribute({
            plugin: this.plugin, id: "bulldoze price",
            name: "Bulldoze price",
            description: "Price to bulldoze the building.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })

        this.destroyable = new BooleanAttribute({
            plugin: this.plugin, id : "destroyable",
            name : "Destroyable", description : "Whether the building can be destroyed by disasters.",
            required : false, defaultValue : true
        })
        this.destroyableByFun = new BooleanAttribute({
            plugin: this.plugin, id : "destroyable by fun",
            name : "Destroyable by fun", description : "Whether the building can be destroyed by fun.",
            required : false, defaultValue : true
        })
        this.destruction = new StringAttribute({
            plugin: this.plugin, id : "destruction",
            name : "Destruction", description : "ID of the building that will be used to replace the destructed building. " +
                "Must be either 1x1 in which case it will fill up the area of the destructed building, " +
                "or match the size of the destructed building."
        })
        this.burnable = new BooleanAttribute({
            plugin: this.plugin, id : "burnable",
            name : "Burnable", description : "Whether the building can be set on fire.",
            required : false, defaultValue : true}
        )
        this.useFireFrames = new BooleanAttribute({
            plugin: this.plugin, id : "use fire frames",
            name : "Use fire frames", description : "Whether the building will draw the usual fire when burning. " +
                "Can be disabled to draw a custom fire animation.",
            required : false, defaultValue : true}
        )

        this.maxCount = new NumberAttribute({
            plugin: this.plugin, id: "max count",
            name: "Max count",
            description: "Maximum amount of buildings that can exist on the city.",
            validation: {minValue: -1, maxValue: 10_000_000}}
        )
        this.priceFactor = new NumberAttribute({
            plugin: this.plugin, id: "price factor",
            name: "Price factor",
            description: "...",
            isInteger: false
        })

        this.waterWaste = new NumberAttribute({
            plugin: this.plugin, id: "water waste",
            name: "Water waste",
            description: "How much waste water the building produces.",
            isInteger: false
        })
        this.drawGround = new BooleanAttribute({
            plugin: this.plugin, id : "draw ground",
            name : "Draw ground", description : "Whether to draw ground underneath the building in place of transparency.",
            required : false, defaultValue : false}
        )
        this.rotationAware = new BooleanAttribute({
            plugin: this.plugin, id : "rotation aware",
            name : "Rotation aware", description : "Whether the building is rotation aware. " +
                "If set to aware, you have to provide a multiple of 4 frames.",
            required : false, defaultValue : false,
            customValidator: () => {
                if (this.rotationAware.value === true && this.frames.value.length % 4 != 0) {
                    this.frames.addError("Rotation aware requires you to specify a multiple of 4 frames.")
                }
            }
        })

        this.explodes = new BooleanAttribute({
            plugin: this.plugin, id : "explodes",
            name : "Explodes", description : "Whether the building explodes after being set on fire.",
            required : false, defaultValue : false
        })
        this.explosionRadius = new NumberAttribute({
            plugin: this.plugin, id: "explosion radius",
            name: "Explosion radius", description: "Radius of the explosion.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })
        this.nuclear = new BooleanAttribute({
            plugin: this.plugin, id : "nuclear",
            name : "Nuclear", description : "Whether the explosion of the building is nuclear.",
            required : false, defaultValue : false
        })

        this.disaster = new BooleanAttribute({
            plugin: this.plugin, id : "disaster",
            name : "Disaster", description : "Whether to consider the existence of the building as a disaster. " +
                "Disaster halts city development until it's over.",
            required : false, defaultValue : true
        })
        this.removable = new BooleanAttribute({
            plugin: this.plugin, id : "removable",
            name : "Removable", description : "Whether the building can be removed by the player.",
            required : false, defaultValue : true
        })

        this.pickable = new BooleanAttribute({
            plugin: this.plugin, id : "pickable",
            name : "Pickable", description : "Whether the building can be picked with the picker tool.",
            required : false, defaultValue : true
        })
        this.renameable = new BooleanAttribute({
            plugin: this.plugin, id : "renameable",
            name : "Rename-able", description : "Whether the name of the building (title) can be changed by the player.",
            required : false, defaultValue : true
        })

        this.performance = new BooleanAttribute({
            plugin: this.plugin, id : "performance",
            name : "Performance", description : "Whether the building uses performance.",
            required : false, defaultValue : false
        })

        this.powerRadius = new NumberAttribute({
            plugin: this.plugin, id: "power radius",
            name: "Power radius", description: "Radius of how far the power spreads from the building, if connected.",
            validation: {minValue: 0, maxValue: 1024}
        })

        this.idleBuildTime = new BooleanAttribute({
            plugin: this.plugin, id: "idle build time",
            name: "Idle build time", description: "Whether this building can get build progress through idle time.",
            defaultValue: true
        })

        this.serviceCars = new NumberAttribute({
            plugin: this.plugin, id: "service cars",
            name: "Service cars",
            description: "Amount of service cars that the building spawns."
        })

        this.rciCars = new NumberAttribute({
            plugin: this.plugin, id: "rci cars",
            name: "RCI cars",
            description: "Amount of RCI cars that the building spawns. " +
                "By default, it's usually the amount of residents + workers in a building. " +
                "Used to estimate rci car spawning and targeting."
        })

        this.supportsSlope = new BooleanAttribute({
            plugin: this.plugin, id: "supports slope",
            name: "Supports slope", description: "Whether the building can be placed on slopes."
        })
        this.supportsTerrain = new BooleanAttribute({
            plugin: this.plugin, id: "supports terrain",
            name: "Supports terrain", description: "Whether the building supports terrain."
        })
        this.supportsShoreline = new BooleanAttribute({
            plugin: this.plugin, id: "supports shoreline",
            name: "Supports shoreline", description: "Whether the building supports shoreline."
        })

        this.drawWaterBorders = new BooleanAttribute({
            plugin: this.plugin, id : "draw water borders",
            name : "Draw water borders", description : "Whether to draw the water borders when near water.",
            required : false, defaultValue : null}
        )

        this.movable = new BooleanAttribute({
            plugin: this.plugin, id : "movable",
            name : "Movable", description : "Whether the building can be moved by the player.",
            required : false, defaultValue : true
        })

        this.zone = new StringAttribute({
            plugin: this.plugin, id : "zone",
            name : "Zone", description : "Draft ID of a zone this draft belongs to. " +
                "Game will place the specified zone underneath the building."
        })
        this.buildZone = new BooleanAttribute({
            plugin: this.plugin, id : "build zone",
            name : "Build zone", description : "Whether to build the zone under the building, if available.",
            required : false, defaultValue : true
        })

        this.conductive = new BooleanAttribute({
            plugin: this.plugin, id : "conductive",
            name : "Conductive", description : "Whether the building can conduct power."
        })
        this.superConductive = new BooleanAttribute({
            plugin: this.plugin, id : "super conductive",
            name : "Super conductive", description : "Whether the building can connect to regular and high voltage power lines."},
        )
        this.highVoltageOnly = new BooleanAttribute({
            plugin: this.plugin, id : "high voltage only",
            name : "High voltage only", description : "Whether the building can only connect to high voltage power lines."
        })
        this.liquid = new BooleanAttribute({
            plugin: this.plugin, id : "liquid",
            name : "Liquid", description : "Whether the building conducts water like a pipe.",
            required : false, defaultValue : false
        })

        this.drawZone = new BooleanAttribute({
            plugin: this.plugin, id : "draw zone",
            name : "Draw zone", description : "Whether to draw the zone under the building.",
            required : false, defaultValue : false
        })

        this.people = new NumberAttribute({
            plugin: this.plugin, id: "people",
            name: "People",
            description: "Amount of inhabitants or workers the building has. " +
                "Only applies for RCI buildings."
        })

        this.autoBuild = new BooleanAttribute({
            plugin: this.plugin, id : "auto build",
            name : "Auto build", description : "Whether the building can be auto built by the game.",
            required : false, defaultValue : null
        })
        this.autoBuildFactor = new NumberAttribute({
            plugin: this.plugin, id: "auto build factor",
            name: "Auto build factor",
            description: "The auto build factor can be used to tweak the auto spawn rate of the building. " +
                "Higher values will cause the building to be built more likely.",
            isInteger: false,
            defaultValue: 1.0
        })

        this.influencePreview = new BooleanAttribute({
            plugin: this.plugin, id : "influence preview",
            name : "Influence preview", description : "Whether the show a preview of building influences in the build mode.",
            required : false, defaultValue : true
        })

        this.pedestrian = new StringAttribute({
            plugin: this.plugin, id: "pedestrian",
            name : "Pedestrian", description : "ID of Pedestrian draft to spawn from this building."
        })
        this.pedestrianCount = new NumberAttribute({
            plugin: this.plugin, id: "pedestrian count",
            name: "Pedestrian count",
            description: "Amount of pedestrians to spawn from this building.",
            defaultValue: 0
        })

        this.upgrades = new ListAttribute<UpgradeDraft>({
            plugin: this.plugin, id: "upgrades",
            name: "Upgrades", description: "Defines the upgrades that the building has.",
            factory: new UpgradeDraftFactory()
        });

        this.width.required = true;
        this.height.required = true;

        if (this.type.isRCI()) {
            this.level.required = true;
        }
    }
}
