---
title: vuepress-blog-theme的配置
date: 2020-5-15
tags:
  - vue
summary: vuepress-blog-theme的简单使用
author: Atrist
---

## 官网

vuepress 的配置:
[官方中文地址](https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)

vuepress-blog-theme 的配置:
[官方网址](https://vuepress-theme-blog.ulivz.com/)

# 以下是部分测试

## 自动生成的侧边导航

**问题 1:**<br/>
只有在电脑端才可能出现

**问题 2:**</br>
侧边导航的生成,只能在项目重新编译之后出现

**问题 3:**<br/>
只有二级,三级标题会生成侧边导航栏,即

```markdown
## 二级标题

### 三级标题
```

## 这是二级标题

### 这是三级标题

## markdown 中使用 Vue

官网的教程: [https://vuepress.vuejs.org/zh/guide/using-vue.html](https://vuepress.vuejs.org/zh/guide/using-vue.html)

1. 在`.vuepress/components`中编写自己组件,命名格式为:`*.vue`
2. 然后在 markdown 中直接使用

### 一个简单的例子

这个 vue 文件的完整目录: `.vuepress/components/level.vue`

```vue
<template>
  <div class="container">
    <div class="progress-head">{{ name }}</div>
    <div class="progress-body">
      <div class="progress-wrap progress">
        <div class="progress-bar progress" :style="processWidth"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$background-color: #ddd;
$progress-color: rgb(26, 188, 156);
$head-width: 2;
.container {
  display: flex;
  margin: 5px 0;
  .progress-head {
    flex: $head-width;
  }
  .progress-body {
    flex: 10- $head-width;
  }
}
.progress {
  width: 300px;
  height: 20px;
  display: inline-block;
}
.progress-wrap {
  background: $background-color;
  overflow: hidden;
  position: relative;
  .progress-bar {
    background: $progress-color;
    left: 0;
    position: absolute;
    top: 0;
  }
}
</style>
<script>
export default {
  name: "level",
  props: ["process", "name"],
  data() {
    return {
      processWidth: {
        width: `${this.process * 3}px`,
      },
    };
  },
};
</script>
```

markdown 中的使用:

```markdown
<level name="HTML" process="58"/>
```

运行的结果:
<level name="HTML" process="58"/>

## 关于静态资源

官网的文档链接: [https://vuepress.vuejs.org/zh/guide/assets.html](https://vuepress.vuejs.org/zh/guide/assets.html)

### 使用的规则

1. 资源的名称,不要含有中文
2. 资源引入的方式,**倾向于**使用相对路径
3. `/`指向`.vuepress/public`

## 关于插件

### 1. @vuepress/active-header-links

官方的配置文档:[https://vuepress.vuejs.org/zh/plugin/official/plugin-active-header-links.html#安装](https://vuepress.vuejs.org/zh/plugin/official/plugin-active-header-links.html#%E5%AE%89%E8%A3%85)
页面滚动时自动激活侧边栏链接的插件

#### 安装

```sh
yarn add -D @vuepress/plugin-active-header-links
# OR npm install -D @vuepress/plugin-active-header-links
```

#### 配置

```js
module.exports = {
  plugins: [
    "@vuepress/active-header-links",
    {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
  ],
};
```

### 2. vuepress-plugin-flowchart

官网地址: [https://flowchart.vuepress.ulivz.com/#install](https://flowchart.vuepress.ulivz.com/#install)

#### 安装

```sh
yarn add vuepress-plugin-flowchart -D
# npm install vuepress-plugin-flowchart -D
```

#### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: ["flowchart"],
};
```

#### 例子

```markdown
@flowstart
st=>start: Start
e=>end: End

st->e
@flowend
```

@flowstart
st=>start: Start
e=>end: End

st->e
@flowend

### 3. 代码复制

github 地址: [https://github.com/dovy/vuepress-plugin-clipboard-copy](https://github.com/dovy/vuepress-plugin-clipboard-copy)

#### 安装

```sh
$ npm i -D @dovyp/vuepress-plugin-clipboard-copy
# OR
```

#### 使用

```js
'@dovyp/vuepress-plugin-clipboard-copy': {}
```

## 使用第三方库

### 使用 element-ui

#### 1. 安装 element-ui

```sh
npm install element-ui --save
```

#### 2. 使用

在`.vuepress/enhanceApp.js` 写下如下代码:

```js
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

export default ({ Vue, options, router, siteData }) => {
  // 使用element-ui
  Vue.use(ElementUI);
};
```
