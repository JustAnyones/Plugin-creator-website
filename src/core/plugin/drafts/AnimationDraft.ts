import { DraftType } from "@/core/DraftType";
import { Plugin } from "../Plugin";
import { ViewportDraft } from "./ViewportDraft";
import { BooleanAttribute } from "@/core/attribute/BooleanAttribute";
import { NumberAttribute } from "@/core/attribute/NumberAttribute";
import { ListAttribute } from "@/core/attribute/ListAttribute";
import { Animation } from "../objects/Animation";
import { loadAnimation, loadColors, SupportsAnimation } from "../Attributes";
import { Color } from "../objects/Color";

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
            name: "Additive", description: "Whether to draw the frames using additive blending.",
            required: false, defaultValue: false
        })

        this.light = new BooleanAttribute({
            plugin: this.plugin,
            id: "light",
            name: "Light", description: "",
            required: false, defaultValue: false
        })

        this.lightSwitching = new BooleanAttribute({
            plugin: this.plugin,
            id: "light switching",
            name: "Light switching", description: "",
            required: false, defaultValue: false
        })

        this.nightLightProbability = new NumberAttribute({
            plugin: this.plugin,
            id: "night light probability",
            name: "Night light probability", description: "",
            required: false, defaultValue: 1.0,
            isInteger: false
        })

        this.speed = new NumberAttribute({
            plugin: this.plugin,
            id: "speed",
            name: "Speed multiplier", description: "Speed multiplier on how fast the animation goes.",
            required: false, defaultValue: 1.0,
            isInteger: false
        })

        this.rotationAware = new BooleanAttribute({
            plugin: this.plugin,
            id: "rotation aware",
            name: "Rotation aware", description: "",
            required: false, defaultValue: false
        })

        this.colors = loadColors(this.plugin)

        this.loop = new BooleanAttribute({
            plugin: this.plugin,
            id: "loop",
            name: "Loop", description: "",
            required: false, defaultValue: true
        })

        this.handleInterpolation = new NumberAttribute({
            plugin: this.plugin,
            id: "handle interpolation",
            name: "Handle interpolation", description: "",
            required: false, defaultValue: 1,
            isInteger: true
        })

        this.pingPong = new BooleanAttribute({
            plugin: this.plugin,
            id: "ping pong",
            name: "Ping pong", description: "",
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