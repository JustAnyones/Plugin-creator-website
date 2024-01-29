/*
 * MIT License
 *
 * Copyright (c) 2024 JustAnyone
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

import {FrameAttribute} from "../attribute/FrameAttribute";
import {StringAttribute} from "../attribute/StringAttribute";
import {BooleanAttribute} from "../attribute/BooleanAttribute";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {InfluenceAttribute} from "../attribute/InfluenceAttribute";
import {DraftType} from "../DraftType";

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
    previewFrames: FrameAttribute
    iconFrames: FrameAttribute
    showNewMarker: BooleanAttribute
    searchable: BooleanAttribute
    category: StringAttribute
    categoryFrom: StringAttribute
    // TODO: aliases
    // TODO: requirements
    // TODO: scripts
}

export interface ViewportDraftAttributes extends DefaultAttributes {
    frames: FrameAttribute
}

interface SupportsAnimation {
    //TODO: animation // loadAnimations
    //TODO: frameAnimationIndices // loadFrameAnimationIndices
}

interface IBuildingAnimationFg {
    //TODO: animationFg // loadAnimations
    //TODO: frameAnimationFgIndices // loadFrameAnimationIndices
}

interface SupportsInfluences {
    // Visible Influences
    pollutionInfluence: InfluenceAttribute
    noiseInfluence: InfluenceAttribute
    healthInfluence: InfluenceAttribute
    policeInfluence: InfluenceAttribute
    fireDepartmentInfluence: InfluenceAttribute
    parkInfluence: InfluenceAttribute
    sportInfluence: InfluenceAttribute
    educationLowInfluence: InfluenceAttribute
    educationHighInfluence: InfluenceAttribute
    cultureInfluence: InfluenceAttribute
    managementInfluence: InfluenceAttribute
    religionInfluence: InfluenceAttribute
    passengerBusInfluence: InfluenceAttribute
    passengerTrainInfluence: InfluenceAttribute
    radioactivityInfluence: InfluenceAttribute
    natureInfluence: InfluenceAttribute
    wasteDisposalInfluence: InfluenceAttribute
    bodyDisposalInfluence: InfluenceAttribute
    trafficInfluence: InfluenceAttribute
}

interface SupportsAspects {
    // Aspects
    provideAspectEducationLow: NumberAttribute
    provideAspectEducationHigh: NumberAttribute
    provideAspectHealthCare: NumberAttribute
    provideAspectWasteDisposal: NumberAttribute
    provideAspectBodyDisposal: NumberAttribute
    // Aspect capacities
    aspectEducationLowCapacity: NumberAttribute
    aspectEducationHighCapacity: NumberAttribute
    aspectHealthCareCapacity: NumberAttribute
    aspectWasteDisposalCapacity: NumberAttribute
    aspectBodyDisposalCapacity: NumberAttribute
}

interface SupportsCarSpawner {
    //TODO: carSpawner
}

interface SupportsBasicBuildingFrames {
    frames: FrameAttribute
    framesWinter: FrameAttribute
}

interface SupportsExtendedBuildingFrames {
    frames: FrameAttribute
    framesWinter: FrameAttribute
    decoFrames: FrameAttribute
    decoFramesWinter: FrameAttribute
    randomFrame: BooleanAttribute
    groundFrames: FrameAttribute
    groundFramesWinter: FrameAttribute
    waterBorderFrames: FrameAttribute
    waterBorderFramesWinter: FrameAttribute
    //TODO: groundTiles
}

export interface BuildingBasedAttributes extends
    DefaultAttributes,
    ViewportDraftAttributes,
    SupportsInfluences,
    SupportsAspects,
    SupportsCarSpawner,
    SupportsAnimation,
    SupportsBasicBuildingFrames
{
    price: NumberAttribute
    monthlyPrice: NumberAttribute
    diamondPrice: NumberAttribute
    water: NumberAttribute
    power: NumberAttribute
    buildTime: NumberAttribute
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
    //TODO: upgrades: UpgradeAttribute
    pedestrian: StringAttribute
    pedestrianCount: NumberAttribute
}

export interface UpgradeDraftAttributes extends
    BuildingBasedAttributes
{
    onlyOne: BooleanAttribute
}
