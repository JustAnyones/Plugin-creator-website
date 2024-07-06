import i18next from "@/translation/definition";
import { FactoryAttribute } from "../attribute/FactoryAttribute";
import { ListAttribute } from "../attribute/ListAttribute";
import { Plugin } from "./Plugin";
import { Animation, AnimationFactory } from "./objects/Animation";
import { Color, ColorFactory } from "./objects/Color";

export interface SupportsAnimation {
    animation: ListAttribute<Animation>
    // TODO: frameAnimationIndices
}

export interface SupportsFgAnimation {
    animationFg: ListAttribute<Animation>
    // TODO: frameAnimationIndices
}

export function loadAnimation(plugin: Plugin) {
    return new ListAttribute<Animation>({
        plugin: plugin, id: "animation",
        name: "Animation",
        description: "A list of animation objects.",
        required: false,
        factory: new AnimationFactory()
    })
}
export function loadAnimationFg(plugin: Plugin) {
    return new ListAttribute<Animation>({
        plugin: plugin, id: "animation fg",
        name: "Animation foreground",
        description: "A list of animation objects for foreground.",
        required: false,
        factory: new AnimationFactory()
    })
}

export function loadColor(plugin: Plugin, name?: string, description?: string) {
    return new FactoryAttribute<Color>({
        plugin: plugin, id: "color",
        name: name || i18next.t("attributes.color.name"),
        description: description || i18next.t("attributes.color.description"),
        required: false,
        factory: new ColorFactory()
    })
}

export function loadColors(plugin: Plugin, name?: string, description?: string) {
    return new ListAttribute<Color>({
        plugin: plugin, id: "colors",
        name: name || i18next.t("attributes.colors.name"),
        description: description || i18next.t("attributes.colors.description"),
        required: false,
        factory: new ColorFactory()
    })
}