import { APPLY_PROPS, RAWC, RAWO } from "./consts/symbols.js";
import { PROXY } from "./consts/proxy.js";
import { Template } from "./classes/Template.js";

export function componentMaker(args) {
    let component = new Template(args.lines, args.keys)
        .setName(args.name);

    if (args.onLoad)
        component.setOnLoad(args.onLoad);
    if (args.style)
        component.setStyle(args.style);

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

    class ComponentInstance {
        constructor(properties) {
            /**
             * APPLY PROPERTIES AND COMPONENT PROPERTIES
             **/
            this.properties = {};
            let propComponents = {};

            Object.assign(this.properties, component.properties);
            if (properties && properties.components) {
                Object.assign(propComponents, properties.components);
                delete properties.components;
            } else {
                Object.assign(propComponents, component.properties.components);
            }

            if (properties) {
                Object.entries(properties).forEach( ([key, val]) => {
                    if (val) this.properties[key] = val;
                });
            }

            //console.log(component.properties);
            //console.log(this.properties);
            /****/

            /**
             * CREATE ROOT ELEMENT AND APPEND ALL OTHER ELEMENTS TO IT
             **/
            this.element = document.createElement(`de-${component.name}`);
            this.element.appendChild(component[APPLY_PROPS](this.properties));

            Object.entries(propComponents).forEach( ([key, val]) => {
                let tmp = this.element.querySelector(this.properties.components[key]);
                if (tmp) {
                    if (val && (typeof val === "object")) {
                        tmp.insertAdjacentElement("afterend", val.element);
                        if (val.onLoad) val.onLoad();
                    }
                    tmp.remove();
                }
            })

            this.elements = {};
            component.elements.forEach(name => {
                console.log(`[de-name="${name}"]`);
                this.elements[name] = this.element.querySelector(`[de-name="${name}"]`);
            });
            /****/

            /**
             * BIND FUNCTIONS FROM THE TEMPLATE
             **/
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
            /****/

            return this;
        }

        get name() {
            return component.name;
        }

        toString() {
            return this.element.outerHTML;
        }
        toLocaleString() {
            return this.element.outerHTML;
        }
        valueOf() {
            return this.element;
        }
    }

    return ComponentInstance;
}
