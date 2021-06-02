export { literalParser, ruleInserter } from "./funcs/style.js";
export { findJsVars, templateToFunc } from "./funcs/template.js";

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

export function detachedCallback(func) {
    let callback = function(val) {
        func(val);
    }
    callback.id = Symbol();
    return callback;
}
