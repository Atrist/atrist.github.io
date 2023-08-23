## 示例代码
```js
import * as Janus from './janus.es.js'

Janus.init({
   debug: true,
   dependencies: Janus.useDefaultDependencies(), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
   callback: function() {
           // Done!
   });
});
```

## 解析
init函数将传入的参数进行初始化, 如果已经初始化就直接调用传入的回调函数

如果没有初始化，就开始初始化:

判断 console 对象, 然后对 根据debug参数进行赋值
```js
if(typeof console == "undefined" || typeof console.log == "undefined")
			console = { log: function() {} };
		// Console logging (all debugging disabled by default)
Janus.trace = Janus.noop;
Janus.debug = Janus.noop;
Janus.vdebug = Janus.noop;
Janus.log = Janus.noop;
Janus.warn = Janus.noop;
Janus.error = Janus.noop;
if(options.debug === true || options.debug === "all") {
    // Enable all debugging levels
    Janus.trace = console.trace.bind(console);
    Janus.debug = console.debug.bind(console);
    Janus.vdebug = console.debug.bind(console);
    Janus.log = console.log.bind(console);
    Janus.warn = console.warn.bind(console);
    Janus.error = console.error.bind(console);
} else if(Array.isArray(options.debug)) {
    for(var i in options.debug) {
        var d = options.debug[i];
        switch(d) {
            case "trace":
                Janus.trace = console.trace.bind(console);
                break;
            case "debug":
                Janus.debug = console.debug.bind(console);
                break;
            case "vdebug":
                Janus.vdebug = console.debug.bind(console);
                break;
            case "log":
                Janus.log = console.log.bind(console);
                break;
            case "warn":
                Janus.warn = console.warn.bind(console);
                break;
            case "error":
                Janus.error = console.error.bind(console);
                break;
            default:
                console.error("Unknown debugging option '" + d + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
                break;
        }
    }
}
Janus.log("Initializing library");
```

然后就是根据传入的 依赖参数 进行相关函数的初始化
```js
var usedDependencies = options.dependencies || Janus.useDefaultDependencies();
Janus.isArray = usedDependencies.isArray;
Janus.webRTCAdapter = usedDependencies.webRTCAdapter;
Janus.httpAPICall = usedDependencies.httpAPICall;
Janus.newWebSocket = usedDependencies.newWebSocket;
Janus.extension = usedDependencies.extension;
Janus.extension.init();
```
默认依赖中函数提供的底层封装：
- fetch：用于 httpAPICAll
- Promise: 异步的一种解决方案
- Websocket：ws协议的提供
- extension：如果没有参数传入，会选用默认的扩展

这些所有API并没有所谓的兼容，都是浏览器原生的API，所以在文档中，这里运行是要求了更加新的浏览器，也意味着向下兼容性不高。

默认扩展
```js
var defaultExtension = {
	// Screensharing Chrome Extension ID
	extensionId: 'hapfgfdkleiggjjpfpenajgdnfckjpaj',
	isInstalled: function() { return document.querySelector('#janus-extension-installed') !== null; },
	getScreen: function (callback) {
		var pending = window.setTimeout(function () {
			var error = new Error('NavigatorUserMediaError');
			error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)';
			return callback(error);
		}, 1000);
		this.cache[pending] = callback;
		window.postMessage({ type: 'janusGetScreen', id: pending }, '*');
	},
	init: function () {
		var cache = {};
		this.cache = cache;
		// Wait for events from the Chrome Extension
		window.addEventListener('message', function (event) {
			if(event.origin != window.location.origin)
				return;
			if(event.data.type == 'janusGotScreen' && cache[event.data.id]) {
				var callback = cache[event.data.id];
				delete cache[event.data.id];

				if (event.data.sourceId === '') {
					// user canceled
					var error = new Error('NavigatorUserMediaError');
					error.name = 'You cancelled the request for permission, giving up...';
					callback(error);
				} else {
					callback(null, event.data.sourceId);
				}
			} else if (event.data.type == 'janusGetScreenPending') {
				console.log('clearing ', event.data.id);
				window.clearTimeout(event.data.id);
			}
		});
	}
};
```

