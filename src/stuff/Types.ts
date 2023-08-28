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

import {Draft} from "./drafts/Draft";
import {BuildingDraft} from "./drafts/BuildingDraft";

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

/**
 * Creates a new draft for the specified type.
 * @param type Type of the draft.
 */
export function createDraftFromType(type: Types): Draft {
    switch (type) {
        default:
            return new BuildingDraft(type)
    }
}