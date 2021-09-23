# RTCPeerConnection 
浏览器端最重要的webrtc api之一，它是一个类，包含了许多函数，在这里介绍在一次webrtc建立的过程中，所涉及到API

## RTCPeerConnection()
RTCPeerConnection() 构造函数，返回一个新建的  `RTCPeerConnection` 实例，它代表了本地端机器与远端机器的一条连接。
### 语法
```js
const pc = new RTCPeerConnection(config)
```
可以传入一个带有配置信息的对象，用于对定制化的配置 此次连接。

一般设置的话，会传入一个 iceServe 的地址，为了能够更加成功的建立连接，开发这一般需要一个属于自己的stun服务器。
```js
const config ={
    iceServers: [     // Information about ICE servers - Use your own!
        {
          urls: "stun:stun.stunprotocol.org"
        }
    ]
}
```
## createOffer()
创建一个SDP offer，目的是启动一个新的WebRTC去连接远程端点。SDP offer包含有关已附加到WebRTC会话，浏览器支持的编解码器和选项的所有MediaStreamTracks信息，以及ICE 代理，目的是通过信令信道发送给潜在远程端点，以请求连接或更新现有连接的配置。
### 参数
- offerToReceiveAudio:布尔类型, 用于控制是否向远程对等方提供尝试发送音频的机会。
- offerToReceiveVideo:布尔类型,  用于控制是否向远程对等方提供尝试发送视频的机会。

这两个参数可以用来在 webrtc 实现单纯的从远端进行音视频的拉流，类似于直播的功能。
```js

```
## 参考资料
1. [RTCPeerConnection](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection/RTCPeerConnection)
2. [createOffer](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer)