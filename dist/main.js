module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var defaultImplementation = {
    registerComponent: function registerComponent(name, component) {
        customElements.define(name, component);
    },
    isCustomComponent: function isCustomComponent(node) {
        return node.nodeName.includes("-");
    }
};

var currentImplementation = defaultImplementation;

var registerComponent = function registerComponent(name, component) {
    return currentImplementation.registerComponent(name, component);
};

var setImplementation = exports.setImplementation = function setImplementation(implementation) {
    currentImplementation = implementation;
};

var currentReadyCheck = function currentReadyCheck() {
    if ('customElements' in window) {
        return Promise.resolve();
    }
    return new Promise() < null > function (resolve) {
        __webpack_require__(4).then(function () {
            window.addEventListener('WebComponentsReady', resolve);
        });
    };
};

var componentsReady = exports.componentsReady = function componentsReady() {
    return currentReadyCheck();
};

var setReadyCheck = exports.setReadyCheck = function setReadyCheck(readyCheck) {
    currentReadyCheck = readyCheck;
};

exports.default = registerComponent;
var isCustomComponent = exports.isCustomComponent = function isCustomComponent(node) {
    return currentImplementation.isCustomComponent(node);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var stubImplementation = {
    reducers: {},
    subscriptions: {},
    addReducer: function addReducer(key, reducer) {
        this.reducers[key] = reducer;
    },
    removeReducer: function removeReducer(key) {
        delete this.reducers[key];
        return false;
    },
    subscribe: function subscribe(key, cb) {
        var _this = this;

        if (!this.subscriptions[key]) {
            this.subscriptions[key] = [];
        }
        this.subscriptions[key].push(cb);
        return {
            unsubscribe: function unsubscribe() {
                _this.subscriptions[key] = _this.subscriptions[key].filter(function (el) {
                    return el !== cb;
                });
            }
        };
    },
    getState: function getState(key) {},
    migrate: function migrate(newStore) {
        for (var _key in this.reducers) {
            var _reducer = this.reducers[_key];
            newStore.addReducer(_key, _reducer);
        }
        for (var _key2 in this.subscriptions) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.subscriptions[_key2][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var subscription = _step.value;

                    newStore.subscribe(_key2, subscription);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        return newStore;
    }
};

var store = {
    currentImplementation: stubImplementation
};

var setImplementation = exports.setImplementation = function setImplementation(implementation) {
    store.currentImplementation = store.currentImplementation.migrate(implementation);
};

var registerReducer = exports.registerReducer = function registerReducer(key, reducer) {
    store.currentImplementation.addReducer(key, reducer);
};
var removeReducer = exports.removeReducer = function removeReducer(key) {
    store.currentImplementation.removeReducer(key);
};
var subscribe = exports.subscribe = function subscribe(key, cb) {
    return store.currentImplementation.subscribe(key, cb);
};
var getState = exports.getState = function getState(key) {
    return store.currentImplementation.getState(key);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = html;

var _handlers = __webpack_require__(7);

function html(strings) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!args.length) {
        return strings[0];
    }

    var ARG = "__ARG__";
    var tpl = "";
    for (var i = 0; i < strings.length; i++) {
        tpl += strings[i];
        if (i < strings.length - 1) {
            if (typeof args[i] === "function" || _typeof(args[i]) === "object") tpl += ARG + i;else tpl += args[i];
        }
    }
    var template = document.createElement("template");
    template.innerHTML = tpl;
    (0, _handlers.callHandlers)(template.content, args);
    return template;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _webComponents = __webpack_require__(0);

Object.defineProperty(exports, "changeWebComponentsImplemenation", {
    enumerable: true,
    get: function get() {
        return _webComponents.setImplementation;
    }
});
Object.defineProperty(exports, "componentsReady", {
    enumerable: true,
    get: function get() {
        return _webComponents.componentsReady;
    }
});
Object.defineProperty(exports, "changeWebComponentsReadyCheck", {
    enumerable: true,
    get: function get() {
        return _webComponents.setReadyCheck;
    }
});
Object.defineProperty(exports, "registerComponent", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_webComponents).default;
    }
});

