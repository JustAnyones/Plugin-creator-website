import { StringAttribute } from "@/core/attribute/StringAttribute";
import { AttributeOwner, AttributeOwnerFactory, AttributeOwnerFactoryWithOptions } from "../AttributeOwner";
import { Plugin } from "../Plugin";
import { NumberAttribute } from "@/core/attribute/NumberAttribute";
import { BooleanAttribute } from "@/core/attribute/BooleanAttribute";
import { IListable } from "@/core/attribute/interfaces/Interfaces";
import { serialize } from "@/core/utils/Utils";
import { FactoryAttribute } from "@/core/attribute/FactoryAttribute";
import { Color } from "./Color";
import { loadColor } from "../Attributes";

export class AnimationFactory implements AttributeOwnerFactory, AttributeOwnerFactoryWithOptions {
    fromJSON(obj: any, plugin: Plugin): AttributeOwner {
        return serialize(obj, new Animation(plugin));
    }

    getOptions() {
        return {
            "Add an animation": ((plugin: Plugin) => new Animation(plugin)),
        }
    }
}

export class Animation extends AttributeOwner implements IListable {

    id: StringAttribute
    x: NumberAttribute
    y: NumberAttribute
    shift: NumberAttribute
    frameShift: NumberAttribute

    onFire: BooleanAttribute
    onCrime: BooleanAttribute
    isBurning: BooleanAttribute
    inWinter: BooleanAttribute
    inSummer: BooleanAttribute

    seed: NumberAttribute
    color: FactoryAttribute<Color>

    constructor(plugin: Plugin) {
        super(plugin);

        this.id = new StringAttribute({
            plugin: this.plugin,
            id: "id",
            name: "ID", description: "ID of the animation draft.",
            required: true
        })

        this.x = new NumberAttribute({
            plugin: this.plugin,
            id: "x",
            name: "X", description: "",
            required: false, defaultValue: 0
        })

        this.y = new NumberAttribute({
            plugin: this.plugin,
            id: "y",
            name: "Y", description: "",
            required: false, defaultValue: 0
        })

        this.shift = new NumberAttribute({
            plugin: this.plugin,
            id: "shift",
            name: "Shift", description: "",
            required: false
        })

        this.frameShift = new NumberAttribute({
            plugin: this.plugin,
            id: "frame shift",
            name: "Frame shift", description: "",
            required: false, defaultValue: 1
        })

        this.onFire = new BooleanAttribute({
            plugin: this.plugin,
            id: "on fire",
            name: "On fire", description: "",
            required: false, defaultValue: false
        })

        this.onCrime = new BooleanAttribute({
            plugin: this.plugin,
            id: "on crime",
            name: "On crime", description: "",
            required: false, defaultValue: false
        })

        this.isBurning = new BooleanAttribute({
            plugin: this.plugin,
            id: "is burning",
            name: "Is burning", description: "",
            required: false, defaultValue: false
        })

        this.inWinter = new BooleanAttribute({
            plugin: this.plugin,
            id: "in winter",
            name: "In winter", description: "",
            required: false, defaultValue: false
        })

        this.inSummer = new BooleanAttribute({
            plugin: this.plugin,
            id: "in summer",
            name: "In summer", description: "",
            required: false, defaultValue: false
        })

        // TODO: "date" object
        // TODO: "frames" array that is an array of integers that goes to targetFrames

        this.seed = new NumberAttribute({
            plugin: this.plugin,
            id: "seed",
            name: "Seed", description: "",
            required: false,
        })


        this.color = loadColor(this.plugin)
        // TODO: "night light probability"
        // TODO: "rotation aware"

    }
    getTitle(index: number): string {
        return `Animation ${index}`
    }
    getDescription(): string {
        return ""
    }
}