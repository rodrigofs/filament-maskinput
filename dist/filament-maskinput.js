(()=>{var x=Object.create;var O=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var I=(r,n)=>()=>(n||r((n={exports:{}}).exports,n),n.exports);var L=(r,n,m,v)=>{if(n&&typeof n=="object"||typeof n=="function")for(let d of V(n))!H.call(r,d)&&d!==m&&O(r,d,{get:()=>n[d],enumerable:!(v=R(n,d))||v.enumerable});return r};var $=(r,n,m)=>(m=r!=null?x(W(r)):{},L(n||!r||!r.__esModule?O(m,"default",{value:r,enumerable:!0}):m,r));var j=I((E,T)=>{(function(r,n){typeof define=="function"&&define.amd?define(n):typeof E=="object"?T.exports=n():r.VMasker=n()})(E,function(){var r="9",n="A",m="S",v=[9,16,17,18,36,37,38,39,40,91,92,93],d=function(e){for(var t=0,o=v.length;t<o;t++)if(e==v[t])return!1;return!0},b=function(e){return e=e||{},e={delimiter:e.delimiter||".",lastOutput:e.lastOutput,precision:e.hasOwnProperty("precision")?e.precision:2,separator:e.separator||",",showSignal:e.showSignal,suffixUnit:e.suffixUnit&&" "+e.suffixUnit.replace(/[\s]/g,"")||"",unit:e.unit&&e.unit.replace(/[\s]/g,"")+" "||"",zeroCents:e.zeroCents},e.moneyPrecision=e.zeroCents?0:e.precision,e},c=function(e,t,o){for(;t<e.length;t++)(e[t]===r||e[t]===n||e[t]===m)&&(e[t]=o);return e},f=function(e){this.elements=e};f.prototype.unbindElementToMask=function(){for(var e=0,t=this.elements.length;e<t;e++)this.elements[e].lastOutput="",this.elements[e].onkeyup=!1,this.elements[e].onkeydown=!1,this.elements[e].value.length&&(this.elements[e].value=this.elements[e].value.replace(/\D/g,""))},f.prototype.bindElementToMask=function(e){for(var t=this,o=function(s){s=s||window.event;var a=s.target||s.srcElement;d(s.keyCode)&&setTimeout(function(){t.opts.lastOutput=a.lastOutput,a.value=g[e](a.value,t.opts),a.lastOutput=a.value,a.setSelectionRange&&t.opts.suffixUnit&&a.setSelectionRange(a.value.length,a.value.length-t.opts.suffixUnit.length)},0)},h=0,i=this.elements.length;h<i;h++)this.elements[h].lastOutput="",this.elements[h].onkeyup=o,this.elements[h].value.length&&(this.elements[h].value=g[e](this.elements[h].value,this.opts))},f.prototype.maskMoney=function(e){this.opts=b(e),this.bindElementToMask("toMoney")},f.prototype.maskNumber=function(){this.opts={},this.bindElementToMask("toNumber")},f.prototype.maskAlphaNum=function(){this.opts={},this.bindElementToMask("toAlphaNumeric")},f.prototype.maskPattern=function(e){this.opts={pattern:e},this.bindElementToMask("toPattern")},f.prototype.unMask=function(){this.unbindElementToMask()};var g=function(e){if(!e)throw new Error("VanillaMasker: There is no element to bind.");var t="length"in e?e.length?e:[]:[e];return new f(t)};return g.toMoney=function(e,t){if(t=b(t),t.zeroCents){t.lastOutput=t.lastOutput||"";var o="("+t.separator+"[0]{0,"+t.precision+"})",h=new RegExp(o,"g"),i=e.toString().replace(/[\D]/g,"").length||0,s=t.lastOutput.toString().replace(/[\D]/g,"").length||0;e=e.toString().replace(h,""),i<s&&(e=e.slice(0,e.length-1))}var a=e.toString().replace(/[\D]/g,""),k=new RegExp("^(0|\\"+t.delimiter+")"),l=new RegExp("(\\"+t.separator+")$"),p=a.substr(0,a.length-t.moneyPrecision),u=p.substr(0,p.length%3),w=new Array(t.precision+1).join("0");p=p.substr(p.length%3,p.length);for(var M=0,C=p.length;M<C;M++)M%3===0&&(u+=t.delimiter),u+=p[M];u=u.replace(k,""),u=u.length?u:"0";var S="";if(t.showSignal===!0&&(S=e<0||e.startsWith&&e.startsWith("-")?"-":""),!t.zeroCents){var D=a.length-t.precision,P=a.substr(D,t.precision),A=P.length,N=t.precision>A?t.precision:A;w=(w+P).slice(-N)}var U=t.unit+S+u+t.separator+w;return U.replace(l,"")+t.suffixUnit},g.toPattern=function(e,t){var o=typeof t=="object"?t.pattern:t,h=o.replace(/\W/g,""),i=o.split(""),s=e.toString().replace(/\W/g,""),a=s.replace(/\W/g,""),k=0,l,p=i.length,u=typeof t=="object"?t.placeholder:void 0;for(l=0;l<p;l++)if(k>=s.length){if(h.length==a.length)return i.join("");if(u!==void 0&&h.length>a.length)return c(i,l,u).join("");break}else if(i[l]===r&&s[k].match(/[0-9]/)||i[l]===n&&s[k].match(/[a-zA-Z]/)||i[l]===m&&s[k].match(/[0-9a-zA-Z]/))i[l]=s[k++];else if(i[l]===r||i[l]===n||i[l]===m)return u!==void 0?c(i,l,u).join(""):i.slice(0,l).join("");return i.join("").substr(0,l)},g.toNumber=function(e){return e.toString().replace(/(?!^-)[^0-9]/g,"")},g.toAlphaNumeric=function(e){return e.toString().replace(/[^a-z0-9 ]+/i,"")},g})});var y=$(j(),1),z=r=>{let n=document.getElementById(r);if(!n)return console.warn(`Elemento inv\xE1lido com id: ${r}`),null;let m=(c,f,g)=>{let e=g.target,t=e.value.replace(/\D/g,""),o=e.value.length>f?1:0;(0,y.default)(e).unMask(),(0,y.default)(e).maskPattern(c[o]),e.value=y.default.toPattern(t,c[o])};return{dynamicMask:(c,f=1)=>{(0,y.default)(n).maskPattern(c[0]),n.addEventListener("input",g=>m(c,f,g),!1)},maskPattern:c=>{(0,y.default)(n).maskPattern(`${c}`)},maskMoney:c=>{(0,y.default)(n).maskMoney(c)}}};window.FilamentMaskInput=z;})();
