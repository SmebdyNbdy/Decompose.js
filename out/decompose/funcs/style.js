import{SHEET}from"../consts/symbols.js";export function literalParser(e,l){let t=e.replaceAll(/[\s\n]+/g," ").replaceAll(/(;|{|})(\S)/g,"$1 $2").replaceAll(/(;|{|})(\s)/g,"$1\n").replaceAll(/("([^";]*)")/g,"'$2'").replaceAll(/(")/g,"\\$1").replaceAll(/^[ ]*([@].*[^ ":])[ ]*({)$/gm,'"$1": $2').replaceAll(/^[ ]*([&].*[^ ":])[ ]*({)$/gm,'"$1": $2').replaceAll(/^[ ]*([^&}@]?.*[^ ":])[ ]*({)$/gm,'"$1": $2').replaceAll(/^[ ]*([-=a-zA-Z ]+):[ ]*([^;]+);[ ]*$/gm,'"$1": "$2",').replaceAll(/^[ ]*(})[ ]*$/gm,"$1,").replaceAll(/,[ ]*\n[ ]*\}/g,"\n}").replaceAll(/,[ ]*$/g,"");console.log(t);let r=JSON.parse(`{${t}}`);function s(e,l,t){Object.entries(e).forEach((([r,c])=>{if("object"==typeof c&&r.startsWith("&")){let a=r.replace(/^&/,"");l[t+a]=c,Object.entries(c).forEach((([e,r])=>{"object"==typeof r&&e.startsWith("&")&&s(l[t+a],l,t+a)})),delete e[r]}}))}return Object.entries(r).forEach((([e,t])=>{if("object"==typeof t){let c=`${l} > ${e}`;r[c]=t,delete r[e],s(r[c],r,c)}})),r}export function ruleInserter(e,l){if(!e[l])if(7===e[SHEET].type){let t=e[SHEET].cssRules.length;e[SHEET].appendRule(l+" {}"),e[l]=e[SHEET].cssRules[t]}else{let t=e[SHEET].cssRules.length;e[SHEET].insertRule(l+" {}",t),e[l]=e[SHEET].cssRules[t]}}