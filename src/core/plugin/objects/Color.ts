import { StringAttribute } from "@/core/attribute/StringAttribute";
import { AttributeOwner, AttributeOwnerFactory, AttributeOwnerFactoryWithOptions } from "../AttributeOwner";
import { Plugin } from "../Plugin";
import { NumberAttribute } from "@/core/attribute/NumberAttribute";
import { IListable } from "@/core/attribute/interfaces/Interfaces";
import { serialize } from "@/core/utils/Utils";

export class ColorFactory implements AttributeOwnerFactory, AttributeOwnerFactoryWithOptions {
    fromJSON(obj: any, plugin: Plugin): AttributeOwner {
        if ("id" in obj)
            return serialize(obj, new IdColor(plugin))
        else if ("hex" in obj)
            return serialize(obj, new HexColor(plugin))
        return serialize(obj, new RgbColor(plugin))
    }

    getOptions() {
        return {
            "Add a hex color": ((plugin: Plugin) => new HexColor(plugin)),
            "Add an RGB color": ((plugin: Plugin) => new RgbColor(plugin)),
            "Add a color by ID": ((plugin: Plugin) => new IdColor(plugin)),
        }
    }
}

export abstract class Color extends AttributeOwner implements IListable {
    abstract getTitle(index: number): string;
    abstract getDescription(): string;
}

class IdColor extends Color {

    id: StringAttribute

    constructor(plugin: Plugin) {
        super(plugin);
        this.id = new StringAttribute({
            plugin: this.plugin,
            id: "id",
            name: "ID", description: "ID of the color draft.",
            required: true
        })
    }

    getTitle(index: number): string {
        return "ID color"
    }
    getDescription(): string {
        return ""
    }
}

class RgbColor extends Color {

    r: NumberAttribute
    g: NumberAttribute
    b: NumberAttribute
    a: NumberAttribute

    constructor(plugin: Plugin) {
        super(plugin);
        this.r = new NumberAttribute({
            plugin: this.plugin,
            id: "r",
            name: "Red", description: "The red component.",
            required: true
        })
        this.g = new NumberAttribute({
            plugin: this.plugin,
            id: "g",
            name: "Green", description: "The green component.",
            required: true
        })
        this.b = new NumberAttribute({
            plugin: this.plugin,
            id: "b",
            name: "Blue", description: "The blue component.",
            required: true
        })
        this.a = new NumberAttribute({
            plugin: this.plugin,
            id: "a",
            name: "Alpha", description: "The alpha component.",
            required: false, defaultValue: 255
        })
    }

    getTitle(index: number): string {
       return "RGB color"
    }
    getDescription(): string {
        return ""
    }
}

class HexColor extends Color {

    hex: StringAttribute

    constructor(plugin: Plugin) {
        super(plugin);
        this.hex = new StringAttribute({
            plugin: this.plugin,
            id: "hex",
            name: "Hex", description: "Hex value of the colour.",
            required: true
        })
    }

    getTitle(index: number): string {
        return "Hex color"
    }
    getDescription(): string {
        return ""
    }
}
