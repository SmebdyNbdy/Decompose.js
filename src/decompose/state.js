import { tError } from "./tError.js";

window.history.pushState('{ "de$": [ "file:///Users/alexgavrikov/Developer/lampasch/ledit/ledit/test.html" ] }', "");

let proxyState = {
    get(dest, prop) {
        let realDest = JSON.parse(window.history.state);
        console.log(realDest);
        console.log(dest[prop]);
        return realDest.de$[dest[prop]];
    },
    set(dest, prop, val) {
        if ((typeof val === "function")
            ||(typeof val === "symbol")) {
            tError.e703();
            return false;
        }
        let realDest = JSON.parse(window.history.state);
        if (prop === "url") {
            realDest.de$[0] = val;
        } else if (dest[prop]) {
            realDest.de$[dest[prop]] = val;
        } else {
            dest[prop] = realDest.de$.length;
            realDest.de$.push(val);
        }
        window.history.pushState(JSON.stringify(realDest), "", realDest.de$[0]);
        return true;
    }
}

let stateObj = Object.create(null);
stateObj.url = 0;

export var state = new Proxy(stateObj, proxyState);
