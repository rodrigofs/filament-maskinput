(()=>{var m=(()=>{let p="9",s="A",f="S",y=[9,16,17,18,36,37,38,39,40,91,92,93],S=function(e){for(let t=0,a=y.length;t<a;t++)if(e===y[t])return!1;return!0},M=function(e){return e=e||{},e={thousandsSeparator:e.hasOwnProperty("thousandsSeparator")?e.thousandsSeparator:".",lastOutput:e.lastOutput,decimalPrecision:e.hasOwnProperty("decimalPrecision")?e.decimalPrecision:2,decimalSeparator:e.decimalSeparator||",",allowNegative:!!e.allowNegative||!1},e},i=function(e,t,a){for(;t<e.length;t++)(e[t]===p||e[t]===s||e[t]===f)&&(e[t]=a);return e},o=function(e){this.elements=e};o.prototype.unbindElementToMask=function(){let e=this;for(let t=0,a=this.elements.length;t<a;t++)this.elements[t].lastOutput="",this.elements[t].onkeyup=!1,this.elements[t].onkeydown=!1,this.elements[t].value.length&&(this.elements[t].value=this.elements[t].value.replace(/\D/g,""))},o.prototype.bindElementToMask=function(e){let t=this,a=function(r){let n=r.currentTarget;S(r.keyCode)&&setTimeout(function(){t.opts.lastOutput=n.lastOutput,n.value=u[e](n.value,t.opts),n.lastOutput=n.value},0)};for(let r=0,n=this.elements.length;r<n;r++)this.elements[r].lastOutput="",this.elements[r].onkeyup=a,this.elements[r].value.length&&(this.elements[r].value=u[e](this.elements[r].value,this.opts))},o.prototype.maskMoney=function(e){this.opts=M(e),this.bindElementToMask("toMoney")},o.prototype.maskNumber=function(){this.opts={},this.bindElementToMask("toNumber")},o.prototype.maskAlphaNum=function(){this.opts={},this.bindElementToMask("toAlphaNumeric")},o.prototype.maskPattern=function(e){this.opts={pattern:e},this.bindElementToMask("toPattern")},o.prototype.unMask=function(){this.unbindElementToMask()};let u=function(e){if(!e)throw new Error("VanillaMasker: There is no element to bind.");let t="length"in e?e.length?e:[]:[e];return new o(t)};return u.toMoney=function(e,t){t=M(t);let a=String(e);if(a.includes(t.decimalSeparator)){let[g,h]=a.split(t.decimalSeparator);return h&&h.length>t.decimalPrecision&&(h=h.substring(0,t.decimalPrecision)),a=g+t.decimalSeparator+h,a}let r="";t.allowNegative===!0&&(r="(^[^-]?)|"),a=a.replace(new RegExp(r+`([^0-9\\${t.thousandsSeparator}\\${t.decimalSeparator}])`,"g"),""),a=a.replace(new RegExp(`\\${t.thousandsSeparator}`,"g"),"").replace(new RegExp(`\\${t.decimalSeparator}`,"g"),t.thousandsSeparator);let[n,c]=a.split(t.thousandsSeparator);return n=n.replace(/\B(?=(\d{3})+(?!\d))/g,t.thousandsSeparator),a=n+(c?t.decimalSeparator+c:""),a},u.toPattern=function(e,t){let a=typeof t=="object"?t.pattern:t,r=a.replace(/\W/g,""),n=a.split(""),c=e.toString().replace(/\W/g,""),g=c.replace(/\W/g,""),h=n.length,k=typeof t=="object"?t.placeholder:void 0,d=0,l;for(l=0;l<h;l++)if(d>=c.length){if(r.length===g.length)return n.join("");if(k!==void 0&&r.length>g.length)return i(n,l,k).join("");break}else if(n[l]===p&&c[d].match(/[0-9]/)||n[l]===s&&c[d].match(/[a-zA-Z]/)||n[l]===f&&c[d].match(/[0-9a-zA-Z]/))n[l]=c[d++];else{if(n[l]===p||n[l]===s||n[l]===f)return k!==void 0?i(n,l,k).join(""):n.slice(0,l).join("");n[l]===c[d]&&d++}return n.join("").slice(0,l)},u.toNumber=function(e){return e.toString().replace(/(?!^-)[^0-9]/g,"")},u.toAlphaNumeric=function(e){return e.toString().replace(/[^a-z0-9 ]+/i,"")},u})();var v=p=>{let s=document.getElementById(p);if(!s)return console.warn(`Elemento inv\xE1lido com id: ${p}`),null;let f=(i,o,u)=>{let e=u.target,t=e.value.replace(/\D/g,""),a=e.value.length>o?1:0;m(e).unMask(),m(e).maskPattern(i[a]),e.value=m.toPattern(t,i[a])};return{dynamicMask:(i,o=1)=>{s.value.length>0&&s.value.length<o?m(s).maskPattern(i[0]):m(s).maskPattern(i[1]),s.addEventListener("input",u=>f(i,o,u),!1)},maskPattern:i=>{m(s).maskPattern(`${i}`)},maskMoney:i=>{m(s).maskMoney(i)}}};window.FilamentMaskInput=v;})();
