(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getRegisteredBlockComponents:()=>n,registerBlockComponent:()=>a,registerInnerBlock:()=>s});const o={};function n(e){return{..."object"==typeof o[e]&&Object.keys(o[e]).length>0?o[e]:{},...o.any}}const r=window.wp.deprecated;var c=e.n(r);function a(e){e.context||(e.context="any"),l(e,"context","string"),l(e,"blockName","string"),i(e,"component");const{context:t,blockName:n,component:r}=e;o[t]||(o[t]={}),o[t][n]=r}const i=(e,t)=>{if(e[t]){if("function"==typeof e[t])return;if(e[t].$$typeof&&e[t].$$typeof===Symbol.for("react.lazy"))return}throw new Error(`Incorrect value for the ${t} argument when registering a block component. Component must be a valid React Element or Lazy callback.`)},l=(e,t,o)=>{const n=typeof e[t];if(n!==o)throw new Error(`Incorrect value for the ${t} argument when registering a block component. It was a ${n}, but must be a ${o}.`)};function s(e){c()("registerInnerBlock",{version:"2.8.0",alternative:"registerBlockComponent",plugin:"WooCommerce Blocks",hint:'"main" has been replaced with "context" and is now optional.'}),l(e,"main","string"),a({...e,context:e.main})}(this.ywcas=this.ywcas||{}).ywcasBlocksRegistry=t})();