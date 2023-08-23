## CRACO
npm包地址: [https://www.npmjs.com/package/@craco/craco](https://www.npmjs.com/package/@craco/craco)

## 用途
简单，易配置的修改由Create React App产生的webpack配置

## 简单用法
1. 安装
    ```bash
    npm install @craco/craco --save
    ```
2. 项目根目录创建一个craco.config.js 文件
3. 修改package.json的启动文件
    ```sh
    "scripts": {
      -   "start": "react-scripts start",
      +   "start": "craco start",
      -   "build": "react-scripts build",
      +   "build": "craco build"
      -   "test": "react-scripts test",
      +   "test": "craco test"
      }
    ```
