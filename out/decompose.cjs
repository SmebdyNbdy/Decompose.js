var e=Symbol(),t=Symbol(),n=Symbol(),r=Symbol(),o=Symbol(),i=Symbol(),c=Symbol(),u=Symbol(),a=function(e,t){console.log("TERROR-801::Attempted to use Object.defineProperty on "+e+", please use the default setter ('"+e+"."+t+" = ') instead")},s=function(e){console.log("TERROR-821::"+e+" is not a valid callback!")};function l(e,t){void 0===t&&(t=!1);var n=l.$||(l.$={enumerable:t,writable:!1,configurable:!1,value:e});return n.value!==e&&(n.value=e),n}var f=function(){function i(n){return this[t]={},this[e]=n,Object.seal(this),this}var c=i.prototype;return c[n]=function(){var n=this;Object.getOwnPropertySymbols(this[t]).forEach(function(r){return n[t][r](n[e])})},c[r]=function(e){this[t][e.id]=e},c[o]=function(e){delete this[t][e.id]},c.valueOf=function(){return this[e]},c.toString=function(){return this[e]},c.toLocaleString=function(){return this[e]},i}(),p=function(){function t(t){var n=this;this.value=t[e];var i=function(e){return!!e.id||(s(e),!1)};return Object.defineProperty(this,"addObserver",l(function(e){return i(e)&&t[r](e),n},!0)),Object.defineProperty(this,"deleteObserver",l(function(e){return i(e)&&t[o](e),n},!0)),this}var n=t.prototype;return n.valueOf=function(){return this.value},n.toLocaleString=function(){return this.value},n.toString=function(){return this.value},t}(),b={callbacks:{defineProperty:function(e,t){return a("this.callbacks",t),!0},get:function(e,t){return e[t]},set:function(e,t,n){return n.id=Symbol(),Object.defineProperty(e,t,l(n,!0)),!0}},observables:{defineProperty:function(e,t){return a("this.observables",t),!0},get:function(e,t){return new p(e[t])},set:function(t,r,o){return t[r]?t[r][e]=o:t[r]=new f(o),t[r][n](),!0}},components:{defineProperty:function(){s("componentsRegistry")},get:function(e,t){return e[t]},set:function(){return!0}}};function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t&&h(e.prototype,t),n&&h(e,n),e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function O(e,t,n){return(O=d()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&y(o,n.prototype),o}).apply(null,arguments)}function g(e){var t="function"==typeof Map?new Map:void 0;return(g=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return O(e,arguments,v(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),y(n,e)})(e)}var j=regeneratorRuntime.mark(P);function P(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=0;case 1:return t.next=3,"GID"+e+Date.now()+e;case 3:e+=1;case 4:t.next=1;break;case 6:case"end":return t.stop()}},j)}var k=P(),w={val:"",get:function(){return this.val=k.next().value,this.val}},S=function(){function e(e,t){var n=this;this[i]=Object.create(null),this[c]=Object.create(null),this.callbacks=new Proxy(this[i],b.callbacks),this.observables=new Proxy(this[c],b.observables),this.properties={components:{}};var r=0;return t.forEach(function(o,i){var c,u;switch(typeof o){case"string":c=[].concat(e[i].matchAll(/<$/g)),u=[].concat(e[i+1].matchAll(/^>/g)),c[0]&&u[0]?(w.get(),n.properties[o]='gid value="'+w.val+'"></gid',n.properties.components[o]='gid[value="'+w.val+'"]'):n.properties[o]="";break;case"function":n.properties["cProp"+r]=o();break;case"object":n.properties["cProp"+r]=o.$;break;default:n.properties["cProp"+r]=o,t[i]="cProp"+r,r+=1}}),console.log(this.properties),this[u]=function(e,t){return function(n){var r=e[0];return console.log(t),t.forEach(function(t,o){r+=n[t]?n[t]:"",r+=e[o+1]}),(new DOMParser).parseFromString(r,"text/html").body.firstChild}}(e,t),this.elements=[],function(e){var t=[].concat(e.matchAll(/jayes-name=([a-zA-Z_$][a-zA-Z_$0-9]+)/g)),n=[];return t.forEach(function(e){n.push(e[1])}),n}(e.join(".")).forEach(function(e){return n.elements.push(e)}),this}var t=e.prototype;return t.setName=function(e){return this.Name=e,customElements.define("d-"+this.Name,function(e){var t,n;function r(){return e.apply(this,arguments)||this}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,y(t,n),r}(g(HTMLElement))),this.element=document.createElement("d-"+this.Name),this},t.setOnLoad=function(e){return this.onLoad=e,this},m(e,[{key:"name",get:function(){return this.Name}}]),e}();function E(e){var t=new S(e.lines,e.keys).setName(e.name);return e.onLoad&&t.setOnLoad(e.onLoad),e.callbacks&&Object.entries(e.callbacks).forEach(function(e){t.callbacks[e[0]]=e[1]}),e.observables&&Object.entries(e.observables).forEach(function(e){t.observables[e[0]]=e[1]}),function(){function e(e){var n=this;this.properties={};var r={};Object.assign(this.properties,t.properties),e&&e.components?(Object.assign(r,e.components),delete e.components):Object.assign(r,t.properties.components),e&&Object.entries(e).forEach(function(e){var t=e[1];t&&(n.properties[e[0]]=t)}),this.element=document.createElement("d-"+t.name),this.element.appendChild(t[u](this.properties)),Object.entries(r).forEach(function(e){var t=e[1],r=n.element.querySelector(n.properties.components[e[0]]);r&&(t&&"object"==typeof t&&(r.insertAdjacentElement("afterend",t.element),t.onLoad&&t.onLoad()),r.remove())}),this.elements={},t.elements.forEach(function(e){n.elements[e]=n.element.querySelector('[jayes-name="'+e+'"]')}),this.callbacks=new Proxy(Object.create(null),b.callbacks),Object.entries(t[i]).forEach(function(e){var t=e[0],r=e[1].bind(n);n.callbacks[t]=r}),this.observables=new Proxy(Object.create(null),b.observables),Object.entries(t[c]).forEach(function(e){n.observables[e[0]]=e[1]});var o=t.onLoad;return o&&(this.onLoad=o.bind(this)),this}var n=e.prototype;return n.toString=function(){return this.element.outerHTML},n.toLocaleString=function(){return this.element.outerHTML},n.valueOf=function(){return this.element},m(e,[{key:"name",get:function(){return t.name}}]),e}()}var L=Object.create(null),x=new Proxy(L,b.components);exports.de={components:x,compose:function(e){var t=arguments;return function(n){return n.lines=e,n.keys=[].slice.call(t,1),L[n.name]=E(n),x}}};
