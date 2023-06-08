// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fkT4L":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "dfdcdc0e2d6c50ff";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ld1WH":[function(require,module,exports) {
// / <reference lib="webworker" />
var _d3SimulatorEngine = require("../../engine/d3-simulator-engine");
var _workerInput = require("./message/worker-input");
var _workerOutput = require("./message/worker-output");
const simulator = new (0, _d3SimulatorEngine.D3SimulatorEngine)();
const emitToMain = (message)=>{
    // @ts-ignore Web worker postMessage is a global function
    postMessage(message);
};
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).TICK, (data)=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).NODE_DRAG,
        data
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).END, (data)=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).NODE_DRAG_END,
        data
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).SIMULATION_START, ()=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).SIMULATION_START
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).SIMULATION_PROGRESS, (data)=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).SIMULATION_PROGRESS,
        data
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).SIMULATION_END, (data)=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).SIMULATION_END,
        data
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).NODE_DRAG, (data)=>{
    // Notify the client that the node position changed.
    // This is otherwise handled by the simulation tick if physics is enabled.
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).NODE_DRAG,
        data
    });
});
simulator.on((0, _d3SimulatorEngine.D3SimulatorEngineEventType).SETTINGS_UPDATE, (data)=>{
    emitToMain({
        type: (0, _workerOutput.WorkerOutputType).SETTINGS_UPDATE,
        data
    });
});
addEventListener("message", ({ data  })=>{
    switch(data.type){
        case (0, _workerInput.WorkerInputType).ActivateSimulation:
            simulator.activateSimulation();
            break;
        case (0, _workerInput.WorkerInputType).SetData:
            simulator.setData(data.data);
            break;
        case (0, _workerInput.WorkerInputType).AddData:
            simulator.addData(data.data);
            break;
        case (0, _workerInput.WorkerInputType).UpdateData:
            simulator.updateData(data.data);
            break;
        case (0, _workerInput.WorkerInputType).ClearData:
            simulator.clearData();
            break;
        case (0, _workerInput.WorkerInputType).Simulate:
            simulator.simulate();
            break;
        case (0, _workerInput.WorkerInputType).StartSimulation:
            simulator.startSimulation(data.data);
            break;
        case (0, _workerInput.WorkerInputType).UpdateSimulation:
            simulator.updateSimulation(data.data);
            break;
        case (0, _workerInput.WorkerInputType).StopSimulation:
            simulator.stopSimulation();
            break;
        case (0, _workerInput.WorkerInputType).StartDragNode:
            simulator.startDragNode();
            break;
        case (0, _workerInput.WorkerInputType).DragNode:
            simulator.dragNode(data.data);
            break;
        case (0, _workerInput.WorkerInputType).FixNodes:
            simulator.fixNodes(data.data.nodes);
            break;
        case (0, _workerInput.WorkerInputType).ReleaseNodes:
            simulator.releaseNodes(data.data.nodes);
            break;
        case (0, _workerInput.WorkerInputType).EndDragNode:
            simulator.endDragNode(data.data);
            break;
        case (0, _workerInput.WorkerInputType).SetSettings:
            simulator.setSettings(data.data);
            break;
    }
});

},{"../../engine/d3-simulator-engine":"k477b","./message/worker-input":"bSB2d","./message/worker-output":"cSvpC"}],"k477b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "D3SimulatorEngineEventType", ()=>D3SimulatorEngineEventType);
parcelHelpers.export(exports, "getManyBodyMaxDistance", ()=>getManyBodyMaxDistance);
parcelHelpers.export(exports, "DEFAULT_SETTINGS", ()=>DEFAULT_SETTINGS);
parcelHelpers.export(exports, "D3SimulatorEngine", ()=>D3SimulatorEngine);
var _d3Force = require("d3-force");
var _emitterUtils = require("../../utils/emitter.utils");
var _objectUtils = require("../../utils/object.utils");
const MANY_BODY_MAX_DISTANCE_TO_LINK_DISTANCE_RATIO = 100;
const DEFAULT_LINK_DISTANCE = 30;
var D3SimulatorEngineEventType;
(function(D3SimulatorEngineEventType) {
    D3SimulatorEngineEventType["TICK"] = "tick";
    D3SimulatorEngineEventType["END"] = "end";
    D3SimulatorEngineEventType["SIMULATION_START"] = "simulation-start";
    D3SimulatorEngineEventType["SIMULATION_PROGRESS"] = "simulation-progress";
    D3SimulatorEngineEventType["SIMULATION_END"] = "simulation-end";
    D3SimulatorEngineEventType["NODE_DRAG"] = "node-drag";
    D3SimulatorEngineEventType["SETTINGS_UPDATE"] = "settings-update";
})(D3SimulatorEngineEventType || (D3SimulatorEngineEventType = {}));
const getManyBodyMaxDistance = (linkDistance)=>{
    const distance = linkDistance > 0 ? linkDistance : 1;
    return distance * MANY_BODY_MAX_DISTANCE_TO_LINK_DISTANCE_RATIO;
};
const DEFAULT_SETTINGS = {
    isPhysicsEnabled: false,
    alpha: {
        alpha: 1,
        alphaMin: 0.001,
        alphaDecay: 0.0228,
        alphaTarget: 0.1
    },
    centering: {
        x: 0,
        y: 0,
        strength: 1
    },
    collision: {
        radius: 15,
        strength: 1,
        iterations: 1
    },
    links: {
        distance: DEFAULT_LINK_DISTANCE,
        strength: undefined,
        iterations: 1
    },
    manyBody: {
        strength: -100,
        theta: 0.9,
        distanceMin: 0,
        distanceMax: getManyBodyMaxDistance(DEFAULT_LINK_DISTANCE)
    },
    positioning: {
        forceX: {
            x: 0,
            strength: 0.1
        },
        forceY: {
            y: 0,
            strength: 0.1
        }
    }
};
class D3SimulatorEngine extends (0, _emitterUtils.Emitter) {
    constructor(settings){
        super();
        this._edges = [];
        this._nodes = [];
        this._nodeIndexByNodeId = {};
        this._isDragging = false;
        this._isStabilizing = false;
        this.linkForce = (0, _d3Force.forceLink)(this._edges).id((node)=>node.id);
        this.simulation = (0, _d3Force.forceSimulation)(this._nodes).force("link", this.linkForce).stop();
        this.settings = Object.assign((0, _objectUtils.copyObject)(DEFAULT_SETTINGS), settings);
        this.initSimulation(this.settings);
        this.simulation.on("tick", ()=>{
            this.emit(D3SimulatorEngineEventType.TICK, {
                nodes: this._nodes,
                edges: this._edges
            });
        });
        this.simulation.on("end", ()=>{
            this._isDragging = false;
            this._isStabilizing = false;
            this.emit(D3SimulatorEngineEventType.END, {
                nodes: this._nodes,
                edges: this._edges
            });
        });
    }
    getSettings() {
        return (0, _objectUtils.copyObject)(this.settings);
    }
    setSettings(settings) {
        const previousSettings = this.getSettings();
        Object.keys(settings).forEach((key)=>{
            // @ts-ignore
            this.settings[key] = settings[key];
        });
        if ((0, _objectUtils.isObjectEqual)(this.settings, previousSettings)) return;
        this.initSimulation(settings);
        this.emit(D3SimulatorEngineEventType.SETTINGS_UPDATE, {
            settings: this.settings
        });
        this.runSimulation({
            isUpdatingSettings: true
        });
    }
    startDragNode() {
        this._isDragging = true;
        if (!this._isStabilizing && this.settings.isPhysicsEnabled) this.activateSimulation();
    }
    dragNode(data) {
        const node = this._nodes[this._nodeIndexByNodeId[data.id]];
        if (!node) return;
        if (!this._isDragging) this.startDragNode();
        node.fx = data.x;
        node.fy = data.y;
        if (!this.settings.isPhysicsEnabled) {
            node.x = data.x;
            node.y = data.y;
            // Notify the client that the node position changed.
            // This is otherwise handled by the simulation tick if physics is enabled.
            this.emit(D3SimulatorEngineEventType.NODE_DRAG, {
                nodes: this._nodes,
                edges: this._edges
            });
        }
    }
    endDragNode(data) {
        this._isDragging = false;
        this.simulation.alphaTarget(0);
        const node = this._nodes[this._nodeIndexByNodeId[data.id]];
        if (node && this.settings.isPhysicsEnabled) releaseNode(node);
    }
    // Re-heat simulation.
    // This does not count as "stabilization" and won't emit any progress.
    activateSimulation() {
        if (this.settings.isPhysicsEnabled) {
            this.simulation.alphaTarget(this.settings.alpha.alphaTarget).restart();
            this.releaseNodes();
        }
    }
    fixDefinedNodes(data) {
        // Treat nodes that have existing coordinates as "fixed".
        for(let i = 0; i < data.nodes.length; i++){
            if (data.nodes[i].x !== null && data.nodes[i].x !== undefined) data.nodes[i].fx = data.nodes[i].x;
            if (data.nodes[i].y !== null && data.nodes[i].y !== undefined) data.nodes[i].fy = data.nodes[i].y;
        }
        return data;
    }
    addData(data) {
        data = this.fixDefinedNodes(data);
        this._nodes.concat(data.nodes);
        this._edges.concat(data.edges);
        this.setNodeIndexByNodeId();
    }
    clearData() {
        this._nodes = [];
        this._edges = [];
        this.setNodeIndexByNodeId();
    }
    setData(data) {
        data = this.fixDefinedNodes(data);
        this.clearData();
        this.addData(data);
    }
    updateData(data) {
        data = this.fixDefinedNodes(data);
        // Keep existing nodes along with their (x, y, fx, fy) coordinates to avoid
        // rearranging the graph layout.
        // These nodes should not be reloaded into the array because the D3 simulation
        // will assign to them completely new coordinates, effectively restarting the animation.
        const newNodeIds = new Set(data.nodes.map((node)=>node.id));
        // Remove old nodes that aren't present in the new data.
        const oldNodes = this._nodes.filter((node)=>newNodeIds.has(node.id));
        const newNodes = data.nodes.filter((node)=>this._nodeIndexByNodeId[node.id] === undefined);
        this._nodes = [
            ...oldNodes,
            ...newNodes
        ];
        this.setNodeIndexByNodeId();
        // Only keep new links and discard all old links.
        // Old links won't work as some discrepancies arise between the D3 index property
        // and Memgraph's `id` property which affects the source->target mapping.
        this._edges = data.edges;
        // Update simulation with new data.
        this.simulation.nodes(this._nodes);
        this.linkForce.links(this._edges);
    }
    simulate() {
        // Update simulation with new data.
        this.simulation.nodes(this._nodes);
        this.linkForce.links(this._edges);
        // Run simulation "physics".
        this.runSimulation();
        if (!this.settings.isPhysicsEnabled) this.fixNodes();
    }
    startSimulation(data) {
        this.setData(data);
        // Update simulation with new data.
        this.simulation.nodes(this._nodes);
        this.linkForce.links(this._edges);
        // Run simulation "physics".
        this.runSimulation();
    }
    updateSimulation(data) {
        // To avoid rearranging the graph layout during node expand/collapse/hide,
        // it is necessary to keep existing nodes along with their (x, y) coordinates.
        // These nodes should not be reloaded into the array because the D3 simulation
        // will assign to them completely new coordinates, effectively restarting the animation.
        const newNodeIds = new Set(data.nodes.map((node)=>node.id));
        // const newNodes = data.nodes.filter((node) => !this.nodeIdentities.has(node.id));
        const newNodes = data.nodes.filter((node)=>this._nodeIndexByNodeId[node.id] === undefined);
        const oldNodes = this._nodes.filter((node)=>newNodeIds.has(node.id));
        if (!this.settings.isPhysicsEnabled) oldNodes.forEach((node)=>fixNode(node));
        // Remove old nodes that aren't present in the new data.
        this._nodes = [
            ...oldNodes,
            ...newNodes
        ];
        this.setNodeIndexByNodeId();
        // Only keep new links and discard all old links.
        // Old links won't work as some discrepancies arise between the D3 index property
        // and Memgraph's `id` property which affects the source->target mapping.
        this._edges = data.edges;
        // Update simulation with new data.
        this.simulation.nodes(this._nodes);
        this.linkForce.links(this._edges);
        // If there are no new nodes, there is no need for the simulation
        if (!this.settings.isPhysicsEnabled && !newNodes.length) {
            this.emit(D3SimulatorEngineEventType.SIMULATION_END, {
                nodes: this._nodes,
                edges: this._edges
            });
            return;
        }
        // Run simulation "physics".
        this.runSimulation({
            isUpdatingSettings: true
        });
    }
    stopSimulation() {
        this.simulation.stop();
        this._nodes = [];
        this._edges = [];
        this.setNodeIndexByNodeId();
        this.simulation.nodes();
        this.linkForce.links();
    }
    initSimulation(settings) {
        var _a, _b, _c, _d;
        if (settings.alpha) this.simulation.alpha(settings.alpha.alpha).alphaMin(settings.alpha.alphaMin).alphaDecay(settings.alpha.alphaDecay).alphaTarget(settings.alpha.alphaTarget);
        if (settings.links) this.linkForce.distance(settings.links.distance).iterations(settings.links.iterations);
        if (settings.collision) {
            const collision = (0, _d3Force.forceCollide)().radius(settings.collision.radius).strength(settings.collision.strength).iterations(settings.collision.iterations);
            this.simulation.force("collide", collision);
        }
        if (settings.collision === null) this.simulation.force("collide", null);
        if (settings.manyBody) {
            const manyBody = (0, _d3Force.forceManyBody)().strength(settings.manyBody.strength).theta(settings.manyBody.theta).distanceMin(settings.manyBody.distanceMin).distanceMax(settings.manyBody.distanceMax);
            this.simulation.force("charge", manyBody);
        }
        if (settings.manyBody === null) this.simulation.force("charge", null);
        if ((_a = settings.positioning) === null || _a === void 0 ? void 0 : _a.forceY) {
            const positioningForceX = (0, _d3Force.forceX)(settings.positioning.forceX.x).strength(settings.positioning.forceX.strength);
            this.simulation.force("x", positioningForceX);
        }
        if (((_b = settings.positioning) === null || _b === void 0 ? void 0 : _b.forceX) === null) this.simulation.force("x", null);
        if ((_c = settings.positioning) === null || _c === void 0 ? void 0 : _c.forceY) {
            const positioningForceY = (0, _d3Force.forceY)(settings.positioning.forceY.y).strength(settings.positioning.forceY.strength);
            this.simulation.force("y", positioningForceY);
        }
        if (((_d = settings.positioning) === null || _d === void 0 ? void 0 : _d.forceY) === null) this.simulation.force("y", null);
        if (settings.centering) {
            const centering = (0, _d3Force.forceCenter)(settings.centering.x, settings.centering.y).strength(settings.centering.strength);
            this.simulation.force("center", centering);
        }
        if (settings.centering === null) this.simulation.force("center", null);
    }
    // This is a blocking action - the user will not be able to interact with the graph
    // during the simulation process.
    runSimulation(options) {
        if (this._isStabilizing) return;
        if (this.settings.isPhysicsEnabled || (options === null || options === void 0 ? void 0 : options.isUpdatingSettings)) this.releaseNodes();
        this.emit(D3SimulatorEngineEventType.SIMULATION_START, undefined);
        this._isStabilizing = true;
        this.simulation.alpha(this.settings.alpha.alpha).alphaTarget(this.settings.alpha.alphaTarget).stop();
        const totalSimulationSteps = Math.ceil(Math.log(this.settings.alpha.alphaMin) / Math.log(1 - this.settings.alpha.alphaDecay));
        let lastProgress = -1;
        for(let i = 0; i < totalSimulationSteps; i++){
            const currentProgress = Math.round(i * 100 / totalSimulationSteps);
            // Emit progress maximum of 100 times (every percent)
            if (currentProgress > lastProgress) {
                lastProgress = currentProgress;
                this.emit(D3SimulatorEngineEventType.SIMULATION_PROGRESS, {
                    nodes: this._nodes,
                    edges: this._edges,
                    progress: currentProgress / 100
                });
            }
            this.simulation.tick();
        }
        if (!this.settings.isPhysicsEnabled) this.fixNodes();
        this._isStabilizing = false;
        this.emit(D3SimulatorEngineEventType.SIMULATION_END, {
            nodes: this._nodes,
            edges: this._edges
        });
    }
    setNodeIndexByNodeId() {
        this._nodeIndexByNodeId = {};
        for(let i = 0; i < this._nodes.length; i++)this._nodeIndexByNodeId[this._nodes[i].id] = i;
    }
    fixNodes(nodes) {
        if (!nodes) nodes = this._nodes;
        for(let i = 0; i < nodes.length; i++)fixNode(this._nodes[i]);
    }
    releaseNodes(nodes) {
        if (!nodes) nodes = this._nodes;
        for(let i = 0; i < nodes.length; i++)releaseNode(this._nodes[i]);
    }
}
const fixNode = (node)=>{
    // fx and fy fix the node position in the D3 simulation.
    node.fx = node.x;
    node.fy = node.y;
};
const releaseNode = (node)=>{
    node.fx = null;
    node.fy = null;
};

},{"d3-force":"iqXTs","../../utils/emitter.utils":"bUAXP","../../utils/object.utils":"jXryQ","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"iqXTs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "forceCenter", ()=>(0, _centerJsDefault.default));
parcelHelpers.export(exports, "forceCollide", ()=>(0, _collideJsDefault.default));
parcelHelpers.export(exports, "forceLink", ()=>(0, _linkJsDefault.default));
parcelHelpers.export(exports, "forceManyBody", ()=>(0, _manyBodyJsDefault.default));
parcelHelpers.export(exports, "forceRadial", ()=>(0, _radialJsDefault.default));
parcelHelpers.export(exports, "forceSimulation", ()=>(0, _simulationJsDefault.default));
parcelHelpers.export(exports, "forceX", ()=>(0, _xJsDefault.default));
parcelHelpers.export(exports, "forceY", ()=>(0, _yJsDefault.default));
var _centerJs = require("./center.js");
var _centerJsDefault = parcelHelpers.interopDefault(_centerJs);
var _collideJs = require("./collide.js");
var _collideJsDefault = parcelHelpers.interopDefault(_collideJs);
var _linkJs = require("./link.js");
var _linkJsDefault = parcelHelpers.interopDefault(_linkJs);
var _manyBodyJs = require("./manyBody.js");
var _manyBodyJsDefault = parcelHelpers.interopDefault(_manyBodyJs);
var _radialJs = require("./radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _simulationJs = require("./simulation.js");
var _simulationJsDefault = parcelHelpers.interopDefault(_simulationJs);
var _xJs = require("./x.js");
var _xJsDefault = parcelHelpers.interopDefault(_xJs);
var _yJs = require("./y.js");
var _yJsDefault = parcelHelpers.interopDefault(_yJs);

},{"./center.js":"4CSdU","./collide.js":"3EGNB","./link.js":"fWUwQ","./manyBody.js":"9Qwyz","./radial.js":false,"./simulation.js":"eCn62","./x.js":"4bJRf","./y.js":"jtlc1","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"4CSdU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, y) {
        var nodes, strength = 1;
        if (x == null) x = 0;
        if (y == null) y = 0;
        function force() {
            var i, n = nodes.length, node, sx = 0, sy = 0;
            for(i = 0; i < n; ++i)node = nodes[i], sx += node.x, sy += node.y;
            for(sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i)node = nodes[i], node.x -= sx, node.y -= sy;
        }
        force.initialize = function(_) {
            nodes = _;
        };
        force.x = function(_) {
            return arguments.length ? (x = +_, force) : x;
        };
        force.y = function(_) {
            return arguments.length ? (y = +_, force) : y;
        };
        force.strength = function(_) {
            return arguments.length ? (strength = +_, force) : strength;
        };
        return force;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"8s6SR":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3EGNB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(radius) {
        var nodes, radii, random, strength = 1, iterations = 1;
        if (typeof radius !== "function") radius = (0, _constantJsDefault.default)(radius == null ? 1 : +radius);
        function force() {
            var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
            for(var k = 0; k < iterations; ++k){
                tree = (0, _d3Quadtree.quadtree)(nodes, x, y).visitAfter(prepare);
                for(i = 0; i < n; ++i){
                    node = nodes[i];
                    ri = radii[node.index], ri2 = ri * ri;
                    xi = node.x + node.vx;
                    yi = node.y + node.vy;
                    tree.visit(apply);
                }
            }
            function apply(quad, x0, y0, x1, y1) {
                var data = quad.data, rj = quad.r, r = ri + rj;
                if (data) {
                    if (data.index > node.index) {
                        var x = xi - data.x - data.vx, y = yi - data.y - data.vy, l = x * x + y * y;
                        if (l < r * r) {
                            if (x === 0) x = (0, _jiggleJsDefault.default)(random), l += x * x;
                            if (y === 0) y = (0, _jiggleJsDefault.default)(random), l += y * y;
                            l = (r - (l = Math.sqrt(l))) / l * strength;
                            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
                            node.vy += (y *= l) * r;
                            data.vx -= x * (r = 1 - r);
                            data.vy -= y * r;
                        }
                    }
                    return;
                }
                return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
            }
        }
        function prepare(quad) {
            if (quad.data) return quad.r = radii[quad.data.index];
            for(var i = quad.r = 0; i < 4; ++i)if (quad[i] && quad[i].r > quad.r) quad.r = quad[i].r;
        }
        function initialize() {
            if (!nodes) return;
            var i, n = nodes.length, node;
            radii = new Array(n);
            for(i = 0; i < n; ++i)node = nodes[i], radii[node.index] = +radius(node, i, nodes);
        }
        force.initialize = function(_nodes, _random) {
            nodes = _nodes;
            random = _random;
            initialize();
        };
        force.iterations = function(_) {
            return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
            return arguments.length ? (strength = +_, force) : strength;
        };
        force.radius = function(_) {
            return arguments.length ? (radius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : radius;
        };
        return force;
    });
var _d3Quadtree = require("d3-quadtree");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _jiggleJs = require("./jiggle.js");
var _jiggleJsDefault = parcelHelpers.interopDefault(_jiggleJs);
function x(d) {
    return d.x + d.vx;
}
function y(d) {
    return d.y + d.vy;
}

},{"d3-quadtree":"hfQOE","./constant.js":"h8HiP","./jiggle.js":"1Fwn7","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"hfQOE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "quadtree", ()=>(0, _quadtreeJsDefault.default));
var _quadtreeJs = require("./quadtree.js");
var _quadtreeJsDefault = parcelHelpers.interopDefault(_quadtreeJs);

},{"./quadtree.js":"4YQSV","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"4YQSV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>quadtree);
var _addJs = require("./add.js");
var _addJsDefault = parcelHelpers.interopDefault(_addJs);
var _coverJs = require("./cover.js");
var _coverJsDefault = parcelHelpers.interopDefault(_coverJs);
var _dataJs = require("./data.js");
var _dataJsDefault = parcelHelpers.interopDefault(_dataJs);
var _extentJs = require("./extent.js");
var _extentJsDefault = parcelHelpers.interopDefault(_extentJs);
var _findJs = require("./find.js");
var _findJsDefault = parcelHelpers.interopDefault(_findJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _rootJs = require("./root.js");
var _rootJsDefault = parcelHelpers.interopDefault(_rootJs);
var _sizeJs = require("./size.js");
var _sizeJsDefault = parcelHelpers.interopDefault(_sizeJs);
var _visitJs = require("./visit.js");
var _visitJsDefault = parcelHelpers.interopDefault(_visitJs);
var _visitAfterJs = require("./visitAfter.js");
var _visitAfterJsDefault = parcelHelpers.interopDefault(_visitAfterJs);
var _xJs = require("./x.js");
var _xJsDefault = parcelHelpers.interopDefault(_xJs);
var _yJs = require("./y.js");
var _yJsDefault = parcelHelpers.interopDefault(_yJs);
function quadtree(nodes, x, y) {
    var tree = new Quadtree(x == null ? (0, _xJs.defaultX) : x, y == null ? (0, _yJs.defaultY) : y, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x, y, x0, y0, x1, y1) {
    this._x = x;
    this._y = y;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = undefined;
}
function leaf_copy(leaf) {
    var copy = {
        data: leaf.data
    }, next = copy;
    while(leaf = leaf.next)next = next.next = {
        data: leaf.data
    };
    return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
    if (!node) return copy;
    if (!node.length) return copy._root = leaf_copy(node), copy;
    nodes = [
        {
            source: node,
            target: copy._root = new Array(4)
        }
    ];
    while(node = nodes.pop()){
        for(var i = 0; i < 4; ++i)if (child = node.source[i]) {
            if (child.length) nodes.push({
                source: child,
                target: node.target[i] = new Array(4)
            });
            else node.target[i] = leaf_copy(child);
        }
    }
    return copy;
};
treeProto.add = (0, _addJsDefault.default);
treeProto.addAll = (0, _addJs.addAll);
treeProto.cover = (0, _coverJsDefault.default);
treeProto.data = (0, _dataJsDefault.default);
treeProto.extent = (0, _extentJsDefault.default);
treeProto.find = (0, _findJsDefault.default);
treeProto.remove = (0, _removeJsDefault.default);
treeProto.removeAll = (0, _removeJs.removeAll);
treeProto.root = (0, _rootJsDefault.default);
treeProto.size = (0, _sizeJsDefault.default);
treeProto.visit = (0, _visitJsDefault.default);
treeProto.visitAfter = (0, _visitAfterJsDefault.default);
treeProto.x = (0, _xJsDefault.default);
treeProto.y = (0, _yJsDefault.default);

},{"./add.js":"gxBzI","./cover.js":"5iSpz","./data.js":"iBCXg","./extent.js":"kMxwy","./find.js":"aITUM","./remove.js":"db8gG","./root.js":"eDeCW","./size.js":"eXCF1","./visit.js":"lzb5e","./visitAfter.js":"sjDuL","./x.js":"ctxBF","./y.js":"3e0Lw","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"gxBzI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(d) {
        const x = +this._x.call(null, d), y = +this._y.call(null, d);
        return add(this.cover(x, y), x, y, d);
    });
parcelHelpers.export(exports, "addAll", ()=>addAll);
function add(tree, x, y, d) {
    if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points
    var parent, node = tree._root, leaf = {
        data: d
    }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
    // If the tree is empty, initialize the root as a leaf.
    if (!node) return tree._root = leaf, tree;
    // Find the existing leaf for the new point, or add it.
    while(node.length){
        if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
        else x1 = xm;
        if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
        else y1 = ym;
        if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
    }
    // Is the new point is exactly coincident with the existing point?
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
    // Otherwise, split the leaf node until the old and new point are separated.
    do {
        parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
        if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
        else x1 = xm;
        if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
        else y1 = ym;
    }while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
    return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
    var d, i, n = data.length, x, y, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    // Compute the points and their extent.
    for(i = 0; i < n; ++i){
        if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
        xz[i] = x;
        yz[i] = y;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
    }
    // If there were no (valid) points, abort.
    if (x0 > x1 || y0 > y1) return this;
    // Expand the tree to cover the new points.
    this.cover(x0, y0).cover(x1, y1);
    // Add the new points.
    for(i = 0; i < n; ++i)add(this, xz[i], yz[i], data[i]);
    return this;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"5iSpz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, y) {
        if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points
        var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
        // If the quadtree has no extent, initialize them.
        // Integer extent are necessary so that if we later double the extent,
        // the existing quadrant boundaries don’t change due to floating point error!
        if (isNaN(x0)) {
            x1 = (x0 = Math.floor(x)) + 1;
            y1 = (y0 = Math.floor(y)) + 1;
        } else {
            var z = x1 - x0 || 1, node = this._root, parent, i;
            while(x0 > x || x >= x1 || y0 > y || y >= y1){
                i = (y < y0) << 1 | x < x0;
                parent = new Array(4), parent[i] = node, node = parent, z *= 2;
                switch(i){
                    case 0:
                        x1 = x0 + z, y1 = y0 + z;
                        break;
                    case 1:
                        x0 = x1 - z, y1 = y0 + z;
                        break;
                    case 2:
                        x1 = x0 + z, y0 = y1 - z;
                        break;
                    case 3:
                        x0 = x1 - z, y0 = y1 - z;
                        break;
                }
            }
            if (this._root && this._root.length) this._root = node;
        }
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"iBCXg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var data = [];
        this.visit(function(node) {
            if (!node.length) do data.push(node.data);
            while (node = node.next);
        });
        return data;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"kMxwy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(_) {
        return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? undefined : [
            [
                this._x0,
                this._y0
            ],
            [
                this._x1,
                this._y1
            ]
        ];
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"aITUM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, y, radius) {
        var data, x0 = this._x0, y0 = this._y0, x1, y1, x2, y2, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q, i;
        if (node) quads.push(new (0, _quadJsDefault.default)(node, x0, y0, x3, y3));
        if (radius == null) radius = Infinity;
        else {
            x0 = x - radius, y0 = y - radius;
            x3 = x + radius, y3 = y + radius;
            radius *= radius;
        }
        while(q = quads.pop()){
            // Stop searching if this quadrant can’t contain a closer node.
            if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue;
            // Bisect the current quadrant.
            if (node.length) {
                var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2;
                quads.push(new (0, _quadJsDefault.default)(node[3], xm, ym, x2, y2), new (0, _quadJsDefault.default)(node[2], x1, ym, xm, y2), new (0, _quadJsDefault.default)(node[1], xm, y1, x2, ym), new (0, _quadJsDefault.default)(node[0], x1, y1, xm, ym));
                // Visit the closest quadrant first.
                if (i = (y >= ym) << 1 | x >= xm) {
                    q = quads[quads.length - 1];
                    quads[quads.length - 1] = quads[quads.length - 1 - i];
                    quads[quads.length - 1 - i] = q;
                }
            } else {
                var dx = x - +this._x.call(null, node.data), dy = y - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
                if (d2 < radius) {
                    var d = Math.sqrt(radius = d2);
                    x0 = x - d, y0 = y - d;
                    x3 = x + d, y3 = y + d;
                    data = node.data;
                }
            }
        }
        return data;
    });
