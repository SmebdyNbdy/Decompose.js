import { VALUE, OBSERVERS, ANNOUNCE, ADD, DELETE } from "../consts/symbols.js";

export class Observable {
    constructor(value) {
        this[OBSERVERS] = {};
        this[VALUE] = value;

        Object.seal(this);

        return this;
    }

    [ANNOUNCE]() {
        Object.getOwnPropertySymbols(this[OBSERVERS]).forEach(callback => this[OBSERVERS][callback](this[VALUE]));
    }
    [ADD](observer) {
        this[OBSERVERS][observer.id] = observer;
    }
    [DELETE](observer) {
        delete this[OBSERVERS][observer.id];
    }

    valueOf() {
        return this[VALUE];
    }
    toString() {
        return this[VALUE];
    }
    toLocaleString() {
        return this[VALUE];
    }
}
