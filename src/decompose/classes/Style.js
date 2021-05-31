import { ELEMENT } from "../consts/symbold.js";

export class Style {
    constructor() {
        this.element = document.createElement("style");
        this.stylesheet = this.element.sheet;
    }
}