var _quadJs = require("./quad.js");
var _quadJsDefault = parcelHelpers.interopDefault(_quadJs);

},{"./quad.js":"194Lf","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"194Lf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, x0, y0, x1, y1) {
        this.node = node;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"db8gG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(d) {
        if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points
        var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x, y, xm, ym, right, bottom, i, j;
        // If the tree is empty, initialize the root as a leaf.
        if (!node) return this;
        // Find the leaf node for the point.
        // While descending, also retain the deepest parent with a non-removed sibling.
        if (node.length) while(true){
            if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
            else x1 = xm;
            if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
            else y1 = ym;
            if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
            if (!node.length) break;
            if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
        }
        // Find the point to remove.
        while(node.data !== d)if (!(previous = node, node = node.next)) return this;
        if (next = node.next) delete node.next;
        // If there are multiple coincident points, remove just the point.
        if (previous) return next ? previous.next = next : delete previous.next, this;
        // If this is the root point, remove it.
        if (!parent) return this._root = next, this;
        // Remove this leaf.
        next ? parent[i] = next : delete parent[i];
        // If the parent now contains exactly one leaf, collapse superfluous parents.
        if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
            if (retainer) retainer[j] = node;
            else this._root = node;
        }
        return this;
    });
parcelHelpers.export(exports, "removeAll", ()=>removeAll);
function removeAll(data) {
    for(var i = 0, n = data.length; i < n; ++i)this.remove(data[i]);
    return this;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"eDeCW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this._root;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"eXCF1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var size = 0;
        this.visit(function(node) {
            if (!node.length) do ++size;
            while (node = node.next);
        });
        return size;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"lzb5e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(callback) {
        var quads = [], q, node = this._root, child, x0, y0, x1, y1;
        if (node) quads.push(new (0, _quadJsDefault.default)(node, this._x0, this._y0, this._x1, this._y1));
        while(q = quads.pop())if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
            var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
            if (child = node[3]) quads.push(new (0, _quadJsDefault.default)(child, xm, ym, x1, y1));
            if (child = node[2]) quads.push(new (0, _quadJsDefault.default)(child, x0, ym, xm, y1));
            if (child = node[1]) quads.push(new (0, _quadJsDefault.default)(child, xm, y0, x1, ym));
            if (child = node[0]) quads.push(new (0, _quadJsDefault.default)(child, x0, y0, xm, ym));
        }
        return this;
    });
