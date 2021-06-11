import { ELEMENT, SHEET } from "../consts/symbols.js";

export class Style {

    static get regex() {
        return {
            //atNest: /(@nest)([^{\n]+{[^}]+})/g,
            //oldNesting: /(^|;|})\s*([\w\-.#:[="\]~>+ ,*]*[\w\-\]*])(?:\s*{)((?:\s*(?:[\w-]+):[^;]+;)*)(?:\s*)(\s*[&\w\-.#:[="\]~>+ ,*]*[\w\-\]*])(?:\s*{)((?:(?:\s*(?:[\w-]+):[^;]+;)|(?:\s*&[^{}]+{[\s\S]*?}))*\s*})/,
            nesting: /(\s*§)([^{@§}]+)(§\s*{\s*)((?:[-\w]+:[^;]+;\s*)*)(§)([^{§}]+)(§\s*{\s*(?:[-\w]+:[^;]+;\s*)*})/,
            //queryCleanup: /@[\w\-:( )%&]+\s*{\s*}/g,
            cleanup: /\s*§[^{§}]+§\s*{\s*}/g,
            //nestCleanup: /(@nest\s?{\s?)(?:(?:|[^{}]|{[^{}]*})+)(\s})/g,
            //oldQueries: /([\w\-.#:[="\]~>+ ,*]*[\w\-\]*])(?:\s*{)((?:(?:[^{@}]*)|(?:[^{@}]*{[\s\S]*?}[^{@}]*))*)(\s*@[\w\-:( )%&]+\s*{\s*)(?:\s*)(\s*[&\w\-.#:[="\]~>+ ,*]*[\w\-\]*])(?:\s*{)((?:(?:\s*(?:[\w-]+):[^;]+;)|(?:\s*&[^&{}]+{[\s\S]*?}))*\s*})\s*}/,
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

    static get oldReplaceNesting() {
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
            return `${$1}${result.join(",")} {${$5}${$2} {${$3}`;
        }
    }

    static get oldReplaceQueries() {
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
        let t0 = Date.now();

        let cyclicApply = (regex, replacer) => {
            while (output.match(regex)) {
                output = output.replace(regex, replacer);
            }
            output = output.replaceAll(Style.regex.cleanup, "");
            return output;
        };
        cyclicApply(Style.regex.nesting, Style.replaceNesting);
        console.log(output);
        if (output.includes("@")) {
            cyclicApply(Style.regex.queries, Style.replaceQueries);
            console.log(output);
            cyclicApply(Style.regex.nesting, Style.replaceNesting);
            console.log(output);
        }
        output = output.replaceAll(Style.regex.unmarkSelectors, "$1");
        console.log(output);
        cyclicApply(Style.regex.separate, this.insertRule);
        console.log(output);

        let t1 = Date.now();
        console.log(`stylesheet build time is ${(t1-t0)/100} s`)
        return this;
    }

    insertScoped(scope, rule) {
        let scopedRule = rule.replaceAll(/\s+/g, " ");
        console.log(scopedRule);//Style.normalize(rule);
        while (scopedRule.match(Style.regex.scope)) {
            scopedRule = scopedRule.replace(Style.regex.scope, "$1& $2");
        }
        scopedRule = `${scope} { ${scopedRule} }`;
        console.log(scopedRule);
        return this.insert(scopedRule);
    }
}
