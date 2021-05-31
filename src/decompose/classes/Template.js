import { APPLY_PROPS, RAWC, RAWO } from "../consts/symbols.js";
import { PROXY } from "../consts/proxy.js";
import { findJsVars, templateToFunc } from "../funcs.js";

export class Template {

    constructor(lines, keys) {
        this[RAWC] = Object.create(null);
        this[RAWO] = Object.create(null);
        this.callbacks = new Proxy(this[RAWC], PROXY.callbacks);
        this.observables = new Proxy(this[RAWO], PROXY.observables);
        this.properties = {};

        let counter = 0;
        keys.forEach((key, index) => {
            switch(typeof key) {
            case "string":
                this.properties[key] = ``;
                break;
            case "function":
                this.properties[`cProp${counter}`] = key();
                break;
            case "object":
                this.properties[`cProp${counter}`] = key.$;
                break;
            default:
                this.properties[`cProp${counter}`] = key;
                keys[index] = `cProp${counter}`;
                counter += 1;
            }
        });

        console.log(this.properties);

        this[APPLY_PROPS] = templateToFunc(lines, keys);
        this.elements = [];

        let matcher = findJsVars(lines.join("."));
        matcher.forEach(name => this.elements.push(name));

        return this;
    }

    get name() {
        return this.Name;
    }

    setName(name) {
        this.Name = name;

        customElements.define(`d-${this.Name}`, class extends HTMLElement {});
        this.element = document.createElement(`d-${this.Name}`);

        return this;
    }

    setOnLoad(func) {
        this.onLoad = func;

        return this;
    }
}
