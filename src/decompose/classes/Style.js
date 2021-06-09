import { ELEMENT, SHEET, RULES, QUERIES } from "../consts/symbols.js";
import { PROXY } from "../consts/proxy.js";
import { tError } from "../tError.js";

function ampersander(regex, input, replacer) {
    let output = input;
    while (output.match(regex)) {
        output = output.replace(regex, replacer);
    }
    return output;
}

function globalApplier(input) {
    let regexMediaRules = /([a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:\s*(?:[a-zA-Z0-9-]+):.+;)*)(\s*@[a-zA-Z0-9: ()%&]+\s*{\s*)(?:\s*)(\s*[&a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:(?:\s*(?:[a-zA-Z0-9-]+):.+;)|(?:\s*&[^&{}]+{[^}]+}))*\s*})/;
    let regexAmpersandNesting = /^\s*([a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:\s*(?:[a-zA-Z0-9-]+):.+;)*)(?:\s*)(\s*[&a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:(?:\s*(?:[a-zA-Z0-9-]+):.+;)|(?:\s*&[^&{}]+{[^}]+}))*\s*})/m;
    let regexCleanUp = /@[a-zA-Z0-9: ()%&]+\s*{\s*\s*}/g;
    let queries =  /([a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:\s*(?:[a-zA-Z0-9-]+):.+;)*)(\s*@[a-zA-Z0-9: ()%&]+\s*{\s*)(?:\s*)(\s*[&a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:(?:\s*(?:[a-zA-Z0-9-]+):.+;)|(?:\s*&[^&{}]+{[^}]+}))*\s*})/;
    let output = ampersander(regexMediaRules, input, replacer1);
    let nestong = /^\s*([a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:\s*(?:[a-zA-Z0-9-]+):.+;)*)(?:\s*)(\s*[&a-zA-Z0-9.:#\[="\]~>+ ,]+)(?:\s+{)((?:(?:\s*(?:[a-zA-Z0-9-]+):.+;)|(?:\s*&[^&{}]+{[^}]+}))*\s*})/m;
    output = ampersander(regexCleanUp, output, () => "");
    output = ampersander(regexAmpersandNesting, output, replacer2);
    console.log(output);
    return output;
}

export class DeStyle {

    static get regex() {
        return {
            nestRegularize: /(@nest)([^{\n]+{[^}]+})/g,
            nesting: /(^|;|})\s*([\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:\s*(?:[\w-]+):[^;]+;)*)(?:\s*)(\s*[&\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:(?:\s*(?:[\w-]+):[^;]+;)|(?:\s*&[^{}]+{[\s\S]*?}))*\s*})/,
            ///(^|;|})\s*([\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:\s*(?:[\w-]+):[^;]+;)*)(?:\s*)(\s*[&\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:(?:\s*(?:[\w-]+):[^;]+;)|(?:\s*&\s*[&\w-.#:[="\]~>+ ,*]*[\w-\]*]\s*{[^}]*}))*)\s*}/,
            cleanup: /@[\w-:( )%&]+\s*{\s*\s*}/g,
            nestCleanup: /(@nest\s?{\s?)(?:(?:|[^{}]|{[^{}]*})+)(\s})/g,
            queries: /([\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:(?:[^{@}]*)|(?:[^{@}]*{[\s\S]*?}[^{@}]*))*)(\s*@[\w-:( )%&]+\s*{\s*)(?:\s*)(\s*[&\w-.#:[="\]~>+ ,*]*[\w-\]*])(?:\s*{)((?:(?:\s*(?:[\w-]+):[^;]+;)|(?:\s*&[^&{}]+{[\s\S]*?}))*\s*})\s*}/,
            scope: /((?:^|})\s*)([^&{,}]*(?:{|,))/,
            separate: /(^)(\s*[^{}]*{)((?:[^{}]*)|(?:[^{}]*{[^{}]*})*)(\s*})/,
        }
    }

    static get normalize() {
        return (input) => {
            return input.replaceAll(/\s+/g, " ")
                .replaceAll(/(\s*)(\{|\}|;)(\s*)/g, "$2 ")
                .replaceAll(DeStyle.regex.nestRegularize, "$1 {$2}");
        }
    }

    static get replaceNesting() {
        return (_, $1, $2, $3, $4, $5) => {
            let replacement = $2.split(",");
            let target = $4.split(",");
            let result = [];
            for (let e in replacement) {
                let sel = replacement[e];
                for (let f in target) {
                    result.push(target[f].replace("&", sel));
                }
            }
            console.log(`${$1}${result.join(",")} {${$5}${$2} {${$3}`);
            return `${$1}${result.join(",")} {${$5}${$2} {${$3}`;
        }
    }

    static get replaceQueries() {
        return (_, $1, $2, $3, $4, $5) => {
            let replacement = $1.split(",");
            let target = $4.split(",");
            let result = [];
            for (let e in replacement) {
                let sel = replacement[e];
                for (let f in target) {
                    if (target[f].replace("&", sel) !== result[result.length-1]) {
                        result.push(target[f].replace("&", sel));
                    }
                }
            }
            return `${$3}${result.join(",")} {${$5}} ${$1} {${$2}`;
        }
    }

    constructor() {
        this[ELEMENT] = document.createElement("style");
        this[ELEMENT].id = "de-style";
        document.head.appendChild(this[ELEMENT]);
        this[SHEET] = this[ELEMENT].sheet;
    }

    get insertRule() {
        return ($amp) => {
            console.log("inserting:\n" + $amp);
            this[SHEET].insertRule($amp);
            return "";
        }
    }

    insert(rule) { //мы преобритем ботиночьки!!!!!!!
        let output = DeStyle.normalize(rule);

        let cyclicApply = (regex, replacer) => {
            while (output.match(regex)) {
                output = output.replace(regex, replacer);
            }
            console.log(output);
            return output;
        };
        cyclicApply(DeStyle.regex.queries, DeStyle.replaceQueries);
        cyclicApply(DeStyle.regex.cleanup, () => "");
        cyclicApply(DeStyle.regex.nestCleanup, () => "");
        console.log(output);
        cyclicApply(DeStyle.regex.nesting, DeStyle.replaceNesting);
        console.log(output);
        cyclicApply(DeStyle.regex.separate, this.insertRule);
        console.log(output);

        return this;
    }

    insertScoped(scope, rule) {
        let scopedRule = DeStyle.normalize(rule);
        //this.insert(scopedRule)
        while (scopedRule.match(DeStyle.regex.scope)) {
            scopedRule = scopedRule.replace(DeStyle.regex.scope, "$1& $2");
        }
        scopedRule = `${scope} { ${scopedRule} }`;
        console.log(scopedRule);
        return this.insert(scopedRule);
    }
}

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
                    setAtRule(selector, props);
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
            console.log(`errHere ${key}::${value}`)
            if (key.startsWith("@")) {
                console.log("errHere" + key + "::" + value)
                setAtRule(key, value);
            } else {
                setSelector(key, value);
            }
        });
    }
}
