export function findJsVars(lines) {
    let str = lines.join("");
    let newLines = [];

    let matchedNames = [...str.matchAll(/(<[\w-]+[ ]*(?:[\w-]+(?:=".+")?)*[ ]+)(?:@)([\w$][\w$]*)(?:@)(?=[^>]*>)/g)];
    let names = [];
    console.log(matchedNames);
    matchedNames.forEach((name) => {
        names.push(name[2]);
    });

    lines.forEach(line => newLines.push(line.replaceAll(/(<[\w-]+[ ]*(?:[\w-]+(?:=".+")?)*[ ]+)(?:@)([\w$][\w$]*)(?:@)(?=[^>]*(?:>|$))/g, "$1de-name=\"$2\" ")));

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
