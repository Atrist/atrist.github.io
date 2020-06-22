---
title: nodejs一些实用的库
date: 2020-5-24
tags:
  - awesome
summary: mark下的一些nodejs库
---

## wechaty

Wechaty 是适用于微信个人帐户的 Bot SDK，可以帮助您创建 6 行 JavaScript，Python，Go 和 Java 机器人，并具有包括 Linux，Windows，MacOS 和 Docker 在内的跨平台支持

[github 地址](https://github.com/wechaty/wechaty)
[官方文档](https://wechaty.github.io/wechaty/)

## pipcoook

由阿里巴巴开源的一个 JS 框架,专门为 JavaScript 开发者提供的机器学习工具集

github 地址: [https://github.com/alibaba/pipcook](https://github.com/alibaba/pipcook)<br/>
中文文档地址: [https://alibaba.github.io/pipcook/#/zh-cn/](https://alibaba.github.io/pipcook/#/zh-cn/)

## chalk

Chalk 是一个这样的库，控制台的输出设置样式, 例如颜色,字体大小,样式等等

github 地址: [https://github.com/chalk/chalk](https://github.com/chalk/chalk)

## Progress

在控制台中创建进度条

npm 包地址: https://www.npmjs.com/package/progress

## Inquirer.js

为控制台交互提供更多的方式,例如询问多项选择,展示单选按钮,确认等

github 地址: https://github.com/SBoudrias/Inquirer.js

## nodemon

当你的代码发生变化之后,可以自动重新运行你的代码

官方地址: https://nodemon.io/<br/>
github 地址: https://github.com/remy/nodemon#nodemon

## mongoose

便于 node 编写 mongodb 程序

官网: http://www.mongoosejs.net/

## Plop

用于生成统一格式的文件,一键生成重复的文件

github 地址: https://github.com/plopjs/plop

### 安装

本地安装

```bash
npm install  --save-dev plop
```

全局安装

```bash
npm install -g plop
```

在项目根目录下创建一个 plopfile.js 文件:

```js
module.exports = function(plop) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [], // array of inquirer prompts
    actions: [], // array of actions
  })
}
```

## crypto-js

加密标准的 JavaScript 库。<br/>
github 地址:https://github.com/brix/crypto-js<br/>
文档地址: https://cryptojs.gitbook.io/docs/

### 安装

```bash
npm install crypto-js
```
### 用法demo
纯文本加密:
```js
var CryptoJS = require("crypto-js");

// 加密
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// 解密
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
```
对象加密:
```js
var CryptoJS = require("crypto-js");

var data = [{id: 1}, {id: 2}]

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]
```