var _store = __webpack_require__(1);

Object.defineProperty(exports, "changeStoreImplementation", {
    enumerable: true,
    get: function get() {
        return _store.setImplementation;
    }
});
Object.defineProperty(exports, "registerReducer", {
    enumerable: true,
    get: function get() {
        return _store.registerReducer;
    }
});
Object.defineProperty(exports, "removeReducer", {
    enumerable: true,
    get: function get() {
        return _store.removeReducer;
    }
});
Object.defineProperty(exports, "subscribe", {
    enumerable: true,
    get: function get() {
        return _store.subscribe;
    }
});
Object.defineProperty(exports, "getState", {
    enumerable: true,
    get: function get() {
        return _store.getState;
    }
});

var _handlers = __webpack_require__(7);

Object.defineProperty(exports, "addTemplateHandler", {
    enumerable: true,
    get: function get() {
        return _handlers.addTemplateHandler;
    }
});
Object.defineProperty(exports, "setCoreHandler", {
    enumerable: true,
    get: function get() {
        return _handlers.setCoreHandler;
    }
});
Object.defineProperty(exports, "unloadHandler", {
    enumerable: true,
    get: function get() {
        return _handlers.unloadHandler;
    }
});
Object.defineProperty(exports, "accessHandler", {
    enumerable: true,
    get: function get() {
        return _handlers.accessHandler;
    }
});

var _tag = __webpack_require__(2);

Object.defineProperty(exports, "html", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_tag).default;
    }
});

var _storage = __webpack_require__(8);

Object.defineProperty(exports, "getStorage", {
    enumerable: true,
    get: function get() {
        return _storage.getStorage;
    }
});
Object.defineProperty(exports, "addStorage", {
    enumerable: true,
    get: function get() {
        return _storage.addStorage;
    }
});
Object.defineProperty(exports, "removeStorage", {
    enumerable: true,
    get: function get() {
        return _storage.removeStorage;
    }
});

var _Component = __webpack_require__(5);