::: details 关于 useDefaultDependencies
```js
Janus.useDefaultDependencies = function (deps) {
	var f = (deps && deps.fetch) || fetch;
	var p = (deps && deps.Promise) || Promise;
	var socketCls = (deps && deps.WebSocket) || WebSocket;

	return {
		newWebSocket: function(server, proto) { return new socketCls(server, proto); },
		extension: (deps && deps.extension) || defaultExtension,
		isArray: function(arr) { return Array.isArray(arr); },
		webRTCAdapter: (deps && deps.adapter) || adapter,
		httpAPICall: function(url, options) {
			var fetchOptions = {
				method: options.verb,
				headers: {
					'Accept': 'application/json, text/plain, */*'
				},
				cache: 'no-cache'
			};
			if(options.verb === "POST") {
				fetchOptions.headers['Content-Type'] = 'application/json';
			}
			if(options.withCredentials !== undefined) {
				fetchOptions.credentials = options.withCredentials === true ? 'include' : (options.withCredentials ? options.withCredentials : 'omit');
			}
			if(options.body !== undefined) {
				fetchOptions.body = JSON.stringify(options.body);
			}

			var fetching = f(url, fetchOptions).catch(function(error) {
				return p.reject({message: 'Probably a network error, is the server down?', error: error});
			});

			/*
			 * fetch() does not natively support timeouts.
			 * Work around this by starting a timeout manually, and racing it agains the fetch() to see which thing resolves first.
			 */

			if(options.timeout !== undefined) {
				var timeout = new p(function(resolve, reject) {
					var timerId = setTimeout(function() {
						clearTimeout(timerId);
						return reject({message: 'Request timed out', timeout: options.timeout});
					}, options.timeout);
				});
				fetching = p.race([fetching,timeout]);
			}

			fetching.then(function(response) {
				if(response.ok) {
					if(typeof(options.success) === typeof(Janus.noop)) {
						return response.json().then(function(parsed) {
							options.success(parsed);
						}).catch(function(error) {
							return p.reject({message: 'Failed to parse response body', error: error, response: response});
						});
					}
				}
				else {
					return p.reject({message: 'API call failed', response: response});
				}
			}).catch(function(error) {
				if(typeof(options.error) === typeof(Janus.noop)) {
					options.error(error.message || '<< internal error >>', error);
				}
			});

			return fetching;
		}
	}
};
```
:::

