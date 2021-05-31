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

export function findJsVars(str) {
    let matchedNames = [...str.matchAll(/jayes-name=([a-zA-Z_$][a-zA-Z_$0-9]+)/g)];
    let names = [];
    matchedNames.forEach((name) => {
        names.push(name[1]);
    });
    return names;
}

export function templateToFunc(lines, keys) {
    return (dictvals) => {
        let retval = lines[0];
        console.log(keys);
        keys[0].forEach((key, index) => {
            retval += dictvals[key] ? dictvals[key] : ``;
            retval += lines[index + 1];
        });

        return retval;
    }
}
