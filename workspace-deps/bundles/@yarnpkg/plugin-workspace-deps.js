/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-workspace-deps",
factory: function (require) {
var plugin;plugin=(()=>{"use strict";var e={968:(e,r,t)=>{t.r(r),t.d(r,{default:()=>i});const o=require("util"),s=require("fs"),n=require("path"),a=(0,o.promisify)(s.writeFile),i={hooks:{afterAllInstalled:async e=>{await Promise.all(e.workspaces.map(async r=>{let t=new Set;for(const[o,s]of r.dependencies)t.add(e.storedResolutions.get(s.descriptorHash));for(const r of t){const o=e.storedPackages.get(r);for(const[r,s]of o.dependencies)t.add(e.storedResolutions.get(s.descriptorHash))}const o=Array.from(t).map(r=>{const t=e.storedPackages.get(r);return`${t.scope?`@${t.scope}/${t.name}`:t.name}:${r}`}).join("\n");await a((0,n.join)(r.cwd,"workspace-deps.txt"),o)}))}}}}},r={};function t(o){if(r[o])return r[o].exports;var s=r[o]={exports:{}};return e[o](s,s.exports,t),s.exports}return t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(968)})();
return plugin;
}
};