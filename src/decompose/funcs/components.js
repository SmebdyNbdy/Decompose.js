import { PROXY } from "../consts/proxy.js";
import { componentMaker } from "../componentMaker.js";

let componentsRegistry = Object.create(null);
export var components = new Proxy(componentsRegistry, PROXY.components);

export function newComponent(lines, ...keys) {
    return (args) => {
        args.lines = lines;
        args.keys = keys;
        componentsRegistry[args.name] = componentMaker(args);
        return components;
    }
}