Object.defineProperty(exports, "Component", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Component).default;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function(){
'use strict';var h=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function m(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function n(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
function p(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
function t(b,a,c){c=c?c:new Set;for(var d=b;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;a(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)t(d,a,c);d=p(b,e);continue}else if("template"===f){d=p(b,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)t(e,a,c)}d=d.firstChild?d.firstChild:p(b,d)}}function u(b,a,c){b[a]=c};function v(){this.a=new Map;this.s=new Map;this.f=[];this.b=!1}function ba(b,a,c){b.a.set(a,c);b.s.set(c.constructor,c)}function w(b,a){b.b=!0;b.f.push(a)}function x(b,a){b.b&&t(a,function(a){return y(b,a)})}function y(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var c=0;c<b.f.length;c++)b.f[c](a)}}function z(b,a){var c=[];t(a,function(b){return c.push(b)});for(a=0;a<c.length;a++){var d=c[a];1===d.__CE_state?b.connectedCallback(d):A(b,d)}}
function B(b,a){var c=[];t(a,function(b){return c.push(b)});for(a=0;a<c.length;a++){var d=c[a];1===d.__CE_state&&b.disconnectedCallback(d)}}
function C(b,a,c){c=c?c:{};var d=c.w||new Set,e=c.i||function(a){return A(b,a)},f=[];t(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var c=a.import;c instanceof Node&&(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0);c&&"complete"===c.readyState?c.__CE_documentLoadHandled=!0:a.addEventListener("load",function(){var c=a.import;if(!c.__CE_documentLoadHandled){c.__CE_documentLoadHandled=!0;var f=new Set(d);f.delete(c);C(b,c,{w:f,i:e})}})}else f.push(a)},d);if(b.b)for(a=0;a<
f.length;a++)y(b,f[a]);for(a=0;a<f.length;a++)e(f[a])}
function A(b,a){if(void 0===a.__CE_state){var c=a.ownerDocument;if(c.defaultView||c.__CE_isImportDocument&&c.__CE_hasRegistry)if(c=b.a.get(a.localName)){c.constructionStack.push(a);var d=c.constructor;try{try{if(new d!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(r){throw a.__CE_state=2,r;}a.__CE_state=1;a.__CE_definition=c;if(c.attributeChangedCallback)for(c=c.observedAttributes,d=0;d<c.length;d++){var e=c[d],
f=a.getAttribute(e);null!==f&&b.attributeChangedCallback(a,e,null,f,null)}n(a)&&b.connectedCallback(a)}}}v.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};v.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};
v.prototype.attributeChangedCallback=function(b,a,c,d,e){var f=b.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a)&&f.attributeChangedCallback.call(b,a,c,d,e)};function D(b,a){this.c=b;this.a=a;this.b=void 0;C(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function E(b){b.b&&b.b.disconnect()}D.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||E(this);for(a=0;a<b.length;a++)for(var c=b[a].addedNodes,d=0;d<c.length;d++)C(this.c,c[d])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function F(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function G(b){this.j=!1;this.c=b;this.o=new Map;this.l=function(b){return b()};this.g=!1;this.m=[];this.u=new D(b,document)}
G.prototype.define=function(b,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!m(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.j)throw Error("A custom element is already being defined.");this.j=!0;var d,e,f,r,k;try{var g=function(b){var a=l[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
return a},l=a.prototype;if(!(l instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");d=g("connectedCallback");e=g("disconnectedCallback");f=g("adoptedCallback");r=g("attributeChangedCallback");k=a.observedAttributes||[]}catch(q){return}finally{this.j=!1}a={localName:b,constructor:a,connectedCallback:d,disconnectedCallback:e,adoptedCallback:f,attributeChangedCallback:r,observedAttributes:k,constructionStack:[]};ba(this.c,b,a);this.m.push(a);this.g||
(this.g=!0,this.l(function(){return da(c)}))};G.prototype.i=function(b){C(this.c,b)};function da(b){if(!1!==b.g){b.g=!1;for(var a=b.m,c=[],d=new Map,e=0;e<a.length;e++)d.set(a[e].localName,[]);C(b.c,document,{i:function(a){if(void 0===a.__CE_state){var e=a.localName,f=d.get(e);f?f.push(a):b.c.a.get(e)&&c.push(a)}}});for(e=0;e<c.length;e++)A(b.c,c[e]);for(;0<a.length;){for(var f=a.shift(),e=f.localName,f=d.get(f.localName),r=0;r<f.length;r++)A(b.c,f[r]);(e=b.o.get(e))&&F(e)}}}
G.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};G.prototype.whenDefined=function(b){if(!m(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.o.get(b);if(a)return a.f;a=new ca;this.o.set(b,a);this.c.a.get(b)&&!this.m.some(function(a){return a.localName===b})&&F(a);return a.f};G.prototype.v=function(b){E(this.u);var a=this.l;this.l=function(c){return b(function(){return a(c)})}};window.CustomElementRegistry=G;
G.prototype.define=G.prototype.define;G.prototype.upgrade=G.prototype.i;G.prototype.get=G.prototype.get;G.prototype.whenDefined=G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback=G.prototype.v;var H=window.Document.prototype.createElement,I=window.Document.prototype.createElementNS,ea=window.Document.prototype.importNode,fa=window.Document.prototype.prepend,ga=window.Document.prototype.append,ha=window.DocumentFragment.prototype.prepend,ia=window.DocumentFragment.prototype.append,J=window.Node.prototype.cloneNode,K=window.Node.prototype.appendChild,L=window.Node.prototype.insertBefore,M=window.Node.prototype.removeChild,N=window.Node.prototype.replaceChild,O=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),P=window.Element.prototype.attachShadow,Q=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),R=window.Element.prototype.getAttribute,S=window.Element.prototype.setAttribute,T=window.Element.prototype.removeAttribute,U=window.Element.prototype.getAttributeNS,ja=window.Element.prototype.setAttributeNS,ka=window.Element.prototype.removeAttributeNS,la=window.Element.prototype.insertAdjacentElement,ma=window.Element.prototype.insertAdjacentHTML,na=window.Element.prototype.prepend,
oa=window.Element.prototype.append,V=window.Element.prototype.before,pa=window.Element.prototype.after,qa=window.Element.prototype.replaceWith,ra=window.Element.prototype.remove,sa=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ta=window.HTMLElement.prototype.insertAdjacentElement,ua=window.HTMLElement.prototype.insertAdjacentHTML;function va(){var b=X;window.HTMLElement=function(){function a(){var a=this.constructor,d=b.s.get(a);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(!e.length)return e=H.call(document,d.localName),Object.setPrototypeOf(e,a.prototype),e.__CE_state=1,e.__CE_definition=d,y(b,e),e;var d=e.length-1,f=e[d];if(f===h)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[d]=h;Object.setPrototypeOf(f,a.prototype);y(b,f);return f}a.prototype=sa.prototype;Object.defineProperty(a.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:a});return a}()};function Y(b,a,c){function d(a){return function(c){for(var e=[],d=0;d<arguments.length;++d)e[d-0]=arguments[d];for(var d=[],f=[],l=0;l<e.length;l++){var q=e[l];q instanceof Element&&n(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)d.push(q);else d.push(q)}a.apply(this,e);for(e=0;e<f.length;e++)B(b,f[e]);if(n(this))for(e=0;e<d.length;e++)f=d[e],f instanceof Element&&z(b,f)}}c.h&&(a.prepend=d(c.h));c.append&&(a.append=d(c.append))};function wa(){var b=X;u(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var c=b.a.get(a);if(c)return new c.constructor}a=H.call(this,a);y(b,a);return a});u(Document.prototype,"importNode",function(a,c){a=ea.call(this,a,c);this.__CE_hasRegistry?C(b,a):x(b,a);return a});u(Document.prototype,"createElementNS",function(a,c){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var d=b.a.get(c);if(d)return new d.constructor}a=I.call(this,a,c);y(b,a);return a});
Y(b,Document.prototype,{h:fa,append:ga})};function xa(){var b=X;function a(a,d){Object.defineProperty(a,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,a);else{var e=void 0;if(this.firstChild){var c=this.childNodes,k=c.length;if(0<k&&n(this))for(var e=Array(k),g=0;g<k;g++)e[g]=c[g]}d.set.call(this,a);if(e)for(a=0;a<e.length;a++)B(b,e[a])}}})}u(Node.prototype,"insertBefore",function(a,d){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
a=L.call(this,a,d);if(n(this))for(d=0;d<e.length;d++)z(b,e[d]);return a}e=n(a);d=L.call(this,a,d);e&&B(b,a);n(this)&&z(b,a);return d});u(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=K.call(this,a);if(n(this))for(var e=0;e<c.length;e++)z(b,c[e]);return a}c=n(a);e=K.call(this,a);c&&B(b,a);n(this)&&z(b,a);return e});u(Node.prototype,"cloneNode",function(a){a=J.call(this,a);this.ownerDocument.__CE_hasRegistry?C(b,a):x(b,a);
return a});u(Node.prototype,"removeChild",function(a){var c=n(a),e=M.call(this,a);c&&B(b,a);return e});u(Node.prototype,"replaceChild",function(a,d){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=N.call(this,a,d);if(n(this))for(B(b,d),d=0;d<e.length;d++)z(b,e[d]);return a}var e=n(a),f=N.call(this,a,d),c=n(this);c&&B(b,d);e&&B(b,a);c&&z(b,a);return f});O&&O.get?a(Node.prototype,O):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)M.call(this,this.firstChild);K.call(this,document.createTextNode(a))}})})};function ya(b){var a=Element.prototype;function c(a){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];for(var d=[],k=[],g=0;g<c.length;g++){var l=c[g];l instanceof Element&&n(l)&&k.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)d.push(l);else d.push(l)}a.apply(this,c);for(c=0;c<k.length;c++)B(b,k[c]);if(n(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&z(b,k)}}V&&(a.before=c(V));V&&(a.after=c(pa));qa&&u(a,"replaceWith",function(a){for(var e=
[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],d=[],k=0;k<e.length;k++){var g=e[k];g instanceof Element&&n(g)&&d.push(g);if(g instanceof DocumentFragment)for(g=g.firstChild;g;g=g.nextSibling)c.push(g);else c.push(g)}k=n(this);qa.apply(this,e);for(e=0;e<d.length;e++)B(b,d[e]);if(k)for(B(b,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&z(b,d)});ra&&u(a,"remove",function(){var a=n(this);ra.call(this);a&&B(b,this)})};function za(){var b=X;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var e=this,d=void 0;n(this)&&(d=[],t(this,function(a){a!==e&&d.push(a)}));c.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var r=d[f];1===r.__CE_state&&b.disconnectedCallback(r)}this.ownerDocument.__CE_hasRegistry?C(b,this):x(b,this);return a}})}function c(a,c){u(a,"insertAdjacentElement",function(a,e){var d=n(e);a=c.call(this,a,e);d&&B(b,e);n(a)&&z(b,e);
return a})}function d(a,c){function e(a,e){for(var c=[];a!==e;a=a.nextSibling)c.push(a);for(e=0;e<c.length;e++)C(b,c[e])}u(a,"insertAdjacentHTML",function(a,b){a=a.toLowerCase();if("beforebegin"===a){var d=this.previousSibling;c.call(this,a,b);e(d||this.parentNode.firstChild,this)}else if("afterbegin"===a)d=this.firstChild,c.call(this,a,b),e(this.firstChild,d);else if("beforeend"===a)d=this.lastChild,c.call(this,a,b),e(d||this.firstChild,null);else if("afterend"===a)d=this.nextSibling,c.call(this,
a,b),e(this.nextSibling,d);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}P&&u(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=P.call(this,a)});Q&&Q.get?a(Element.prototype,Q):W&&W.get?a(HTMLElement.prototype,W):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return J.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName,e=b?this.content:this,
c=I.call(document,this.namespaceURI,this.localName);for(c.innerHTML=a;0<e.childNodes.length;)M.call(e,e.childNodes[0]);for(a=b?c.content:c;0<a.childNodes.length;)K.call(e,a.childNodes[0])}})});u(Element.prototype,"setAttribute",function(a,c){if(1!==this.__CE_state)return S.call(this,a,c);var e=R.call(this,a);S.call(this,a,c);c=R.call(this,a);b.attributeChangedCallback(this,a,e,c,null)});u(Element.prototype,"setAttributeNS",function(a,c,d){if(1!==this.__CE_state)return ja.call(this,a,c,d);var e=U.call(this,
a,c);ja.call(this,a,c,d);d=U.call(this,a,c);b.attributeChangedCallback(this,c,e,d,a)});u(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return T.call(this,a);var c=R.call(this,a);T.call(this,a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});u(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return ka.call(this,a,c);var d=U.call(this,a,c);ka.call(this,a,c);var e=U.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});ta?c(HTMLElement.prototype,
ta):la?c(Element.prototype,la):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");ua?d(HTMLElement.prototype,ua):ma?d(Element.prototype,ma):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Y(b,Element.prototype,{h:na,append:oa});ya(b)};/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new v;va();wa();Y(X,DocumentFragment.prototype,{h:ha,append:ia});xa();za();document.__CE_hasRegistry=!0;var customElements=new G(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(1);

