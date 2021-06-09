import { SHEET } from "../consts/symbols.js";

let sizer = () => {
    let mh = window.innerHeight * 0.01;
    let mw = window.innerWidth * 0.01;
    document.body.style.setProperty("--mh", mh + "px");
    document.body.style.setProperty("--mw", mw + "px");
};

sizer();
window.onresize = sizer;

export function literalParser(input, forThe) {
    const regexAtRule = /^[ ]*([@].*[^ ":])[ ]*({)$/gm;
    const regexAmpersandRule = /^[ ]*([&].*[^ ":])[ ]*({)$/gm;
    const regexProperty = /^[ ]*([-=a-zA-Z ]+):[ ]*([^;]+);[ ]*$/gm;
    const regexSelector = /^[ ]*([^&}@]?.*[^ ":])[ ]*({)$/gm;
    const regexClosingBracket = /^[ ]*(})[ ]*$/gm;
    const regexSizer = /(\d+)( *v)(h|w)/gm;

    let output = input
        .replaceAll(/[\s\n]+/g, " ")
        .replaceAll(/(;|{|})(\S)/g, "$1 $2")
        .replaceAll(/(;|{|})(\s)/g, "$1\n")
        .replaceAll(/("([^";]*)")/g, "'$2'")
        .replaceAll(/(")/g, "\\$1")
        .replaceAll(regexSizer, ' calc($1 * var(--m$3) ) ')
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
                let keyd = key.replaceAll(/&/g, name);
                //fatherObj[keyd] = val;
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
            let newKey;
            if (forThe) {
                newKey = `${forThe} > ${key}`;
                obj[newKey] = val;
                delete obj[key];
            } else {
                newKey = key;
            }
            cyclic(obj[newKey], obj, newKey);
        }
    });

    return obj;
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
