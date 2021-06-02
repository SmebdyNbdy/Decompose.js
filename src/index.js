"use strict";

import { newComponent, components} from "./decompose/funcs/components.js";
import { router, page } from "./decompose/router.js";
import { state } from "./decompose/state.js";
import { detachedCallback } from "./decompose/funcs.js";

import * as deif from "./decompose/de-if.js";

export let de = {
    components: components,
    compose: newComponent,
    router: router,
    page: page,
    //// TODO: router
    globs: {},
    deps: [],
    async load(url) {
        let setter = await import(url);
        return setter.default.bind(de);;
    },
    async loader(urlList) {
        async function* batchLoader(batch) {
            for (let url of batch) {
                yield await de.load(url);
            }
        }
        let batchLoaded = batchLoader(urlList);
        for await (let loaded of batchLoaded) {
            loaded();
        }
    },
    async loaded() {
        await de.loader(de.deps);
        customElements.define("de-compose", class deCompose extends HTMLElement {});

        let oberver = new MutationObserver((mut) => {
            document.body.dispatchEvent(new Event("attached"));
        });
        oberver.observe(document.body, {
            childList: true,
            attributes: false,
            subtree: true,
        });

        de.main(de);
        console.log(state);
        de.loaded = true;
    },
    detachedCallback: detachedCallback,
    state: state,
    main: undefined
}

Object.seal(de);

window.addEventListener("DOMContentLoaded", de.loaded);
