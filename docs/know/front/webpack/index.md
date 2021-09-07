## webpack
前端最广泛的项目打包工具之一。

- [官网](https://webpack.js.org/)
- [中文官方](https://webpack.docschina.org/)

## 基础安装
```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

::: tip
TIPS: 在安装一个 package，而此 package 要打包到生产环境 bundle 中时，你应该使用 `npm install --save`。如果你在安装一个用于开发环境的 package 时（例如，linter, 测试库等），你应该使用 `npm install --save-dev`。
:::

## 使用一个配置文件
```
npx webpack --config webpack.config.js
```
`---config` 可以指定配置文件，默认为 `webpack.config.js`