## 源码
::: details 点击查看代码
```js
Janus.init = function(options) {
	options = options || {};
	options.callback = (typeof options.callback == "function") ? options.callback : Janus.noop;
	if(Janus.initDone === true) {
		// Already initialized
		options.callback();
	} else {
		if(typeof console == "undefined" || typeof console.log == "undefined")
			console = { log: function() {} };
		// Console logging (all debugging disabled by default)
		Janus.trace = Janus.noop;
		Janus.debug = Janus.noop;
		Janus.vdebug = Janus.noop;
		Janus.log = Janus.noop;
		Janus.warn = Janus.noop;
		Janus.error = Janus.noop;
		if(options.debug === true || options.debug === "all") {
			// Enable all debugging levels
			Janus.trace = console.trace.bind(console);
			Janus.debug = console.debug.bind(console);
			Janus.vdebug = console.debug.bind(console);
			Janus.log = console.log.bind(console);
			Janus.warn = console.warn.bind(console);
			Janus.error = console.error.bind(console);
		} else if(Array.isArray(options.debug)) {
			for(var i in options.debug) {
				var d = options.debug[i];
				switch(d) {
					case "trace":
						Janus.trace = console.trace.bind(console);
						break;
					case "debug":
						Janus.debug = console.debug.bind(console);
						break;
					case "vdebug":
						Janus.vdebug = console.debug.bind(console);
						break;
					case "log":
						Janus.log = console.log.bind(console);
						break;
					case "warn":
						Janus.warn = console.warn.bind(console);
						break;
					case "error":
						Janus.error = console.error.bind(console);
						break;
					default:
						console.error("Unknown debugging option '" + d + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
						break;
				}
			}
		}
		Janus.log("Initializing library");

		var usedDependencies = options.dependencies || Janus.useDefaultDependencies();
		Janus.isArray = usedDependencies.isArray;
		Janus.webRTCAdapter = usedDependencies.webRTCAdapter;
		Janus.httpAPICall = usedDependencies.httpAPICall;
		Janus.newWebSocket = usedDependencies.newWebSocket;
		Janus.extension = usedDependencies.extension;
		Janus.extension.init();

		// Helper method to enumerate devices
		Janus.listDevices = function(callback, config) {
			callback = (typeof callback == "function") ? callback : Janus.noop;
			if (config == null) config = { audio: true, video: true };
			if(Janus.isGetUserMediaAvailable()) {
				navigator.mediaDevices.getUserMedia(config)
				.then(function(stream) {
					navigator.mediaDevices.enumerateDevices().then(function(devices) {
						Janus.debug(devices);
						callback(devices);
						// Get rid of the now useless stream
						try {
							var tracks = stream.getTracks();
							for(var i in tracks) {
								var mst = tracks[i];
								if(mst !== null && mst !== undefined)
									mst.stop();
							}
						} catch(e) {}
					});
				})
				.catch(function(err) {
					Janus.error(err);
					callback([]);
				});
			} else {
				Janus.warn("navigator.mediaDevices unavailable");
				callback([]);
			}
		}
		// Helper methods to attach/reattach a stream to a video element (previously part of adapter.js)
		Janus.attachMediaStream = function(element, stream) {
			if(Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
				var chromever = Janus.webRTCAdapter.browserDetails.version;
				if(chromever >= 52) {
					element.srcObject = stream;
				} else if(typeof element.src !== 'undefined') {
					element.src = URL.createObjectURL(stream);
				} else {
					Janus.error("Error attaching stream to element");
				}
			} else {
				element.srcObject = stream;
			}
		};
		Janus.reattachMediaStream = function(to, from) {
			if(Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
				var chromever = Janus.webRTCAdapter.browserDetails.version;
				if(chromever >= 52) {
					to.srcObject = from.srcObject;
				} else if(typeof to.src !== 'undefined') {
					to.src = from.src;
				} else {
					Janus.error("Error reattaching stream to element");
				}
			} else {
				to.srcObject = from.srcObject;
			}
		};
		// Detect tab close: make sure we don't loose existing onbeforeunload handlers
		// (note: for iOS we need to subscribe to a different event, 'pagehide', see
		// https://gist.github.com/thehunmonkgroup/6bee8941a49b86be31a787fe8f4b8cfe)
		var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
		var eventName = iOS ? 'pagehide' : 'beforeunload';
		var oldOBF = window["on" + eventName];
		window.addEventListener(eventName, function(event) {
			Janus.log("Closing window");
			for(var s in Janus.sessions) {
				if(Janus.sessions[s] !== null && Janus.sessions[s] !== undefined &&
						Janus.sessions[s].destroyOnUnload) {
					Janus.log("Destroying session " + s);
					Janus.sessions[s].destroy({asyncRequest: false, notifyDestroyed: false});
				}
			}
			if(oldOBF && typeof oldOBF == "function")
				oldOBF();
		});
		// If this is a Safari Technology Preview, check if VP8 is supported
		Janus.safariVp8 = false;
		if(Janus.webRTCAdapter.browserDetails.browser === 'safari' &&
				Janus.webRTCAdapter.browserDetails.version >= 605) {
			// Let's see if RTCRtpSender.getCapabilities() is there
			if(RTCRtpSender && RTCRtpSender.getCapabilities && RTCRtpSender.getCapabilities("video") &&
					RTCRtpSender.getCapabilities("video").codecs && RTCRtpSender.getCapabilities("video").codecs.length) {
				for(var i in RTCRtpSender.getCapabilities("video").codecs) {
					var codec = RTCRtpSender.getCapabilities("video").codecs[i];
					if(codec && codec.mimeType && codec.mimeType.toLowerCase() === "video/vp8") {
						Janus.safariVp8 = true;
						break;
					}
				}
				if(Janus.safariVp8) {
					Janus.log("This version of Safari supports VP8");
				} else {
					Janus.warn("This version of Safari does NOT support VP8: if you're using a Technology Preview, " +
						"try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu");
				}
			} else {
				// We do it in a very ugly way, as there's no alternative...
				// We create a PeerConnection to see if VP8 is in an offer
				var testpc = new RTCPeerConnection({}, {});
				testpc.createOffer({offerToReceiveVideo: true}).then(function(offer) {
					Janus.safariVp8 = offer.sdp.indexOf("VP8") !== -1;
					if(Janus.safariVp8) {
						Janus.log("This version of Safari supports VP8");
					} else {
						Janus.warn("This version of Safari does NOT support VP8: if you're using a Technology Preview, " +
							"try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu");
					}
					testpc.close();
					testpc = null;
				});
			}
		}
		// Check if this browser supports Unified Plan and transceivers
		// Based on https://codepen.io/anon/pen/ZqLwWV?editors=0010
		Janus.unifiedPlan = false;
		if(Janus.webRTCAdapter.browserDetails.browser === 'firefox' &&
				Janus.webRTCAdapter.browserDetails.version >= 59) {
			// Firefox definitely does, starting from version 59
			Janus.unifiedPlan = true;
		} else if(Janus.webRTCAdapter.browserDetails.browser === 'chrome' &&
				Janus.webRTCAdapter.browserDetails.version < 72) {
			// Chrome does, but it's only usable from version 72 on
			Janus.unifiedPlan = false;
		} else if(!('currentDirection' in RTCRtpTransceiver.prototype)) {
			// Safari supports addTransceiver() but not Unified Plan when
			// currentDirection is not defined (see codepen above)
			Janus.unifiedPlan = false;
		} else {
			// Check if addTransceiver() throws an exception
			const tempPc = new RTCPeerConnection();
			try {
				tempPc.addTransceiver('audio');
				Janus.unifiedPlan = true;
			} catch (e) {}
			tempPc.close();
		}
		Janus.initDone = true;
		options.callback();
	}
};
```
:::