var _render = __webpack_require__(6);

var _storage = __webpack_require__(8);

var _utils = __webpack_require__(9);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fixBabelExtend = function (O) {
    var gPO = O.getPrototypeOf || function (o) {
        return o.__proto__;
    },
        sPO = O.setPrototypeOf || function (o, p) {
        o.__proto__ = p;
        return o;
    },
        construct = (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' ? Reflect.construct : function (Parent, args, Class) {
        var Constructor,
            a = [null];
        a.push.apply(a, args);
        Constructor = Parent.bind.apply(Parent, a);
        return sPO(new Constructor(), Class.prototype);
    };

    return function fixBabelExtend(Class) {
        var Parent = gPO(Class);
        return sPO(Class, sPO(function Super() {
            return construct(Parent, arguments, gPO(this).constructor);
        }, Parent));
    };
}(Object);

function parseAttributes(attributes) {
    var result = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var attribute = _step.value;

            result[attribute.name] = attribute.value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
}

var Component = _fixBabelExtend(function (_HTMLElement) {
    _inherits(Component, _HTMLElement);

    function Component() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Component);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args))), _this), _this.__defaultProps = {}, _this.subscriptions = [], _this.state = {}, _this.mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Component, [{
        key: "render",
        value: function render() {
            return '';
        }
    }, {
        key: "subscribeToStore",
        value: function subscribeToStore() {
            var _this2 = this;

            var _loop = function _loop(key) {
                _this2.subscriptions.push((0, _store.subscribe)(key, function (state) {
                    _this2.state[key] = state;
                    _render.render.call(_this2);
                }));
                _this2.state[key] = (0, _store.getState)(key);
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    _loop(key);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "connectedCallback",
        value: function connectedCallback() {
            this.subscribeToStore();
            _render.render.call(this);

            this.connected();
        }
    }, {
        key: "connected",
        value: function connected() {}
    }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.subscriptions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var subscription = _step3.value;

                    subscription.unsubscribe();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            (0, _utils.clearPropsStorage)();
            (0, _utils.clearEventsStorage)();

            this.disconnected();
        }
    }, {
        key: "disconnected",
        value: function disconnected() {}
    }, {
        key: "adoptedCallback",
        value: function adoptedCallback() {
            this.subscribeToStore();
            _render.render.call(this);

            this.adopted();
        }
    }, {
        key: "adopted",
        value: function adopted() {}
    }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(attributeName, oldValue, newValue) {
            if (this.mounted && oldValue != newValue) {
                this.propsChanged(_extends({}, this.props, _defineProperty({}, attributeName, newValue)));
                _render.render.call(this);
            }
        }
    }, {
        key: "propsChanged",
        value: function propsChanged(newProps) {}
    }, {
        key: "name",
        get: function get() {
            return Object.getPrototypeOf(this).constructor.name;
        }
    }, {
        key: "isShadow",
        get: function get() {
            return true;
        }
    }, {
        key: "props",
        get: function get() {
            return _extends({}, this.__defaultProps, parseAttributes(this.attributes), _storage.storage.props.get(this) || {});
        },
        set: function set(props) {
            this.__defaultProps = props;
        }
    }, {
        key: "keys",
        get: function get() {
            return [];
        }
    }, {
        key: "styles",
        get: function get() {
            return "";
        }
    }], [{
        key: "observedAttributes",
        get: function get() {
            return this.observableProps;
        }
    }, {
        key: "observableProps",
        get: function get() {
            return [];
        }
    }]);

    return Component;
}(HTMLElement));

