import { APPLY_PROPS } from "./consts.js";
import { Template } from "./classes.js";

export function componentMaker(args) {
    let component = Template.create(args.lines, args.keys)
        .setName(args.name);

    if (args.onLoad)
        component.setOnLoad(args.onLoad);
    if (args.callbacks)
        component.setCallbacks(args.callbacks);
    if (args.observables)
        component.setObservables(args.observables);

    let callbacks = () => component.callbacks;
    let observables = () => component.observables;
    let element = () => component.element;
    let elements = () => component.elements;
    let name = () => component.name;
    let onLoad = () => component.onLoad;

    return (properties) => {
        let bckp = {};
        Object.assign(bckp, component.properties);
        Object.entries(properties).forEach(([key, val]) => {
            if (val) {
                component.properties[key] = `${val}`;
            }
        });
        console.log(component.properties);
        component.element.innerHTML = component[APPLY_PROPS]();

        Object.assign(component.properties, bckp);
        console.log(component);

        let retval = {
            get callbacks() {
                return callbacks();
            },
            setCallback: new Proxy(this.callbacks, {
                get: (dest, prop) => {
                    return (val) => {
                        let value = val.bind(retval)
                        dest[prop] = value;
                    }
                }
            }),
            get observables() {
                return observables();
            },
            get element() {
                return element();
            },
            get elements() {
                return elements();
            },
            get name() {
                return name();
            },
            get onLoad() {
                return onLoad();
            },
            get asProp() {
                let tmpString = this.element.outerHTML;
                tmpString = tmpString
                    .replaceAll(/^</g, "")
                    .replaceAll(/>$/g, "");
                return tmpString;
            },
            toString() {
                return this.asProp;
            },
            toLocaleString() {
                return this.asProp;
            },
            valueOf() {
                return this.asProp;
            }
        }
    }
}
