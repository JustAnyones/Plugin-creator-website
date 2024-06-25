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

import {BuildingDraft} from "./plugin/drafts/BuildingDraft";
import {Categories} from "./Categories";
import {DraftType} from "./DraftType";
import {TreeDraft} from "./plugin/drafts/TreeDraft";
import {CategoryDraft} from "./plugin/drafts/CategoryDraft";
import {UpgradeDraft} from "./plugin/drafts/UpgradeDraft";
import { AnimationDraft } from "./plugin/drafts/AnimationDraft";

export class Types {
    // RCI
    static readonly RESIDENTIAL = new DraftType({
        tag: "residential",
        category: Categories.RESIDENTIAL,
        rci: true,
        draftType: BuildingDraft
    })
    static readonly COMMERCIAL = new DraftType({
        tag: "commercial",
        category: Categories.COMMERCIAL,
        rci: true,
        draftType: BuildingDraft
    })
    static readonly INDUSTRIAL = new DraftType({
        tag: "industrial",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft
    })
    static readonly FARM = new DraftType({
        tag: "farm",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft
    })
    static readonly HARBOR_IND = new DraftType({
        tag: "harbor ind",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft
    })
    static readonly HARBOR_PIER = new DraftType({
        tag: "harbor pier",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft
    })

    // Buildings
    static readonly PARK = new DraftType({
        tag: "park",
        category: Categories.PARK,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly SPORT = new DraftType({
        tag: "sport",
        category: Categories.SPORT,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly PUBLIC = new DraftType({
        tag: "public",
        category: Categories.MANAGEMENT,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly RELIGION = new DraftType({
        tag: "religion",
        category: Categories.RELIGION,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly AWARD = new DraftType({
        tag: "award",
        category: Categories.AWARD,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly ENERGY = new DraftType({
        tag: "energy",
        category: Categories.ENERGY,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly WATER = new DraftType({
        tag: "water",
        category: Categories.WATER,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly MEDIC = new DraftType({
        tag: "medic",
        category: Categories.MEDIC,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly POLICE = new DraftType({
        tag: "police",
        category: Categories.POLICE,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly SWAT = new DraftType({
        tag: "swat",
        category: Categories.POLICE,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly FIRE_BRIGADE = new DraftType({
        tag: "fire brigade",
        category: Categories.FIRE_BRIGADE,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly EDUCATION = new DraftType({
        tag: "education",
        category: Categories.EDUCATION,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly BUS_DEPOT = new DraftType({
        tag: "bus depot",
        category: Categories.ROAD,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly DESTROYED = new DraftType({
        tag: "destroyed",
        category: null,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly DECORATION = new DraftType({
        tag: "decoration",
        category: Categories.DECORATION,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly BUOY = new DraftType({
        tag: "buoy",
        category: Categories.TRANSPORT,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly RAILWAY_STATION = new DraftType({
        tag: "railway station",
        category: Categories.ROAD,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly WASTE_DISPOSAL = new DraftType({
        tag: "waste disposal",
        category: Categories.WASTE_DISPOSAL,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly BODY_DISPOSAL = new DraftType({
        tag: "body disposal",
        category: Categories.BODY_DISPOSAL,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly MILITARY = new DraftType({
        tag: "military",
        category: Categories.MILITARY,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly AIRPORT = new DraftType({
        tag: "airport",
        category: Categories.AIRPORT,
        rci: false,
        draftType: BuildingDraft
    })
    //static readonly OTHER = new DraftType("building", null) // Valid type, but should it be used?
    static readonly TERRAIN = new DraftType({
        tag: "terrain",
        category: Categories.TERRAIN,
        rci: false,
        draftType: BuildingDraft
    })
    static readonly LANDMARK = new DraftType({
        tag: "landmark",
        category: Categories.LANDMARK,
        rci: false,
        draftType: BuildingDraft
    })

    static readonly TREE = new DraftType({
        tag: "tree",
        category: Categories.TREE,
        rci: false,
        draftType: TreeDraft
    })

    static readonly CATEGORY = new DraftType({
        tag: "category",
        category: Categories.ROOT,
        rci: false,
        draftType: CategoryDraft
    })

    static readonly UPGRADE = new DraftType({
        tag: "upgrade",
        category: null,
        rci: false,
        draftType: UpgradeDraft,
        base: false
    })

    static readonly ANIMATION = new DraftType({
        tag: "animation",
        category: null,
        rci: false,
        draftType: AnimationDraft
    })


    private constructor(private key: string, public value: any) {}
    toString() {
        return this.key;
    }

    public static getType(type: string) {
        let keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            let item = this[keys[i]];
            if (item instanceof DraftType && item.tag === type)
                return item;
        }
        return null;
    }

    public static getTypes() {
        let attrs: Array<DraftType> = []
        Object.keys(this).forEach(
            (item) => {
                if (this[item] instanceof DraftType && this[item].base)
                    attrs.push(this[item])
            })
        return attrs
    }
}
