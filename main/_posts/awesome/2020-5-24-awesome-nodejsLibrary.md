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


# 使用 exports 从 Node.js 文件中公开功能
Node.js 具有内置的模块系统。

Node.js 文件可以导入其他 Node.js 文件公开的功能。

当想要导入某些东西时，使用
```js
const library = require('./library')
```
可以导入存在于当前文件夹中的 library.js 文件中公开的功能。

在此文件中，必须先公开功能，然后其他文件才能将其导入。

默认情况下，文件中定义的任何其他对象或变量都是私有的，不会公开给外界。

这就是[ module 系统](http://nodejs.cn/api/modules.html)提供的 `module.exports` API 可以做的事。

当将对象或函数赋值为新的 `exports` 属性时，这就是要被公开的内容，因此，可以将其导入应用程序的其他部分或其他应用程序中。

可以通过两种方式进行操作。

第一种方式是将对象赋值给 `module.exports`（这是模块系统提供的对象），这会使文件只导出该对象：
```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//在另一个文件中

const car = require('./car')
```
第二种方式是将要导出的对象添加为 `exports` 的属性。这种方式可以导出多个对象、函数或数据：
```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car
```
或直接
```js
exports.car = {
  brand: 'Ford',
  model: 'Fiesta'
}
```
在另一个文件中，则通过引用导入的属性来使用它：
```js
const items = require('./items')
items.car
```
或
```js
const car = require('./items').car
```
`module.exports` 和 `export` 之间有什么区别？

前者公开了它指向的对象。 后者公开了它指向的对象的属性。