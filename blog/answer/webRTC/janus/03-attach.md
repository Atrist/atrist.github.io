## 示例代码
```js
// Attach to echo test plugin, using the previously created janus instance
janus.attach(
{
        plugin: "janus.plugin.echotest",
        success: function(pluginHandle) {
                // Plugin attached! 'pluginHandle' is our handle
        },
        error: function(cause) {
                // Couldn't attach to the plugin
        },
        consentDialog: function(on) {
                // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
        },
        onmessage: function(msg, jsep) {
                // We got a message/event (msg) from the plugin
                // If jsep is not null, this involves a WebRTC negotiation
        },
        onlocaltrack: function(track, added) {
                // A local track to display has just been added (getUserMedia worked!) or removed
        },
        onremotetrack: function(track, mid, added) {
                // A remote track (working PeerConnection!) with a specific mid has just been added or removed
        },
        oncleanup: function() {
                // PeerConnection with the plugin closed, clean the UI
                // The plugin handle is still valid so we can create a new one
        },
        detached: function() {
                // Connection with the plugin closed, get rid of its features
                // The plugin handle is not valid anymore
        }
}
);
```
attach这个方法用于加载一个插件，这个插件，当加载成功之后，可以在success函数中进行对pluginHandle进行调用

pluginHandle
- `getId()`: returns the unique handle identifier;
- `getPlugin()`: returns the unique package name of the attached plugin;
- `send(parameters)`: sends a message (with or without a jsep to negotiate a PeerConnection) to the plugin;
- `createOffer(callbacks)`: asks the library to create a WebRTC compliant OFFER;
- `createAnswer(callbacks)`: asks the library to create a WebRTC compliant ANSWER;
- `handleRemoteJsep(callbacks)`: asks the library to handle an incoming WebRTC compliant session description;
- `dtmf(parameters)`: sends a DTMF tone on the PeerConnection;
- `data(parameters)`: sends data through the Data Channel, if available;
- `getBitrate(mid)`: gets a verbose description of the currently received video stream bitrate (optional mid to specify the stream, first video stream if missing);
- `hangup(sendRequest)`: tells the library to close the PeerConnection; if the optional sendRequest argument is set to true, then a hangup Janus API request is sent to Janus as well (disabled by default, Janus can usually figure this out via DTLS alerts and the like but it may be useful to enable it sometimes);
- `detach(parameters)`: detaches from the plugin and destroys the handle, tearing down the related PeerConnection if it exists.

### creatOffer