exports.default = Component;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = render;

var _webComponents = __webpack_require__(0);

function nodeEquals(elementNode, fragmentNode) {
    var elClone = elementNode.cloneNode(false);
    var frClone = fragmentNode.cloneNode(false);
    return elClone.isEqualNode(frClone);
}

function contentDiffer(elementNode, fragmentNode) {
    return elementNode.isEqualNode(fragmentNode) === false;
}

function childrenChangedCount(elementNode, fragmentNode) {
    if (elementNode.childNodes.length > fragmentNode.childNodes.length) {
        return fragmentNode.childNodes.length;
    }
    var changed = 0;
    for (var i = 0; i < elementNode.childNodes.length; i++) {
        var elClone = elementNode.childNodes[i].cloneNode(false);
        var frClone = fragmentNode.childNodes[i].cloneNode(false);
        if (!nodeEquals(elementNode.childNodes[i], fragmentNode.childNodes[i])) {
            if (!isEmptyNode(elClone) && !isEmptyNode(frClone)) {
                changed++;
            }
        }
    }
    return changed;
}

function appendChildren(elementNode, fragmentNode) {
    var fragment = document.createDocumentFragment();
    for (var i = elementNode.childNodes.length; i < fragmentNode.childNodes.length; i++) {
        fragment.appendChild(fragmentNode.childNodes[i]);
    }
    elementNode.appendChild(fragment);
}

