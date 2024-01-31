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

import {ViewportDraft, ViewportDraftAttributes} from "./ViewportDraft";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {InfluenceAttribute} from "../../attribute/InfluenceAttribute";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";
import {DefaultAttributes} from "./Draft";
import {ListAttribute} from "../../attribute/ListAttribute";
import {Frame, FrameFactory} from "../objects/Frame";

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

interface SupportsAnimation {
    //TODO: animation // loadAnimations
    //TODO: frameAnimationIndices // loadFrameAnimationIndices
}

interface SupportsBasicBuildingFrames {
    framesWinter: ListAttribute<Frame>
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

export abstract class BuildingBasedDraft extends ViewportDraft implements BuildingBasedAttributes {

    price: NumberAttribute
    monthlyPrice: NumberAttribute
    diamondPrice: NumberAttribute
    water: NumberAttribute
    power: NumberAttribute
    buildTime: NumberAttribute

    framesWinter: ListAttribute<Frame>

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

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.price = new NumberAttribute({
            plugin: this.plugin, id: "price",
            name: "Price",
            description: "Price of the building in Theons.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })
        this.monthlyPrice = new NumberAttribute({
            plugin: this.plugin, id: "monthly price",
            name: "Monthly price",
            description: "Monthly price of the building in Theons.",
            validation: {minValue: -10_000_000, maxValue: 10_000_000}
        })
        this.diamondPrice = new NumberAttribute({
            plugin: this.plugin, id: "diamond price",
            name: "Diamond price",
            description: "Diamond price of the building. Note that on premium platforms you need to " +
                "specify normal price as well, since the game does not convert diamond price to Theon price. " +
                "Will be ignored in case the building was unlocked by a feature.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })
        this.power = new NumberAttribute({
            plugin: this.plugin, id: "power",
            name: "Power",
            description: "Amount of power used. Use negative values to produce power instead.",
            validation: {minValue: -10_000_000, maxValue: 10_000_000}
        })
        this.water = new NumberAttribute({
            plugin: this.plugin, id: "water",
            name: "Water",
            description: "Amount of water used. Use negative values to produce water instead.",
            validation: {minValue: -10_000_000, maxValue: 10_000_000}
        })


        this.buildTime = new NumberAttribute({
            plugin: this.plugin, id: "build time",
            name: "Build time",
            description: "Build time of the building. Can be left blank for game to calculate itself. " +
                "Value of 0 will let building finish instantly.",
            validation: {minValue: 0, maxValue: 10_000_000}
        })

        this.framesWinter = new ListAttribute<Frame>({
            plugin: this.plugin, id: "frames winter",
            name: "Winter frames",
            description: "Frames for the winter season.",
            factory: new FrameFactory()
        })

        // Visible Influences
        this.pollutionInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence pollution",
            name: "Influence pollution", description: "...",
            isPositive: false
        })
        this.noiseInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence noise",
            name: "Influence noise", description: "...",
            isPositive: false
        })
        this.healthInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence health",
            name: "Influence health", description: "..."
        })
        this.policeInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence police",
            name: "Influence police", description: "..."
        })
        this.fireDepartmentInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence fire department",
            name: "Influence fire department", description: "..."
        })
        this.parkInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence park",
            name: "Influence park", description: "..."
        })
        this.sportInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence sport",
            name: "Influence sport", description: "..."
        })
        this.educationLowInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence education low",
            name: "Influence education low", description: "..."
        })
        this.educationHighInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence education high",
            name: "Influence education high", description: "..."
        })
        this.cultureInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence culture",
            name: "Influence culture", description: "..."
        })
        this.managementInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence management",
            name: "Influence management", description: "..."
        })
        this.religionInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence religion",
            name: "Influence religion", description: "..."
        })
        this.passengerBusInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence passenger bus",
            name: "Influence passenger bus", description: "..."
        })
        this.passengerTrainInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence passenger train",
            name: "Influence passenger train", description: "..."
        })
        this.radioactivityInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence radioactive",
            name: "Influence radioactive", description: "...",
            isPositive: false
        })
        this.natureInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence nature",
            name: "Influence nature", description: "..."
        })
        this.wasteDisposalInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence waste disposal",
            name: "Influence waste disposal", description: "..."
        })
        this.bodyDisposalInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence body disposal",
            name: "Influence body disposal", description: "..."
        })
        this.trafficInfluence = new InfluenceAttribute({
            plugin: this.plugin, id: "influence traffic",
            name: "Influence traffic", description: "...",
            isPositive: false
        })

        // Aspects
        this.provideAspectEducationLow = new NumberAttribute({
            plugin: this.plugin, id: "provide aspect education low",
            name: "Provide aspect education low",
            description: "The capacity of low education students the building can support."
        })
        this.provideAspectEducationHigh = new NumberAttribute({
            plugin: this.plugin, id: "provide aspect education high",
            name: "Provide aspect education high",
            description: "The capacity of high education students the building can support."
        })
        this.provideAspectHealthCare = new NumberAttribute({
            plugin: this.plugin, id: "provide aspect health care",
            name: "Provide aspect health care",
            description: "The capacity of health care receiving citizens the building can support."
        })
        this.provideAspectWasteDisposal = new NumberAttribute({
            plugin: this.plugin, id: "provide aspect waste disposal",
            name: "Provide aspect waste disposal",
            description: "..."
        })
        this.provideAspectBodyDisposal = new NumberAttribute({
            plugin: this.plugin, id: "provide aspect body disposal",
            name: "Provide aspect body disposal",
            description: "..."
        })

        // Aspect capacities
        this.aspectEducationLowCapacity = new NumberAttribute({
            plugin: this.plugin, id: "aspect education low capacity",
            name: "Aspect education low capacity",
            description: "..."
        })
        this.aspectEducationHighCapacity = new NumberAttribute({
            plugin: this.plugin, id: "aspect education high capacity",
            name: "Aspect education high capacity",
            description: "..."
        })
        this.aspectHealthCareCapacity = new NumberAttribute({
            plugin: this.plugin, id: "aspect health care capacity",
            name: "Aspect health care capacity",
            description: "..."
        })
        this.aspectWasteDisposalCapacity = new NumberAttribute({
            plugin: this.plugin, id: "aspect waste disposal capacity",
            name: "Aspect waste disposal capacity",
            description: "..."
        })
        this.aspectBodyDisposalCapacity = new NumberAttribute({
            plugin: this.plugin, id: "aspect body disposal capacity",
            name: "Aspect body disposal capacity",
            description: "..."
        })
    }
}