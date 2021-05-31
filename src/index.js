"use strict";

import { newComponent, componentsRegistry } from "./decompose/newComponent.js";

export let de = {
    components: componentsRegistry,
    compose: newComponent, //// TODO: add style property
    //// TODO: router
}
