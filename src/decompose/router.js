import { PROXY } from "./consts/proxy.js";
import { state } from "./state.js";
import { componentMaker } from "./componentMaker.js";

let pageRegistry = Object.create(null);
var pages = new Proxy(pageRegistry, PROXY.components);
export var page = {elements: {page: document.querySelector("de-compose")}};

var innerHead, upd;

function newPage(lines, ...keys) {
    return (args) => {
        let newLines = lines.flat();
        newLines.unshift(`<de-compose @page@ de-page="${args.name}">${newLines.shift()}`);
        newLines.push(`${newLines.pop()}</de-compose>`);

        args.lines = newLines;
        args.keys = keys;
        let pageTemplate = componentMaker(args);
        pageRegistry[args.name] = {
            load(props) {
                document.title = args.title;
                let loaded = new pageTemplate(props);
                page.elements.page.insertAdjacentElement("afterend", loaded.elements.page);
                page.elements.page.remove();
                page = loaded;
            }
        }
    }
}

function navigate(pageName) {
    pages[pageName].load(state.props);
    state.url = new URL(location.protocol + location.host + location.pathname + `/#/${pageName}`);
    if (upd) upd();
    window.onpopstate = () => {
        console.log(location.hash);
        if (location.hash !== `#${pageName}`)
            navigate(location.hash);
    }
}

export var router = {
    set head(val) {
        innerHead = val;
        page.element.insertAdjacentElement("beforebegin", innerHead.element);
        upd = innerHead.callbacks.onLoad;
    },
    get head() {
        return innerHead;
    },
    pages: pages,
    newPage: newPage,
    navigate: navigate,
}
