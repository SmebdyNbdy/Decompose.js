import { APPLY_PROPS, RAWC, RAWO } from "../consts/symbols.js";
import { PROXY } from "../consts/proxy.js";
import { findJsVars, templateToFunc } from "../funcs.js";
import { gid } from "../globs.js";

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
