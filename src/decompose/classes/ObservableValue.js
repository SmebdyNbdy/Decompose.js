import { VALUE, ADD, DELETE } from "../consts/symbols.js";
import { withValue } from "../funcs.js";
import { tError } from "../tError.js";

export class ObservableValue {
    constructor(ofObj) {
        this.value = ofObj[VALUE];

        let checker = (obs) => {
            if (!obs.id) {
                tError.e821(obs);
                return false;
            } else {
                return true;
            }
        }

        Object.defineProperty(this, "addObserver", withValue(observer => {
            if (checker(observer)) {
                ofObj[ADD](observer);
            }
            return this;
        }, true));
        Object.defineProperty(this, "deleteObserver", withValue(observer => {
            if (checker(observer)) {
                ofObj[DELETE](observer);
            }
            return this;
        }, true));

        return this;
    }

    valueOf() {
        return this.value;
    }
    toLocaleString() {
        return this.value;
    }
    toString() {
        return this.value;
    }
}
