import {Attribute} from "./Attribute";
import {Frame, BmpFrame, FrameFactory} from "../objects/Frame";

export class FrameAttribute extends Attribute {
    element = "FrameInput"
    declare _value: Array<Frame>

    isEmpty(): boolean {
        return this._value.length == 0;
    }

    isDefault(): boolean {
        return this._value.length === 0
    }

    get value() {
        return this._value
    }

    set value(value: any) {
        console.log("Asked to set value of FrameAttribute", value)
        if (value instanceof Array) {
            for (const valueKey in value) {
                this._value.push(new FrameFactory().fromJSON(value[valueKey], this.owner))
            }
        }
    }

    get frames() {
        return this._value
    }

    public addFrame(frame: Frame) {
        this._value.push(frame)
    }

    public removeFrame(index: number) {
        // Clean up tangling file mapping
        let frame = this.value[index]
        if (frame instanceof BmpFrame && frame.bmp.value !== null) {
            this.owner.plugin.removeFile(frame.bmp.value)
        }
        // Remove from current attribute
        this._value.splice(index, 1)
    }

    protected validate() {
        let isValid = true;
        for (let i = 0; i < this.frames.length; i++) {
            let frameValid = this.frames[i].validate()
            if (!frameValid) {
                isValid = false;
            }
        }
        if (!isValid) this.addError("Validation failed")
    }
}