function updateAttributes(elementNode, fragmentNode) {
    var attributes = fragmentNode.attributes || [];
    var elementAttributes = elementNode.attributes || [];
    if (elementAttributes.length > attributes.length) {
        for (var i = 0; i < elementAttributes.length; i++) {
            var attribute = elementAttributes[i];
            if (!fragmentNode.hasAttribute(attribute.nodeName)) {
                elementNode.removeAttribute(attribute.nodeName);
            }
        }
    }
    for (var _i = 0; _i < attributes.length; _i++) {
        var _attribute = attributes[_i];
        elementNode.setAttribute(_attribute.nodeName, _attribute.nodeValue);
    }
}

function updateElement(elementNode, fragmentNode) {
    if (!nodeEquals(elementNode, fragmentNode)) {
        if ((0, _webComponents.isCustomComponent)(elementNode)) {
            return updateAttributes(elementNode, fragmentNode);
        }
        updateAttributes(elementNode, fragmentNode);
    }
    updateChildren(elementNode, fragmentNode);
}

function isEmptyNode(node) {
    if (node.childNodes.length) {
        return false;
    }
    if (node.innerText) {
        return Boolean(node.innerText.trim()) === false;
    }
    if (node.innerHTML) {
        return Boolean(node.innerHTML.trim()) === false;
    }
    if (node.textContent) {
        return Boolean(node.textContent.trim()) === false;
    }
    return true;
}

