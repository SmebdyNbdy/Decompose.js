import { VALUE, ANNOUNCE, HTML, APPLY_PROPS } from "../consts.js";
import { tError } from "../tError.js";
import { withValue, findJsVars, templateToFunc } from "../funcs.js";
import { Observable } from "./Observable.js";
import { ObservableValue } from "./ObservableValue.js";

export class Template {

    static create(lines, ...keys) {
        return new Template(lines, keys);
    }

    constructor(lines, keys) {
        this.callbacks = new Proxy(Object.create(null), {
            defineProperty(dest, prop) {
                tError.e801("this.callbacks", prop);
                return true;
            },
            get(dest, prop) {
                return dest[prop];
            },
            set(dest, prop, val) {
                val.id = Symbol();
                Object.defineProperty(dest, prop, withValue(val, true));
                return true;
            }
        });
        this.observables = new Proxy(Object.create(null), {
            defineProperty(dest, prop) {
                tError.e801("this.observables", prop);
                return true;
            },
            get(dest, prop) {
                return new ObservableValue(dest[prop]);
            },
            set(dest, prop, val) {
                if (dest[prop]) {
                    dest[prop][VALUE] = val;
                } else {
                    dest[prop] = new Observable(val);
                }

                dest[prop][ANNOUNCE]();
                return true;
            }
        });

        let counter = 0;
        this.properties = {};
        console.log(keys)
        keys[0].forEach((key, index) => {
            if (typeof key === "string") {
                this.properties[key] = ``;
            } else {
                if (typeof key === "function") {
                    this.properties[`cProp${counter}`] = key();
                } else if (typeof key === "object") {
                    this.properties[`cProp${counter}`] = key.$;
                } else {
                    this.properties[`cProp${counter}`] = key;
                }
                keys[0][index] = `cProp${counter}`;
                counter += 1;
            }

        });
        console.log(this.properties);

        this[APPLY_PROPS] = () => {
            return templateToFunc(lines, keys)(this.properties);
        }
        this[HTML] = lines;

        return this;
    }

    get name() {
        return this.Name;
    }

    setName(name) {
        this.Name = name;

        customElements.define(`d-${this.Name}`, class extends HTMLElement {});
        this.element = document.createElement(`d-${this.Name}`);

        this.elements = {};
        let matcher = findJsVars(this[HTML].join("."));
        matcher.forEach(name => {
            Object.defineProperty(this.elements, name, {
                get: () => this.element.querySelector(`[jayes-name="${name}"]`),
                set: () => {},
                enumerable: true,
                configurable: false,
            })
        });

        return this;
    }

    setOnLoad(func) {
        this.onLoad = func;

        return this;
    }

    setCallbacks(callbacks) {
        Object.entries(callbacks).forEach(([name, func]) => {
            this.callbacks[name] = func;
        });

        return this;
    }

    setObservables(observables) {
        Object.entries(observables).forEach(([name, func]) => {
            this.observables[name] = func();
        });

        return this;
    }
}
