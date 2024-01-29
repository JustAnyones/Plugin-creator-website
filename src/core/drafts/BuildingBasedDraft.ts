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

import {BuildingBasedAttributes} from "./Interfaces";
import {ViewportDraft} from "./ViewportDraft";
import {NumberAttribute} from "../attribute/NumberAttribute";
import {InfluenceAttribute} from "../attribute/InfluenceAttribute";
import {FrameAttribute} from "../attribute/FrameAttribute";
export abstract class BuildingBasedDraft extends ViewportDraft implements BuildingBasedAttributes {

    price = new NumberAttribute({
        owner: this, id: "price",
        name: "Price",
        description: "Price of the building in Theons.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })
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


    buildTime = new NumberAttribute({
        owner: this, id: "build time",
        name: "Build time",
        description: "Build time of the building. Can be left blank for game to calculate itself. " +
            "Value of 0 will let building finish instantly.",
        validation: {minValue: 0, maxValue: 10_000_000}
    })

    framesWinter = new FrameAttribute({
        owner: this, id: "frames winter",
        name: "Winter frames", description: "Frames for the winter season.",
        defaultValue: []
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
}