var _quadJs = require("./quad.js");
var _quadJsDefault = parcelHelpers.interopDefault(_quadJs);

},{"./quad.js":"194Lf","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"sjDuL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(callback) {
        var quads = [], next = [], q;
        if (this._root) quads.push(new (0, _quadJsDefault.default)(this._root, this._x0, this._y0, this._x1, this._y1));
        while(q = quads.pop()){
            var node = q.node;
            if (node.length) {
                var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
                if (child = node[0]) quads.push(new (0, _quadJsDefault.default)(child, x0, y0, xm, ym));
                if (child = node[1]) quads.push(new (0, _quadJsDefault.default)(child, xm, y0, x1, ym));
                if (child = node[2]) quads.push(new (0, _quadJsDefault.default)(child, x0, ym, xm, y1));
                if (child = node[3]) quads.push(new (0, _quadJsDefault.default)(child, xm, ym, x1, y1));
            }
            next.push(q);
        }
        while(q = next.pop())callback(q.node, q.x0, q.y0, q.x1, q.y1);
        return this;
    });
var _quadJs = require("./quad.js");
var _quadJsDefault = parcelHelpers.interopDefault(_quadJs);

},{"./quad.js":"194Lf","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"ctxBF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultX", ()=>defaultX);
parcelHelpers.export(exports, "default", ()=>function(_) {
        return arguments.length ? (this._x = _, this) : this._x;
    });
function defaultX(d) {
    return d[0];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"3e0Lw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultY", ()=>defaultY);
parcelHelpers.export(exports, "default", ()=>function(_) {
        return arguments.length ? (this._y = _, this) : this._y;
    });
function defaultY(d) {
    return d[1];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"h8HiP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"1Fwn7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(random) {
        return (random() - 0.5) * 1e-6;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"fWUwQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(links) {
        var id = index, strength = defaultStrength, strengths, distance = (0, _constantJsDefault.default)(30), distances, nodes, count, bias, random, iterations = 1;
        if (links == null) links = [];
        function defaultStrength(link) {
            return 1 / Math.min(count[link.source.index], count[link.target.index]);
        }
        function force(alpha) {
            for(var k = 0, n = links.length; k < iterations; ++k)for(var i = 0, link, source, target, x, y, l, b; i < n; ++i){
                link = links[i], source = link.source, target = link.target;
                x = target.x + target.vx - source.x - source.vx || (0, _jiggleJsDefault.default)(random);
                y = target.y + target.vy - source.y - source.vy || (0, _jiggleJsDefault.default)(random);
                l = Math.sqrt(x * x + y * y);
                l = (l - distances[i]) / l * alpha * strengths[i];
                x *= l, y *= l;
                target.vx -= x * (b = bias[i]);
                target.vy -= y * b;
                source.vx += x * (b = 1 - b);
                source.vy += y * b;
            }
        }
        function initialize() {
            if (!nodes) return;
            var i, n = nodes.length, m = links.length, nodeById = new Map(nodes.map((d, i)=>[
                    id(d, i, nodes),
                    d
                ])), link;
            for(i = 0, count = new Array(n); i < m; ++i){
                link = links[i], link.index = i;
                if (typeof link.source !== "object") link.source = find(nodeById, link.source);
                if (typeof link.target !== "object") link.target = find(nodeById, link.target);
                count[link.source.index] = (count[link.source.index] || 0) + 1;
                count[link.target.index] = (count[link.target.index] || 0) + 1;
            }
            for(i = 0, bias = new Array(m); i < m; ++i)link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
            strengths = new Array(m), initializeStrength();
            distances = new Array(m), initializeDistance();
        }
        function initializeStrength() {
            if (!nodes) return;
            for(var i = 0, n = links.length; i < n; ++i)strengths[i] = +strength(links[i], i, links);
        }
        function initializeDistance() {
            if (!nodes) return;
            for(var i = 0, n = links.length; i < n; ++i)distances[i] = +distance(links[i], i, links);
        }
        force.initialize = function(_nodes, _random) {
            nodes = _nodes;
            random = _random;
            initialize();
        };
        force.links = function(_) {
            return arguments.length ? (links = _, initialize(), force) : links;
        };
        force.id = function(_) {
            return arguments.length ? (id = _, force) : id;
        };
        force.iterations = function(_) {
            return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
            return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initializeStrength(), force) : strength;
        };
        force.distance = function(_) {
            return arguments.length ? (distance = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initializeDistance(), force) : distance;
        };
        return force;
    });
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _jiggleJs = require("./jiggle.js");
var _jiggleJsDefault = parcelHelpers.interopDefault(_jiggleJs);
function index(d) {
    return d.index;
}
function find(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node) throw new Error("node not found: " + nodeId);
    return node;
}

},{"./constant.js":"h8HiP","./jiggle.js":"1Fwn7","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"9Qwyz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var nodes, node, random, alpha, strength = (0, _constantJsDefault.default)(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
        function force(_) {
            var i, n = nodes.length, tree = (0, _d3Quadtree.quadtree)(nodes, (0, _simulationJs.x), (0, _simulationJs.y)).visitAfter(accumulate);
            for(alpha = _, i = 0; i < n; ++i)node = nodes[i], tree.visit(apply);
        }
        function initialize() {
            if (!nodes) return;
            var i, n = nodes.length, node;
            strengths = new Array(n);
            for(i = 0; i < n; ++i)node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
        }
        function accumulate(quad) {
            var strength = 0, q, c, weight = 0, x, y, i;
            // For internal nodes, accumulate forces from child quadrants.
            if (quad.length) {
                for(x = y = i = 0; i < 4; ++i)if ((q = quad[i]) && (c = Math.abs(q.value))) strength += q.value, weight += c, x += c * q.x, y += c * q.y;
                quad.x = x / weight;
                quad.y = y / weight;
            } else {
                q = quad;
                q.x = q.data.x;
                q.y = q.data.y;
                do strength += strengths[q.data.index];
                while (q = q.next);
            }
            quad.value = strength;
        }
        function apply(quad, x1, _, x2) {
            if (!quad.value) return true;
            var x = quad.x - node.x, y = quad.y - node.y, w = x2 - x1, l = x * x + y * y;
            // Apply the Barnes-Hut approximation if possible.
            // Limit forces for very close nodes; randomize direction if coincident.
            if (w * w / theta2 < l) {
                if (l < distanceMax2) {
                    if (x === 0) x = (0, _jiggleJsDefault.default)(random), l += x * x;
                    if (y === 0) y = (0, _jiggleJsDefault.default)(random), l += y * y;
                    if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
                    node.vx += x * quad.value * alpha / l;
                    node.vy += y * quad.value * alpha / l;
                }
                return true;
            } else if (quad.length || l >= distanceMax2) return;
            // Limit forces for very close nodes; randomize direction if coincident.
            if (quad.data !== node || quad.next) {
                if (x === 0) x = (0, _jiggleJsDefault.default)(random), l += x * x;
                if (y === 0) y = (0, _jiggleJsDefault.default)(random), l += y * y;
                if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
            }
            do if (quad.data !== node) {
                w = strengths[quad.data.index] * alpha / l;
                node.vx += x * w;
                node.vy += y * w;
            }
            while (quad = quad.next);
        }
        force.initialize = function(_nodes, _random) {
            nodes = _nodes;
            random = _random;
            initialize();
        };
        force.strength = function(_) {
            return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : strength;
        };
        force.distanceMin = function(_) {
            return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
        };
        force.distanceMax = function(_) {
            return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
        };
        force.theta = function(_) {
            return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
        };
        return force;
    });
