import { DraftType } from "@/core/DraftType";
import { Plugin } from "../Plugin";
import { ViewportDraft } from "./ViewportDraft";
import { BooleanAttribute } from "@/core/attribute/BooleanAttribute";
import { NumberAttribute } from "@/core/attribute/NumberAttribute";
import { ListAttribute } from "@/core/attribute/ListAttribute";
import { Animation } from "../objects/Animation";
import { loadAnimation, loadColors, loadRotationAware, SupportsAnimation } from "../Attributes";
import { Color } from "../objects/Color";
import i18next from "@/translation/definition";

export class AnimationDraft extends ViewportDraft implements SupportsAnimation {

    additive: BooleanAttribute
    light: BooleanAttribute
    lightSwitching: BooleanAttribute
    nightLightProbability: NumberAttribute
    speed: NumberAttribute
    rotationAware: BooleanAttribute
    colors: ListAttribute<Color>
    loop: BooleanAttribute
    handleInterpolation: NumberAttribute
    pingPong: BooleanAttribute

    animation: ListAttribute<Animation>

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.additive = new BooleanAttribute({
            plugin: this.plugin,
            id: "additive",
            name: i18next.t("drafts.animation.additive.name"),
            description: i18next.t("drafts.animation.additive.description"),
            required: false, defaultValue: false
        })

        this.light = new BooleanAttribute({
            plugin: this.plugin,
            id: "light",
            name: i18next.t("drafts.animation.light.name"),
            description: i18next.t("drafts.animation.light.description"),
            required: false, defaultValue: false
        })

        this.lightSwitching = new BooleanAttribute({
            plugin: this.plugin,
            id: "light switching",
            name: i18next.t("drafts.animation.light_switching.name"),
            description: i18next.t("drafts.animation.light_switching.description"),
            required: false, defaultValue: false
        })

        this.nightLightProbability = new NumberAttribute({
            plugin: this.plugin,
            id: "night light probability",
            name: i18next.t("drafts.animation.night_light_probability.name"),
            description: i18next.t("drafts.animation.night_light_probability.description"),
            required: false, defaultValue: 1.0,
            isInteger: false
        })

        this.speed = new NumberAttribute({
            plugin: this.plugin,
            id: "speed",
            name: i18next.t("drafts.animation.speed.name"),
            description: i18next.t("drafts.animation.speed.description"),
            required: false, defaultValue: 1.0,
            isInteger: false
        })

        this.rotationAware = loadRotationAware(
            this.plugin,
            i18next.t("drafts.animation.rotation_aware.name"),
            i18next.t("drafts.animation.rotation_aware.description")
        )

        this.colors = loadColors(this.plugin)

        this.loop = new BooleanAttribute({
            plugin: this.plugin,
            id: "loop",
            name: i18next.t("drafts.animation.loop.name"),
            description: i18next.t("drafts.animation.loop.description"),
            required: false, defaultValue: true
        })

        this.handleInterpolation = new NumberAttribute({
            plugin: this.plugin,
            id: "handle interpolation",
            name: i18next.t("drafts.animation.handle_interpolation.name"),
            description: i18next.t("drafts.animation.handle_interpolation.description"),
            required: false, defaultValue: 1,
            isInteger: true
        })

        this.pingPong = new BooleanAttribute({
            plugin: this.plugin,
            id: "ping pong",
            name: i18next.t("drafts.animation.ping_pong.name"),
            description: i18next.t("drafts.animation.ping_pong.description"),
            required: false, defaultValue: false
        })

        // TODO: "frame animation indices"
        this.animation = loadAnimation(this.plugin);
    }


    getOptionalAttributeDescription(): string {
        return "These are optional attributes you can add to your animation draft. "
        + "They are not required, however useful if you want to add a night animation and etc.";
    }
}