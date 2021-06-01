import { SHEET } from "./consts/symbols.js";

export function withValue(value, enumerate = false) {
    var $ = withValue.$ || (
        withValue.$ = {
            enumerable: enumerate,
            writable: false,
            configurable: false,
            value: value
        }
    );
    if ($.value !== value) $.value = value;

    return $;
}

export function findJsVars(lines) {
    let str = lines.join("");
    let newLines = [];

    let matchedNames = [...str.matchAll(/(<[\w-]+[ ]*(?:[\w-]+(?:=".+")?)*[ ]+)(?:@)([\w$][\w$]*)(?:@)(?=[^>]*>)/g)];
    let names = [];
    console.log(matchedNames);
    matchedNames.forEach((name) => {
        names.push(name[2]);
    });

    lines.forEach(line => newLines.push(line.replaceAll(/(<[\w-]+[ ]*(?:[\w-]+(?:=".+")?)*[ ]+)(?:@)([\w$][\w$]*)(?:@)(?=[^>]*>)/g, "$1de-name=\"$2\" ")));

    return {names: names, lines: newLines};
}

export function templateToFunc(lines, keys) {
    return (dictvals) => {
        let retval = lines[0];
        console.log(keys);
        keys.forEach((key, index) => {
            retval += dictvals[key] ? dictvals[key] : ``;
            retval += lines[index + 1];
        });

        let parser = new DOMParser();

        return parser.parseFromString(retval, "text/html").body.firstChild;
    }
}

export function ruleInserter(dest, prop) {
    if (!dest[prop]) {
        if (dest[SHEET].type === 7) {
            let index = dest[SHEET].cssRules.length;
            dest[SHEET].appendRule(prop + " {}");
            dest[prop] = dest[SHEET].cssRules[index];
        } else {
            let index = dest[SHEET].cssRules.length;
            dest[SHEET].insertRule(prop + " {}", index);
            dest[prop] = dest[SHEET].cssRules[index];
        }
    }
}

export function literalParser(input, forThe) {
    const regexAtRule = /^[ ]*([@].*[^ ":])[ ]*({)$/gm;
    const regexAmpersandRule = /^[ ]*([&].*[^ ":])[ ]*({)$/gm;
    const regexProperty = /^[ ]*([-=a-zA-Z ]+):[ ]*(.+)[ ]*$/gm;
    const regexSelector = /^[ ]*([^&}@]?.*[^ ":])[ ]*({)$/gm;
    const regexClosingBracket = /^[ ]*(})[ ]*$/gm;

    let output = input
        .replaceAll(regexAtRule, '"$1": $2')
        .replaceAll(regexAmpersandRule, '"$1": $2')
        .replaceAll(regexSelector, '"$1": $2')
        .replaceAll(regexProperty, '"$1": "$2",')
        .replaceAll(regexClosingBracket, '$1,')
        .replaceAll(/,[ ]*\n[ ]*\}/g, '\n}')
        .replaceAll(/,[ ]*$/g, '');

    console.log(output);
    let obj = JSON.parse(`{${output}}`);

    function cyclic(objInput, fatherObj, name) {
        Object.entries(objInput).forEach( ([key, val]) => {
            if ((typeof val === "object") && key.startsWith("&")) {
                let keyd = key.replace(/^&/, "");
                fatherObj[name + keyd] = val;
                Object.entries(val).forEach( ([k,v]) => {
                    if ((typeof v === "object") && k.startsWith("&")) cyclic(fatherObj[name + keyd], fatherObj, name + keyd);
                })
                delete objInput[key];
            }
        })
    }

    Object.entries(obj).forEach( ([key, val]) => {
        if (typeof val === "object") {
            let newKey = `${forThe} > ${key}`;
            obj[newKey] = val;
            delete obj[key];
            cyclic(obj[newKey], obj, newKey);
        }
    });

    return obj;
}

export function detachedCallback(func) {
    let callback = function(val) {
        func(val);
    }
    callback.id = Symbol();
    return callback;
}
