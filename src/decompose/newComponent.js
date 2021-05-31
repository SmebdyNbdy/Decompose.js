import { componentMaker } from "./componentMaker.js";
import { tError } from "./tError.js";

let componentsRegistryStorage = Object.create(null);
let proxyfier = {
    defineProperty: () => {
        tError.e821("componentsRegistry");
    },
    get: (dest, prop) => {
        return dest[prop];
    },
    set: () => {
        return true;
    },
};

export var componentsRegistry = new Proxy(componentsRegistryStorage, proxyfier);

export function newComponent(lines, ...keys) {
    return (args) => {
        args.lines = lines;
        args.keys = keys;
        componentsRegistryStorage[args.name] = componentMaker(args);
        return componentsRegistry;
    }
}
