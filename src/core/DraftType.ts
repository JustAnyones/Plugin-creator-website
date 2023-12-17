import {Category} from "./Categories";
import {Draft} from "./drafts/Draft";

interface DraftTypeConstructorParams {
    tag: string;
    category?: Category;
    rci?: boolean;
    draftType: typeof Draft;
}

export class DraftType {
    private readonly _tag: string;
    private readonly category: Category | null
    private readonly rci: boolean
    private readonly draftType: typeof Draft

    constructor({tag, category, rci, draftType}: DraftTypeConstructorParams) {
        this._tag = tag;
        this.category = category
        this.rci = rci || false
        this.draftType = draftType
    }

    get tag(): string {
        return this._tag;
    }

    public isRCI(): boolean {
        return this.rci;
    }

    public getDraft(): Draft {
        return new this.draftType(this);
    }
}