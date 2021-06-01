"use strict";

import { newComponent, components } from "./decompose/newComponent.js";
import { state } from "./decompose/state.js";
import { detachedCallback } from "./decompose/funcs.js";

export let de = {
    components: components,
    compose: newComponent,
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
