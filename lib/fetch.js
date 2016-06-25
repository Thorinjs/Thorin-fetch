var tfetch=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function n(e){e.url||("/"===window.location.pathname?e.url=window.location.href.substr(0,window.location.href.length-1):e.url=window.location.href.split(window.location.pathname)[0],e.url+="/dispatch");var t=e.url.split("://"),r=t[0]+"://"+t[1].replace(/\/\//g,"/");return e.url=r,"object"===d(e.headers)&&e.headers||(e.headers={}),e.headers.Accept="application/json",e.headers["Content-Type"]="application/json","string"==typeof e.authorization&&(e.headers.Authorization="Bearer "+e.authorization),e.credentials===!0&&(e.credentials="include"),"string"!=typeof e.credentials&&(e.credentials="same-origin"),e}function o(e,t,r){if(-1===["success","error"].indexOf(t))return console.warn("thorin-fetcher: on(event, fn): event should be either error or success."),!1;if("function"!=typeof r)return console.warn("thorin-fetcher: on(event, fn): fn should be a function"),!1;var n={fn:r};return"string"==typeof e&&(n.name=e),c[t].push(n),!0}function i(e,t,r){if("undefined"!=typeof c[t]&&0!==c[t].length)for(var n=0;n<c[t].length;n++){var o=c[t][n],i="string"==typeof o.name&&o.name===e||"undefined"==typeof o.name;i&&o.fn(r)}}function s(e,t){var r=void 0;return"object"===("undefined"==typeof e?"undefined":d(e))&&e?r=e instanceof Error?e:new Error(e.message||"Failed to complete fetch request."):(e={},r=new Error(e.message||"Failed to complete fetch request")),Object.keys(e).forEach(function(t){r[t]=e[t]}),r.code||(r.code="SERVER_ERROR"),r.status||(r.status=500),t&&(r.status=t),r}function a(e,t){function r(r,n){if("string"!=typeof r)return console.error('thorin-fetcher: usage fetcher("actionName", {payload})'),this;if("undefined"!=typeof n&&null!=n||(n={}),"object"!==("undefined"==typeof n?"undefined":d(n))&&!n)return console.error("thorin-fetcher: payload must be an object."),this;var o={type:r,payload:n},a=void 0,u=void 0;return new Promise(function(r,n){fetch(e.url,{method:"POST",headers:e.headers,body:JSON.stringify(o),credentials:e.credentials}).then(function(e){return console.log("RES",e),a=e.status,u=e.statusText,e.json()}).then(function(e){if(e.error)throw e.error;return delete e.type,"undefined"==typeof e.meta?(i(t,"success",e.result),r(e.result)):(i(t,"success",e),void r(e))})["catch"](function(e){var r=s(e,a);i(t,"error",r),n(r)})})}return n(e),r.setConfig=function(t,r){return"string"==typeof t&&"string"!=typeof r?("authorization"===t?e.headers.Authorization="Bearer "+r:e[t]=r,this):(console.warn("thorin-fetcher: usage: setConfig(key, value)"),this)},r.on=o.bind(this,t),r}function u(e){n(e),e.name||(e.name="asset"),delete e.headers["Content-Type"];var t={},r="upload"+l;return l++,t.send=function(t){return new Promise(function(n,o){if("object"!==("undefined"==typeof t?"undefined":d(t))||!t||"string"!=typeof t.type||"string"!=typeof t.name)return o(s(new Error("Please select a file to upload.")));var a=new FormData;a.append(e.name,t);var u=void 0,f=void 0,h={method:"POST",headers:e.headers,credentials:e.credentials,body:a};fetch(e.url,h).then(function(e){return u=e.status,f=e.statusText,console.log("RRES",e),e.json()}).then(function(e){if(e.error)throw e.error;return delete e.type,"undefined"==typeof e.meta?(i(r,"success",e.result),n(e.result)):(i(r,"success",e),void n(e))})["catch"](function(e){var t=s(e,u);i(r,"error",t),o(t)})})},t.on=o.bind(this,r),t}function f(e,t){if("string"==typeof e&&"undefined"==typeof t)return h[e]||null;if(l++,"object"===("undefined"==typeof e?"undefined":d(e))&&e&&"undefined"==typeof t)return a(e,"fetcher"+l);if("string"==typeof e&&"object"===("undefined"==typeof t?"undefined":d(t))&&t){if("undefined"!=typeof h[e])return console.warn("thorin-fetch: fetcher called "+e+" already exists. Returning it in stead."),h[e];var r=a(t,e);return h[e]=r,r}console.error("thorin-fetcher: invalid arguments for fetcher()")}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};r(2);var h={},c={error:[],success:[]},l=0;e.exports=f,e.exports.upload=u,e.exports.on=o.bind(e.exports,void 0)},function(e,t){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function r(e){return"string"!=typeof e&&(e=String(e)),e}function n(e){this.map={},e instanceof n?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function o(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function i(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function s(e){var t=new FileReader;return t.readAsArrayBuffer(e),i(t)}function a(e){var t=new FileReader;return t.readAsText(e),i(t)}function u(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,"string"==typeof e)this._bodyText=e;else if(p.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(p.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(e){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type&&this.headers.set("content-type",this._bodyBlob.type))},p.blob?(this.blob=function(){var e=o(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var e=o(this);if(e)return e;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var e=o(this);return e?e:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(h)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(e){var t=e.toUpperCase();return y.indexOf(t)>-1?t:e}function d(e,t){t=t||{};var r=t.body;if(d.prototype.isPrototypeOf(e)){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new n(e.headers)),this.method=e.method,this.mode=e.mode,r||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=e;if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new n(t.headers)),this.method=f(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function h(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function c(e){var t=new n,r=e.getAllResponseHeaders().trim().split("\n");return r.forEach(function(e){var r=e.trim().split(":"),n=r.shift().trim(),o=r.join(":").trim();t.append(n,o)}),t}function l(e,t){t||(t={}),this.type="default",this.status=t.status,this.ok=this.status>=200&&this.status<300,this.statusText=t.statusText,this.headers=t.headers instanceof n?t.headers:new n(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){n.prototype.append=function(e,n){e=t(e),n=r(n);var o=this.map[e];o||(o=[],this.map[e]=o),o.push(n)},n.prototype["delete"]=function(e){delete this.map[t(e)]},n.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},n.prototype.getAll=function(e){return this.map[t(e)]||[]},n.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},n.prototype.set=function(e,n){this.map[t(e)]=[r(n)]},n.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(n){e.call(t,n,r,this)},this)},this)};var p={blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e},y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this)},u.call(d.prototype),u.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},l.error=function(){var e=new l(null,{status:0,statusText:""});return e.type="error",e};var m=[301,302,303,307,308];l.redirect=function(e,t){if(-1===m.indexOf(t))throw new RangeError("Invalid status code");return new l(null,{status:t,headers:{location:e}})},e.Headers=n,e.Request=d,e.Response=l,e.fetch=function(e,t){return new Promise(function(r,n){function o(){return"responseURL"in s?s.responseURL:/^X-Request-URL:/m.test(s.getAllResponseHeaders())?s.getResponseHeader("X-Request-URL"):void 0}var i;i=d.prototype.isPrototypeOf(e)&&!t?e:new d(e,t);var s=new XMLHttpRequest;s.onload=function(){var e=1223===s.status?204:s.status;if(100>e||e>599)return void n(new TypeError("Network request failed"));var t={status:e,statusText:s.statusText,headers:c(s),url:o()},i="response"in s?s.response:s.responseText;r(new l(i,t))},s.onerror=function(){n(new TypeError("Network request failed"))},s.open(i.method,i.url,!0),"include"===i.credentials&&(s.withCredentials=!0),"responseType"in s&&p.blob&&(s.responseType="blob"),i.headers.forEach(function(e,t){s.setRequestHeader(t,e)}),s.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}]);