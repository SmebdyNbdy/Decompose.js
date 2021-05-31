"use strict";

import { newComponent, components } from "./decompose/newComponent.js";

export let de = {
    components: components,
    compose: newComponent, //// TODO: add style property
    //// TODO: router
}
