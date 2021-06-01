import { ELEMENT, SHEET, RULES, QUERIES } from "../consts/symbols.js";
import { PROXY } from "../consts/proxy.js";
import { tError } from "../tError.js";

export class Style {
    constructor() {
        this[ELEMENT] = document.createElement("style");
        this[ELEMENT].id = "destyle";
        document.head.appendChild(this[ELEMENT]);

        let rules = Object.create(null);
        rules[SHEET] = this[ELEMENT].sheet;
        console.log(rules);

        this[RULES] = new Proxy(rules, PROXY.style);
        this[QUERIES] = {
            rules: Object.create(null),
            new(sel) {
                let index = rules[SHEET].cssRules.length;
                rules[SHEET].insertRule(sel + " {}", index);

                let newDest = Object.create(null);
                newDest[SHEET] = rules[SHEET].cssRules[index];

                this.rules[sel] = new Proxy(newDest, PROXY.style);
                return this.rules[sel];
            }
        }
    }

    setStyle(styleObject) {
        let setSelector = (selector, props) => {
            Object.entries(props).forEach( ([key, value]) => {
                if (typeof value !== "object") {
                    this[RULES][selector](key, value);
                } else {
                    tError.e903(value);
                }
            })
        }
        let setAtRule = (selector, props) => {
            this[QUERIES].new(selector);
            Object.entries(props).forEach( ([key, value]) => {
                Object.entries(value).forEach( ([k, v]) => {
                    if (typeof v !== "object") {
                        this[QUERIES].rules[selector][key](k, v);
                    } else {
                        tError.e903(v);
                    }
                });
            })
        }

        Object.entries(styleObject).forEach( ([key, value]) => {
            if (key.startsWith("@")) {
                setAtRule(key, value);
            } else {
                setSelector(key, value);
            }
        });
    }
}
