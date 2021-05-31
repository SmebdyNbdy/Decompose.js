import { VALUE, ANNOUNCE } from "./symbols.js";
import { tError } from "../tError.js";
import { withValue } from "../funcs.js";
import { Observable } from "../classes/Observable.js";
import { ObservableValue } from "../classes/ObservableValue.js";

export const PROXY = {
    callbacks: {
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
    },
    observables: {
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
    },
    components: {
        defineProperty() {
            tError.e821("componentsRegistry");
        },
        get(dest, prop) {
            return dest[prop];
        },
        set() {
            return true;
        },
    }
}
