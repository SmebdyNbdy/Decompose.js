import{tError}from"./tError.js";window.history.pushState('{ "de$": [ "file:///Users/alexgavrikov/Developer/lampasch/ledit/ledit/test.html" ] }',"");let proxyState={get(t,e){let r=JSON.parse(window.history.state);return console.log(r),console.log(t[e]),r.de$[t[e]]},set(t,e,r){if("function"==typeof r||"symbol"==typeof r)return tError.e703(),!1;let o=JSON.parse(window.history.state);return"url"===e?o.de$[0]=r:t[e]?o.de$[t[e]]=r:(t[e]=o.de$.length,o.de$.push(r)),window.history.pushState(JSON.stringify(o),"",o.de$[0]),!0}},stateObj=Object.create(null);stateObj.url=0;export var state=new Proxy(stateObj,proxyState);