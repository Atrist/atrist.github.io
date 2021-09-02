## 基础知识
为了更加方便的阅读源码，我们需要对`package.json`的一些字段更加的熟悉。

## package.json
这个文件是用来描述这个包的一些基本信息，相关的包依赖，是所有包必备的文件。

### 必备字段
- name 包名称
- version： 包版本
### main, browser, module
- main: 决定别人使用 `require('xxx')`时， 引入的是哪个模块对象， 默认值 `index.js`
- browser: 如果
### dependencies 与 devDependencies
- dependencies：您的应用程序在生产中所需的包。
- devDependencies：仅本地开发和测试需要的包。
### files
当你发布package时，具体那些文件会发布上去

## 参考资料
1. [npm 官方文档](https://docs.npmjs.com/about-npm)
2. [package.json npm官方文档](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)