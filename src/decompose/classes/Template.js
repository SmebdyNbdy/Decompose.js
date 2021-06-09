import { APPLY_PROPS, RAWC, RAWO } from "../consts/symbols.js";
import { PROXY } from "../consts/proxy.js";
import { findJsVars, templateToFunc, literalParser } from "../funcs.js";
import { gid } from "../globs.js";
import { DeStyle } from "./Style.js";
export { DeStyle } from "./Style.js";

export var style = new DeStyle();
style.insert(
    `de-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    align-content: space-evenly;
    &[col] {
        flex-direction: column;
        justify-content: stretch;
    }
    &[stretch] {
        align-items: stretch;
    }
    &[wrap] {
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}`);

export class Template {

    constructor(lines, keys) {
        this[RAWC] = Object.create(null);
        this[RAWO] = Object.create(null);
        this.callbacks = new Proxy(this[RAWC], PROXY.callbacks);
        this.observables = new Proxy(this[RAWO], PROXY.observables);
        this.properties = {
            components: {}
        };

        let counter = 0;
        keys.forEach((key, index) => {
            let left, right;
            switch(typeof key) {
            case "string":
                left = [...lines[index].matchAll(/<$/g)];
                right = [...lines[index + 1].matchAll(/^>/g)];
                if (left[0] && right[0]) {
                    gid.get()
                    this.properties[key] = `gid value="${gid.val}"></gid`;
                    this.properties.components[key] = `gid[value="${gid.val}"]`;
                } else {
                    this.properties[key] = ``;
                }
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

        this.elements = [];
        let matcher = findJsVars(lines);
        matcher.names.forEach(name => this.elements.push(name));

        this[APPLY_PROPS] = templateToFunc(matcher.lines, keys);

        console.log(matcher);

        return this;
    }

    get name() {
        return this.Name;
    }

    setStyle(raw) {
        style.insertScoped(`de-${this.Name}`, raw);
    }

    setName(name) {
        this.Name = name;

        customElements.define(`de-${this.Name}`, class extends HTMLElement {
            constructor() {
                super();
                style.insert(
                    `${this.tagName} {
                        display: contents;
                    }`);
            }
        });
        this.element = document.createElement(`de-${this.Name}`);

        return this;
    }

    setOnLoad(func) {
        this.onLoad = func;

        return this;
    }
}