var _d3Quadtree = require("d3-quadtree");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _jiggleJs = require("./jiggle.js");
var _jiggleJsDefault = parcelHelpers.interopDefault(_jiggleJs);
var _simulationJs = require("./simulation.js");

},{"d3-quadtree":"hfQOE","./constant.js":"h8HiP","./jiggle.js":"1Fwn7","./simulation.js":"eCn62","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"eCn62":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "x", ()=>x);
parcelHelpers.export(exports, "y", ()=>y);
parcelHelpers.export(exports, "default", ()=>function(nodes) {
        var simulation, alpha = 1, alphaMin = 0.001, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = new Map(), stepper = (0, _d3Timer.timer)(step), event = (0, _d3Dispatch.dispatch)("tick", "end"), random = (0, _lcgJsDefault.default)();
        if (nodes == null) nodes = [];
        function step() {
            tick();
            event.call("tick", simulation);
            if (alpha < alphaMin) {
                stepper.stop();
                event.call("end", simulation);
            }
        }
        function tick(iterations) {
            var i, n = nodes.length, node;
            if (iterations === undefined) iterations = 1;
            for(var k = 0; k < iterations; ++k){
                alpha += (alphaTarget - alpha) * alphaDecay;
                forces.forEach(function(force) {
                    force(alpha);
                });
                for(i = 0; i < n; ++i){
                    node = nodes[i];
                    if (node.fx == null) node.x += node.vx *= velocityDecay;
                    else node.x = node.fx, node.vx = 0;
                    if (node.fy == null) node.y += node.vy *= velocityDecay;
                    else node.y = node.fy, node.vy = 0;
                }
            }
            return simulation;
        }
        function initializeNodes() {
            for(var i = 0, n = nodes.length, node; i < n; ++i){
                node = nodes[i], node.index = i;
                if (node.fx != null) node.x = node.fx;
                if (node.fy != null) node.y = node.fy;
                if (isNaN(node.x) || isNaN(node.y)) {
                    var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
                    node.x = radius * Math.cos(angle);
                    node.y = radius * Math.sin(angle);
                }
                if (isNaN(node.vx) || isNaN(node.vy)) node.vx = node.vy = 0;
            }
        }
        function initializeForce(force) {
            if (force.initialize) force.initialize(nodes, random);
            return force;
        }
        initializeNodes();
        return simulation = {
            tick: tick,
            restart: function() {
                return stepper.restart(step), simulation;
            },
            stop: function() {
                return stepper.stop(), simulation;
            },
            nodes: function(_) {
                return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
            },
            alpha: function(_) {
                return arguments.length ? (alpha = +_, simulation) : alpha;
            },
            alphaMin: function(_) {
                return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
            },
            alphaDecay: function(_) {
                return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
            },
            alphaTarget: function(_) {
                return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
            },
            velocityDecay: function(_) {
                return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
            },
            randomSource: function(_) {
                return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
            },
            force: function(name, _) {
                return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
            },
            find: function(x, y, radius) {
                var i = 0, n = nodes.length, dx, dy, d2, node, closest;
                if (radius == null) radius = Infinity;
                else radius *= radius;
                for(i = 0; i < n; ++i){
                    node = nodes[i];
                    dx = x - node.x;
                    dy = y - node.y;
                    d2 = dx * dx + dy * dy;
                    if (d2 < radius) closest = node, radius = d2;
                }
                return closest;
            },
            on: function(name, _) {
                return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
            }
        };
    });
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var _lcgJs = require("./lcg.js");
var _lcgJsDefault = parcelHelpers.interopDefault(_lcgJs);
function x(d) {
    return d.x;
}
function y(d) {
    return d.y;
}
var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));

},{"d3-dispatch":"l3yS3","d3-timer":"ky7NA","./lcg.js":"k0NSR","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"l3yS3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dispatch", ()=>(0, _dispatchJsDefault.default));
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);

},{"./dispatch.js":"fbyhx","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"fbyhx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var noop = {
    value: ()=>{}
};
function dispatch() {
    for(var i = 0, n = arguments.length, _ = {}, t; i < n; ++i){
        if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
    }
    return new Dispatch(_);
}
function Dispatch(_) {
    this._ = _;
}
function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {
            type: t,
            name: name
        };
    });
}
Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
        var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
            while(++i < n)if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
            return;
        }
        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while(++i < n){
            if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
            else if (callback == null) for(t in _)_[t] = set(_[t], typename.name, null);
        }
        return this;
    },
    copy: function() {
        var copy = {}, _ = this._;
        for(var t in _)copy[t] = _[t].slice();
        return new Dispatch(copy);
    },
    call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for(var args = new Array(n), i = 0, n, t; i < n; ++i)args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(var t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    }
};
function get(type, name) {
    for(var i = 0, n = type.length, c; i < n; ++i){
        if ((c = type[i]).name === name) return c.value;
    }
}
function set(type, name, callback) {
    for(var i = 0, n = type.length; i < n; ++i)if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
    }
    if (callback != null) type.push({
        name: name,
        value: callback
    });
    return type;
}
exports.default = dispatch;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"ky7NA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>(0, _timerJs.now));
parcelHelpers.export(exports, "timer", ()=>(0, _timerJs.timer));
parcelHelpers.export(exports, "timerFlush", ()=>(0, _timerJs.timerFlush));
parcelHelpers.export(exports, "timeout", ()=>(0, _timeoutJsDefault.default));
parcelHelpers.export(exports, "interval", ()=>(0, _intervalJsDefault.default));
var _timerJs = require("./timer.js");
var _timeoutJs = require("./timeout.js");
var _timeoutJsDefault = parcelHelpers.interopDefault(_timeoutJs);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);

},{"./timer.js":"3ASaY","./timeout.js":false,"./interval.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"3ASaY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>now);
parcelHelpers.export(exports, "Timer", ()=>Timer);
parcelHelpers.export(exports, "timer", ()=>timer);
parcelHelpers.export(exports, "timerFlush", ()=>timerFlush);
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1000, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
};
function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
    clockNow = 0;
}
function Timer() {
    this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
            if (taskTail) taskTail._next = this;
            else taskHead = this;
            taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
    },
    stop: function() {
        if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
        }
    }
};
function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
}
function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while(t){
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
    }
    --frame;
}
function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
        timerFlush();
    } finally{
        frame = 0;
        nap();
        clockNow = 0;
    }
}
function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while(t1)if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
    } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
    taskTail = t0;
    sleep(time);
}
function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
        if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
    } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"k0NSR":[function(require,module,exports) {
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        let s = 1;
        return ()=>(s = (a * s + c) % m) / m;
    });
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"4bJRf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        var strength = (0, _constantJsDefault.default)(0.1), nodes, strengths, xz;
        if (typeof x !== "function") x = (0, _constantJsDefault.default)(x == null ? 0 : +x);
        function force(alpha) {
            for(var i = 0, n = nodes.length, node; i < n; ++i)node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
        }
        function initialize() {
            if (!nodes) return;
            var i, n = nodes.length;
            strengths = new Array(n);
            xz = new Array(n);
            for(i = 0; i < n; ++i)strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
        }
        force.initialize = function(_) {
            nodes = _;
            initialize();
        };
        force.strength = function(_) {
            return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : strength;
        };
        force.x = function(_) {
            return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : x;
        };
        return force;
    });
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);

},{"./constant.js":"h8HiP","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"jtlc1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(y) {
        var strength = (0, _constantJsDefault.default)(0.1), nodes, strengths, yz;
        if (typeof y !== "function") y = (0, _constantJsDefault.default)(y == null ? 0 : +y);
        function force(alpha) {
            for(var i = 0, n = nodes.length, node; i < n; ++i)node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
        }
        function initialize() {
            if (!nodes) return;
            var i, n = nodes.length;
            strengths = new Array(n);
            yz = new Array(n);
            for(i = 0; i < n; ++i)strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
        }
        force.initialize = function(_) {
            nodes = _;
            initialize();
        };
        force.strength = function(_) {
            return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : strength;
        };
        force.y = function(_) {
            return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), initialize(), force) : y;
        };
        return force;
    });
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);

},{"./constant.js":"h8HiP","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"bUAXP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Emitter", ()=>Emitter);
class Emitter {
    constructor(){
        this._listeners = new Map();
    }
    /**
     * Adds a one-time listener function for the event named eventName. The next time eventName is
     * triggered, this listener is removed and then invoked.
     *
     * @see {@link https://nodejs.org/api/events.html#emitteronceeventname-listener}
     * @param {IEventKey} eventName Event name
     * @param {IEventReceiver} func Event function
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ once(eventName, func) {
        const newListener = {
            callable: func,
            isOnce: true
        };
        const listeners = this._listeners.get(eventName);
        if (listeners) listeners.push(newListener);
        else this._listeners.set(eventName, [
            newListener
        ]);
        return this;
    }
    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added. Multiple calls passing
     * the same combination of eventName and listener will result in the listener being added,
     * and called, multiple times.
     *
     * @see {@link https://nodejs.org/api/events.html#emitteroneventname-listener}
     * @param {IEventKey} eventName Event name
     * @param {IEventReceiver} func Event function
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ on(eventName, func) {
        const newListener = {
            callable: func
        };
        const listeners = this._listeners.get(eventName);
        if (listeners) listeners.push(newListener);
        else this._listeners.set(eventName, [
            newListener
        ]);
        return this;
    }
    /**
     * Removes the specified listener from the listener array for the event named eventName.
     *
     * @see {@link https://nodejs.org/api/events.html#emitterremovelistenereventname-listener}
     * @param {IEventKey} eventName Event name
     * @param {IEventReceiver} func Event function
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ off(eventName, func) {
        const listeners = this._listeners.get(eventName);
        if (listeners) {
            const filteredListeners = listeners.filter((listener)=>listener.callable !== func);
            this._listeners.set(eventName, filteredListeners);
        }
        return this;
    }
    /**
     * Synchronously calls each of the listeners registered for the event named eventName,
     * in the order they were registered, passing the supplied arguments to each.
     * Returns true if the event had listeners, false otherwise.
     *
     * @param {IEventKey} eventName Event name
     * @param {any} params Event parameters
     *
     * @return {boolean} True if the event had listeners, false otherwise
     */ emit(eventName, params) {
        const listeners = this._listeners.get(eventName);
        if (!listeners || listeners.length === 0) return false;
        let hasOnceListener = false;
        for(let i = 0; i < listeners.length; i++){
            if (listeners[i].isOnce) hasOnceListener = true;
            listeners[i].callable(params);
        }
        if (hasOnceListener) {
            const filteredListeners = listeners.filter((listener)=>!listener.isOnce);
            this._listeners.set(eventName, filteredListeners);
        }
        return true;
    }
    /**
     * Returns an array listing the events for which the emitter has registered listeners.
     *
     * @see {@link https://nodejs.org/api/events.html#emittereventnames}
     * @return {IEventKey[]} Event names with registered listeners
     */ eventNames() {
        return [
            ...this._listeners.keys()
        ];
    }
    /**
     * Returns the number of listeners listening to the event named eventName.
     *
     * @see {@link https://nodejs.org/api/events.html#emitterlistenercounteventname}
     * @param {IEventKey} eventName Event name
     * @return {number} Number of listeners listening to the event name
     */ listenerCount(eventName) {
        const listeners = this._listeners.get(eventName);
        return listeners ? listeners.length : 0;
    }
    /**
     * Returns a copy of the array of listeners for the event named eventName.
     *
     * @see {@link https://nodejs.org/api/events.html#emitterlistenerseventname}
     * @param {IEventKey} eventName Event name
     * @return {IEventReceiver[]} Array of listeners for the event name
     */ listeners(eventName) {
        const listeners = this._listeners.get(eventName);
        if (!listeners) return [];
        return listeners.map((listener)=>listener.callable);
    }
    /**
     * Alias for emitter.on(eventName, listener).
     *
     * @see {@link https://nodejs.org/api/events.html#emitteraddlistenereventname-listener}
     * @param {IEventKey} eventName Event name
     * @param {IEventReceiver} func Event function
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ addListener(eventName, func) {
        return this.on(eventName, func);
    }
    /**
     * Alias for emitter.off(eventName, listener).
     *
     * @see {@link https://nodejs.org/api/events.html#emitterremovelistenereventname-listener}
     * @param {IEventKey} eventName Event name
     * @param {IEventReceiver} func Event function
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ removeListener(eventName, func) {
        return this.off(eventName, func);
    }
    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * @see {@link https://nodejs.org/api/events.html#emitterremovealllistenerseventname}
     * @param {IEventKey} eventName Event name
     * @return {IEmitter} Reference to the EventEmitter, so that calls can be chained
     */ removeAllListeners(eventName) {
        if (eventName) this._listeners.delete(eventName);
        else this._listeners.clear();
        return this;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"jXryQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "copyObject", ()=>copyObject);
parcelHelpers.export(exports, "isObjectEqual", ()=>isObjectEqual);
var _typeUtils = require("./type.utils");
const copyObject = (obj)=>{
    if ((0, _typeUtils.isDate)(obj)) return copyDate(obj);
    if ((0, _typeUtils.isArray)(obj)) return copyArray(obj);
    if ((0, _typeUtils.isPlainObject)(obj)) return copyPlainObject(obj);
    // It is a primitive, function or a custom class
    return obj;
};
const isObjectEqual = (obj1, obj2)=>{
    const isDate1 = (0, _typeUtils.isDate)(obj1);
    const isDate2 = (0, _typeUtils.isDate)(obj2);
    if (isDate1 && !isDate2 || !isDate1 && isDate2) return false;
    if (isDate1 && isDate2) return obj1.getTime() === obj2.getTime();
    const isArray1 = (0, _typeUtils.isArray)(obj1);
    const isArray2 = (0, _typeUtils.isArray)(obj2);
    if (isArray1 && !isArray2 || !isArray1 && isArray2) return false;
    if (isArray1 && isArray2) {
        if (obj1.length !== obj2.length) return false;
        return obj1.every((value, index)=>{
            return isObjectEqual(value, obj2[index]);
        });
    }
    const isObject1 = (0, _typeUtils.isPlainObject)(obj1);
    const isObject2 = (0, _typeUtils.isPlainObject)(obj2);
    if (isObject1 && !isObject2 || !isObject1 && isObject2) return false;
    if (isObject1 && isObject2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (!isObjectEqual(keys1, keys2)) return false;
        return keys1.every((key)=>{
            return isObjectEqual(obj1[key], obj2[key]);
        });
    }
    return obj1 === obj2;
};
/**
 * Copies date object into a new date object.
 *
 * @param {Date} date Date
 * @return {Date} Date object copy
 */ const copyDate = (date)=>{
    return new Date(date);
};
/**
 * Deep copies an array into a new array. Array values will
 * be deep copied too.
 *
 * @param {Array} array Array
 * @return {Array} Deep copied array
 */ const copyArray = (array)=>{
    return array.map((value)=>copyObject(value));
};
/**
 * Deep copies a plain object into a new plain object. Object
 * values will be deep copied too.
 *
 * @param {Record} obj Object
 * @return {Record} Deep copied object
 */ const copyPlainObject = (obj)=>{
    const newObject = {};
    Object.keys(obj).forEach((key)=>{
        newObject[key] = copyObject(obj[key]);
    });
    return newObject;
};

},{"./type.utils":"7IO8D","@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"7IO8D":[function(require,module,exports) {
/**
 * Type check for string values.
 *
 * @param {any} value Any value
 * @return {boolean} True if it is a string, false otherwise
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isString", ()=>isString);
parcelHelpers.export(exports, "isNumber", ()=>isNumber);
parcelHelpers.export(exports, "isBoolean", ()=>isBoolean);
parcelHelpers.export(exports, "isDate", ()=>isDate);
parcelHelpers.export(exports, "isArray", ()=>isArray);
parcelHelpers.export(exports, "isPlainObject", ()=>isPlainObject);
parcelHelpers.export(exports, "isNull", ()=>isNull);
parcelHelpers.export(exports, "isFunction", ()=>isFunction);
const isString = (value)=>{
    return typeof value === "string";
};
const isNumber = (value)=>{
    return typeof value === "number";
};
const isBoolean = (value)=>{
    return typeof value === "boolean";
};
const isDate = (value)=>{
    return value instanceof Date;
};
const isArray = (value)=>{
    return Array.isArray(value);
};
const isPlainObject = (value)=>{
    return value !== null && typeof value === "object" && value.constructor.name === "Object";
};
const isNull = (value)=>{
    return value === null;
};
const isFunction = (value)=>{
    return typeof value === "function";
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"bSB2d":[function(require,module,exports) {
// Messages are objects going into the simulation worker.
// They can be thought of similar to requests.
// (not quite as there is no immediate response to a request)
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WorkerInputType", ()=>WorkerInputType);
var WorkerInputType;
(function(WorkerInputType) {
    // Set node and edge data without simulating
    WorkerInputType["SetData"] = "Set Data";
    WorkerInputType["AddData"] = "Add Data";
    WorkerInputType["UpdateData"] = "Update Data";
    WorkerInputType["ClearData"] = "Clear Data";
    // Simulation message types
    WorkerInputType["Simulate"] = "Simulate";
    WorkerInputType["ActivateSimulation"] = "Activate Simulation";
    WorkerInputType["StartSimulation"] = "Start Simulation";
    WorkerInputType["UpdateSimulation"] = "Update Simulation";
    WorkerInputType["StopSimulation"] = "Stop Simulation";
    // Node dragging message types
    WorkerInputType["StartDragNode"] = "Start Drag Node";
    WorkerInputType["DragNode"] = "Drag Node";
    WorkerInputType["EndDragNode"] = "End Drag Node";
    WorkerInputType["FixNodes"] = "Fix Nodes";
    WorkerInputType["ReleaseNodes"] = "Release Nodes";
    // Settings and special params
    WorkerInputType["SetSettings"] = "Set Settings";
})(WorkerInputType || (WorkerInputType = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}],"cSvpC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WorkerOutputType", ()=>WorkerOutputType);
var WorkerOutputType;
(function(WorkerOutputType) {
    WorkerOutputType["SIMULATION_START"] = "simulation-start";
    WorkerOutputType["SIMULATION_PROGRESS"] = "simulation-progress";
    WorkerOutputType["SIMULATION_END"] = "simulation-end";
    WorkerOutputType["NODE_DRAG"] = "node-drag";
    WorkerOutputType["NODE_DRAG_END"] = "node-drag-end";
    WorkerOutputType["SETTINGS_UPDATE"] = "settings-update";
})(WorkerOutputType || (WorkerOutputType = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8s6SR"}]},["fkT4L","ld1WH"], "ld1WH", "parcelRequirefc75")

//# sourceMappingURL=process.worker.2d6c50ff.js.map
