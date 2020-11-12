/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-workspace-deps",
factory: function (require) {
var plugin;plugin=(()=>{"use strict";var e={968:(e,r,o)=>{o.r(r),o.d(r,{default:()=>i});const t=require("util"),s=require("fs"),n=require("path"),a=(0,t.promisify)(s.writeFile),i={hooks:{afterAllInstalled:async e=>{await Promise.all(e.workspaces.map(async r=>{let o=new Set;for(const[t,s]of r.dependencies)o.add(e.storedResolutions.get(s.descriptorHash));for(const r of o){const t=e.storedPackages.get(r);for(const[r,s]of t.dependencies)o.add(e.storedResolutions.get(s.descriptorHash))}await a((0,n.join)(r.cwd,"dep-hash.workspace"),Array.from(o).join("\n"))}))}}}}},r={};function o(t){if(r[t])return r[t].exports;var s=r[t]={exports:{}};return e[t](s,s.exports,o),s.exports}return o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(968)})();
return plugin;
}
};