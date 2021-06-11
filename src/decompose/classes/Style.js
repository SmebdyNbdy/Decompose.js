import { ELEMENT, SHEET } from "../consts/symbols.js";

export class Style {

    static get regex() {
        return {
            nesting: /(\s*§)([^{@§}]+)(§\s*{\s*)((?:[-\w]+:[^;]+;\s*)*)(§)([^{§}]+)(§\s*{\s*(?:[-\w]+:[^;]+;\s*)*})/,
            cleanup: /\s*§[^{§}]+§\s*{\s*}/g,
            queries: /(§[^{§@}]+§)(\s*{.*[^{§@}]*)(§@[^§@]+§)(\s*{)((?:\s*§[^{§}]*§\s*{(?:\s*[\w-]+:[^;]*;)*\s*})*)(\s*})/,
            markSelectors: /(^|;|{|})(?:\s*)([\w\-#.[\]="~>+:@&]+[@&\w\-#.,[\]="~>+ :]*[&\w\]*])(?:\s*)(?={)/g,
            unmarkSelectors: /§([^{§}]+)§/g,
            scope: /((?:^|})\s*)([^@&{,}]*)(?={|,)/,
            separate: /(^)(\s*[^{}]*{)((?:[^{}]*)|(?:[^{}]*{[^{}]*})*)(\s*})/,
        }
    }

    static get normalize() {
        return (input) => {
            return input.replaceAll(/\s+/g, " ")
                .replaceAll(/(\s*)(\{|\}|;)(\s*)/g, "$2 ")
                .replaceAll("@nest", "")
                .replaceAll(Style.regex.markSelectors, "$1 §$2§");
        }
    }

    static get replaceQueries() {
        return "$3$4 $1 {$5$6 } $1$2";
    }

    static get replaceNesting() {
        return (_, $1, $2, $3, $4, $5, $6, $7) => {
            let replacementRaw = $2.replaceAll("§", "");
            let targetRaw = $6.replaceAll("§", "");
            let replacement = replacementRaw.split(",");
            let target = targetRaw.split(",");
            let result = [];
            for (let e in replacement) {
                let sel = replacement[e];
                for (let f in target) {
                    result.push(target[f].replace("&", sel));
                }
            }
            return `${$1}${$2}${$3}${$4}}${$1}${result.join(",")}${$7}${$1}${$2}${$3}`;
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
            this[SHEET].insertRule($amp);
            return "";
        }
    }

    insert(rule) { //мы преобритем ботиночьки!!!!!!!
        let output = Style.normalize(rule);

        let cyclicApply = (regex, replacer) => {
            while (output.match(regex)) {
                output = output.replace(regex, replacer);
            }
            output = output.replaceAll(Style.regex.cleanup, "");
            return output;
        };
        cyclicApply(Style.regex.nesting, Style.replaceNesting);
        if (output.includes("@")) {
            cyclicApply(Style.regex.queries, Style.replaceQueries);
            cyclicApply(Style.regex.nesting, Style.replaceNesting);
        }
        output = output.replaceAll(Style.regex.unmarkSelectors, "$1");
        console.log(output);

        cyclicApply(Style.regex.separate, this.insertRule);
        return this;
    }

    insertScoped(scope, rule) {
        let scopedRule = rule.replaceAll(/\s+/g, " ");
        while (scopedRule.match(Style.regex.scope)) {
            scopedRule = scopedRule.replace(Style.regex.scope, "$1& $2");
        }
        scopedRule = `${scope} { ${scopedRule} }`;
        return this.insert(scopedRule);
    }
}
