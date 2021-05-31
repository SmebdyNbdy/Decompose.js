import { APPLY_PROPS, RAWC, RAWO } from "./consts/symbols.js";
import { PROXY } from "./consts/proxy.js";
import { Template } from "./classes/Template.js";

export function componentMaker(args) {
    let component = new Template(args.lines, args.keys)
        .setName(args.name);

    if (args.onLoad)
        component.setOnLoad(args.onLoad);

    if (args.callbacks) {
        Object.entries(args.callbacks).forEach( ([key, val]) => {
            component.callbacks[key] = val;
        });
    }
    if (args.observables) {
        Object.entries(args.observables).forEach( ([key, val]) => {
            component.observables[key] = val;
        });
    }

    class Instance {
        constructor(properties) {
            this.properties = {};
            Object.assign(this.properties, component.properties);
            Object.entries(properties).forEach( ([key, val]) => {
                if (val) this.properties[key] = val;
            });
            console.log(component.properties);
            console.log(this.properties);

            this.element = document.createElement(`d-${component.name}`);
            this.element.innerHTML = component[APPLY_PROPS](this.properties);

            this.elements = {};
            component.elements.forEach(name => {
                this.elements[name] = this.element.querySelector(`[jayes-name="${name}"]`);
            });

            this.callbacks = new Proxy(Object.create(null), PROXY.callbacks);
            Object.entries(component[RAWC]).forEach( ([key, val]) => {
                let value = val.bind(this);
                this.callbacks[key] = value;
            });
            this.observables = new Proxy(Object.create(null), PROXY.observables);
            Object.entries(component[RAWO]).forEach( ([key, val]) => {
                this.observables[key] = val;
            });

            let onLoadCall = component.onLoad;
            if (onLoadCall) this.onLoad = onLoadCall.bind(this);

            return this;
        }

        get name() {
            return component.name;
        }
        get asProp() {
            let tmpString = this.element.outerHTML;
            tmpString = tmpString
                .replaceAll(/^</g, "")
                .replaceAll(/>$/g, "");
            return tmpString;
        }

        toString() {
            return this.asProp;
        }
        toLocaleString() {
            return this.asProp;
        }
        valueOf() {
            return this.asProp;
        }
    }

    return Instance;
}
