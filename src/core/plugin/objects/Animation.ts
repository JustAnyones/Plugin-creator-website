import { StringAttribute } from "@/core/attribute/StringAttribute";
import { AttributeOwner, AttributeOwnerFactory, AttributeOwnerFactoryWithOptions } from "../AttributeOwner";
import { Plugin } from "../Plugin";
import { NumberAttribute } from "@/core/attribute/NumberAttribute";
import { BooleanAttribute } from "@/core/attribute/BooleanAttribute";
import { IListable } from "@/core/attribute/interfaces/Interfaces";
import { serialize } from "@/core/utils/Utils";
import { FactoryAttribute } from "@/core/attribute/FactoryAttribute";
import { Color } from "./Color";
import { loadColor, loadRotationAware } from "../Attributes";
import i18next from "@/translation/definition";

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

    nightLightProbability: NumberAttribute
    rotationAware: BooleanAttribute

    constructor(plugin: Plugin) {
        super(plugin);

        this.id = new StringAttribute({
            plugin: this.plugin,
            id: "id",
            name: i18next.t("objects.animation.id.name"),
            description: i18next.t("objects.animation.id.description"),
            required: true
        })

        this.x = new NumberAttribute({
            plugin: this.plugin,
            id: "x",
            name: i18next.t("objects.animation.x.name"),
            description: i18next.t("objects.animation.x.description"),
            required: false, defaultValue: 0
        })

        this.y = new NumberAttribute({
            plugin: this.plugin,
            id: "y",
            name: i18next.t("objects.animation.y.name"),
            description: i18next.t("objects.animation.y.description"),
            required: false, defaultValue: 0
        })

        this.shift = new NumberAttribute({
            plugin: this.plugin,
            id: "shift",
            name: i18next.t("objects.animation.shift.name"),
            description: i18next.t("objects.animation.shift.description"),
            required: false
        })

        this.frameShift = new NumberAttribute({
            plugin: this.plugin,
            id: "frame shift",
            name: i18next.t("objects.animation.frame_shift.name"),
            description: i18next.t("objects.animation.frame_shift.description"),
            required: false, defaultValue: 1
        })

        this.onFire = new BooleanAttribute({
            plugin: this.plugin,
            id: "on fire",
            name: i18next.t("objects.animation.on_fire.name"),
            description: i18next.t("objects.animation.on_fire.description"),
            required: false, defaultValue: false
        })

        this.onCrime = new BooleanAttribute({
            plugin: this.plugin,
            id: "on crime",
            name: i18next.t("objects.animation.on_crime.name"),
            description: i18next.t("objects.animation.on_crime.description"),
            required: false, defaultValue: false
        })

        this.isBurning = new BooleanAttribute({
            plugin: this.plugin,
            id: "is burning",
            name: i18next.t("objects.animation.is_burning.name"),
            description: i18next.t("objects.animation.is_burning.description"),
            required: false, defaultValue: false
        })

        this.inWinter = new BooleanAttribute({
            plugin: this.plugin,
            id: "in winter",
            name: i18next.t("objects.animation.in_winter.name"),
            description: i18next.t("objects.animation.in_winter.description"),
            required: false, defaultValue: false
        })

        this.inSummer = new BooleanAttribute({
            plugin: this.plugin,
            id: "in summer",
            name: i18next.t("objects.animation.in_summer.name"),
            description: i18next.t("objects.animation.in_summer.description"),
            required: false, defaultValue: false
        })

        // TODO: "date" object
        // TODO: "frames" array that is an array of integers that goes to targetFrames

        this.seed = new NumberAttribute({
            plugin: this.plugin,
            id: "seed",
            name: i18next.t("objects.animation.seed.name"),
            description: i18next.t("objects.animation.seed.description"),
            required: false,
        })

        this.color = loadColor(
            this.plugin,
            i18next.t("objects.animation.color.name"),
            i18next.t("objects.animation.color.description")
        )

        this.nightLightProbability = new NumberAttribute({
            plugin: this.plugin,
            id: "night light probability",
            name: i18next.t("objects.animation.night_light_probability.name"),
            description: i18next.t("objects.animation.night_light_probability.description"),
            required: false, defaultValue: 1,
            isInteger: false
        })

        this.rotationAware = loadRotationAware(
            this.plugin,
            i18next.t("objects.animation.rotation_aware.name"),
            i18next.t("objects.animation.rotation_aware.description")
        )
    }
    getTitle(index: number): string {
        return `Animation ${index}`
    }
    getDescription(): string {
        return ""
    }
}