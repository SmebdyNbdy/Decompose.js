"use strict";import{newComponent,components}from"./decompose/funcs/components.js";import{router,page}from"./decompose/router.js";import{state}from"./decompose/state.js";import{detachedCallback}from"./decompose/funcs.js";import*as deif from"./decompose/de-if.js";export let de={components:components,compose:newComponent,router:router,page:page,globs:{},deps:[],load:async e=>(await import(e)).default.bind(de),async loader(e){let o=async function*(e){for(let o of e)yield await de.load(o)}(e);for await(let e of o)e()},async loaded(){await de.loader(de.deps),customElements.define("de-compose",class extends HTMLElement{}),new MutationObserver((e=>{document.body.dispatchEvent(new Event("attached"))})).observe(document.body,{childList:!0,attributes:!1,subtree:!0}),de.main(de),console.log(state),de.loaded=!0},detachedCallback:detachedCallback,state:state,main:void 0};Object.seal(de),window.addEventListener("DOMContentLoaded",de.loaded);