function nodeFilter(node) {
    if (node) {
        return (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) && node.nodeName !== "STYLE" && !isEmptyNode(node);
    }
    return false;
}

function updateChildren(elementNode, fragmentNode) {
    if (elementNode.childNodes.length !== fragmentNode.childNodes.length) {
        if (childrenChangedCount(elementNode, fragmentNode) > 0) {
            return elementNode.parentNode.replaceChild(fragmentNode, elementNode);
        }
        return appendChildren(elementNode, fragmentNode);
    }
    if (elementNode.childNodes.length === 0 && fragmentNode.childNodes.length === 0) {
        if (contentDiffer(elementNode, fragmentNode)) {
            return elementNode.parentNode.replaceChild(fragmentNode, elementNode);
        }
    }
    var elementNodes = Array.from(elementNode.childNodes).filter(nodeFilter);
    var fragmentNodes = Array.from(fragmentNode.childNodes).filter(nodeFilter);
    for (var i = 0; i < elementNodes.length; i++) {
        updateElement(elementNodes[i], fragmentNodes[i]);
    }
}

function createFragmentFromStr(tpl) {
    var template = document.createElement("template");
    template.innerHTML = tpl;
    return template;
}

function render() {
    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
    }
    var renderRes = this.render();
    var root = this.isShadow ? this.shadowRoot : this;
    var fragment = typeof renderRes === "string" ? createFragmentFromStr(renderRes) : renderRes;
    if (!this.mounted) {
        root.innerHTML = "<style>" + this.styles + "</style>";
        root.appendChild(fragment.content);
        this.mounted = true;
    } else {
        var style = document.createElement("style");
        style.innerHTML = this.styles;
        fragment.content.insertBefore(style, fragment.content.firstChild);
        updateChildren(root, fragment.content);
    }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.callHandlers = callHandlers;
exports.addTemplateHandler = addTemplateHandler;
exports.accessHandler = accessHandler;
exports.unloadHandler = unloadHandler;
exports.setCoreHandler = setCoreHandler;

var _storage = __webpack_require__(8);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propsStorage = _storage.storage[_storage.storageKeys.PROPS];
var eventsStorage = _storage.storage[_storage.storageKeys.EVENTS];

