export function withValue(e,a=!1){var t=withValue.$||(withValue.$={enumerable:a,writable:!1,configurable:!1,value:e});return t.value!==e&&(t.value=e),t}export function findJsVars(e){let a=[...e.matchAll(/jayes-name=([a-zA-Z_$][a-zA-Z_$0-9]+)/g)],t=[];return a.forEach((e=>{t.push(e[1])})),t}export function templateToFunc(e,a){return t=>{let r=e[0];return console.log(a),a.forEach(((a,u)=>{r+=t[a]?t[a]:"",r+=e[u+1]})),r}}