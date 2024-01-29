import {Category} from "./Categories";
import {Draft} from "./drafts/Draft";

interface DraftTypeConstructorParams {
    tag: string;
    category?: Category;
    rci?: boolean;
    draftType: typeof Draft;
    base?: boolean
}

export class DraftType {
    private readonly _tag: string;
    private readonly category: Category | null
    private readonly rci: boolean
    private readonly draftType: typeof Draft
    private readonly base: boolean

    constructor({tag, category, rci, draftType, base}: DraftTypeConstructorParams) {
        this._tag = tag;
        this.category = category
        this.rci = rci || false
        this.draftType = draftType
        if (base == undefined) {
            this.base = true
        } else {
            this.base = base
        }
    }

    get tag(): string {
        return this._tag;
    }

    public isRCI(): boolean {
        return this.rci;
    }

    public getNewDraft(): Draft {
        return new this.draftType(this);
    }

    public getDraft(): typeof Draft {
        return this.draftType;
    }
}