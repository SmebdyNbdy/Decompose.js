import{VALUE,ANNOUNCE}from"./symbols.js";import{tError}from"../tError.js";import{withValue}from"../funcs.js";import{Observable}from"../classes/Observable.js";import{ObservableValue}from"../classes/ObservableValue.js";export const PROXY={callbacks:{defineProperty:(e,r)=>(tError.e801("this.callbacks",r),!0),get:(e,r)=>e[r],set:(e,r,s)=>(s.id=Symbol(),Object.defineProperty(e,r,withValue(s,!0)),!0)},observables:{defineProperty:(e,r)=>(tError.e801("this.observables",r),!0),get:(e,r)=>new ObservableValue(e[r]),set:(e,r,s)=>(e[r]?e[r][VALUE]=s:e[r]=new Observable(s),e[r][ANNOUNCE](),!0)},components:{defineProperty(){tError.e821("componentsRegistry")},get:(e,r)=>e[r],set:()=>!0}};