var EventsTagHandler = {
    call: function call(node, args) {
        var attributes = node.attributes || [];
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            if (attribute.nodeName.startsWith("on")) {
                var match = attribute.nodeValue.match(/__ARG__(\d+)/);
                if (match && match[1]) {
                    var index = Number(match[1]);
                    var listener = args[index];
                    if (typeof listener === "function") {
                        node.removeAttribute(attribute.nodeName);
                        var eventName = attribute.nodeName.toLowerCase().slice(2);
                        node.addEventListener(eventName, listener);

                        var listeners = eventsStorage.get(node) || {};
                        eventsStorage.set(node, _extends({}, listeners, _defineProperty({}, eventName, listener)));
                    }
                }
            }
        }
    }
};

var MapHandler = {
    call: function call(node, args) {
        if (node instanceof HTMLTemplateElement) {
            if (node.hasAttribute("map")) {
                var match = String(node.getAttribute("map")).match(/__ARG__(\d+)/);
                if (match && match[1]) {
                    var index = Number(match[1]);
                    var arr = args[index];
                    var tpl = node.innerHTML;
                    var fragment = document.createDocumentFragment();
                    arr.forEach(function (el) {
                        return tpl.replace(/__ARG__(\d+)/g, function (match, index) {
                            var arg = args[index];
                            if (typeof arg === "function") {
                                var tplCall = arg(el);
                                if (tplCall instanceof HTMLTemplateElement) {
                                    fragment.appendChild(tplCall.content);
                                } else {
                                    var tmpTpl = document.createElement("template");
                                    tmpTpl.innerHTML = tplCall;
                                    fragment.appendChild(tmpTpl.content);
                                }
                            }
                            return arg;
                        });
                    });
                    // $FlowFixMe
                    node.parentNode.replaceChild(fragment, node);
                }
            }
        }
    }
};

var PropsHandler = {
    call: function call(node, args) {
        var attributes = node.attributes || [];
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var match = attribute.nodeValue.match(/__ARG__(\d+)/);
            if (match && match[1]) {
                var index = Number(match[1]);
                var props = propsStorage.get(node) || {};
                node.removeAttribute(attribute.nodeName);
                propsStorage.set(node, _extends({}, props, _defineProperty({}, attribute.nodeName, args[index])));
            }
        }
    }
};

var coreHandlers = {
    events: EventsTagHandler,
    map: MapHandler,
    props: PropsHandler
};

var customHandlers = {};

var handlers = [coreHandlers.map.call, coreHandlers.events.call, coreHandlers.props.call];

function callHandlers(element, args) {
    handlers.forEach(function (handler) {
        handler(element, args);
        for (var i = 0; i < element.childNodes.length; i++) {
            callHandlers(element.childNodes[i], args);
        }
    });
}

function addTemplateHandler(key, handler) {
    customHandlers[key] = handler;
    // $FlowFixMe
    handlers.unshift(handler.call);
}

function accessHandler(key) {
    return customHandlers[key];
}

function unloadHandler(key) {
    var handler = customHandlers[key];
    handlers = handlers.filter(function (el) {
        return el !== handler.call;
    });
}

function setCoreHandler(key, handler) {
    coreHandlers[key] = handler;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _storage;

exports.getStorage = getStorage;
exports.addStorage = addStorage;
exports.removeStorage = removeStorage;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propsMap = new Map();

var eventsMap = new Map();

var storageKeys = exports.storageKeys = {
    PROPS: "props",
    EVENTS: "events"
};

var storage = exports.storage = (_storage = {}, _defineProperty(_storage, storageKeys.PROPS, propsMap), _defineProperty(_storage, storageKeys.EVENTS, eventsMap), _storage);

function getStorage(key) {
    return storage[key];
}

function addStorage(key, value) {
    storage[key] = value;
}

function removeStorage(key) {
    delete storage[key];
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearPropsStorage = clearPropsStorage;
exports.clearEventsStorage = clearEventsStorage;

var _storage = __webpack_require__(8);

var propsStorage = _storage.storage[_storage.storageKeys.PROPS];

var eventsStorage = _storage.storage[_storage.storageKeys.EVENTS];

function clearPropsStorage() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = propsStorage.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!document.contains(key)) {
                propsStorage.delete(key);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function clearEventsStorage() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = eventsStorage.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (!document.contains(key)) {
                eventsStorage.delete(key);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

/***/ })
/******/ ]);