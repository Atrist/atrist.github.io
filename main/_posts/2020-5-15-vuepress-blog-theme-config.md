---
title: vuepress-blog-theme的配置
date: 2020-5-15
tags:
  - vue
summary: vuepress-blog-theme的简单使用
---

## 官网

vuepress 的配置:
[官方中文地址](https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)

vuepress-blog-theme 的配置:
[官方网址](https://vuepress-theme-blog.ulivz.com/)

## 我的简单配置

```js
// .vuepress/config.js
module.exports = {
  title: "Atrist",
  // 编译输出位置
  dest: "./docs",
  // github部署的原因
  // 详情请查看: https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages
  base: "/blog/",
  // blog主题
  theme: "@vuepress/theme-blog",
  markdown: {
    // 代码显示 行号
    lineNumbers: true,
    // 设置 标题栏的配置
  },
  themeConfig: {
    // 启用平滑滚动
    smoothScroll: true,
    // 导航的配置
    nav: [
      {
        text: "Blog",
        link: "/",
      },
      {
        text: "Tags",
        link: "/tag/",
      },
      {
        text: "Github",
        link: "https://github.com/Atrist",
      },
    ],
    // 版权等信息配置
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/Atrist",
        },
      ],
      copyright: [
        {
          text: "MIT Licensed | Copyright © 2018-present",
          link: "",
        },
      ],
    },
    // 文章分页的简单配置
    globalPagination: {
      prevText: "上一页", // Text for previous links.
      nextText: "下一页", // Text for next links.
      lengthPerPage: "5", // Maximum number of posts per page.
      layout: "Pagination", // Layout for pagination page
    },
  },
};
```

# 以下是部分测试

## 1. 关于自动生成的侧边导航

**问题 1:**<br/>
只有在电脑端才可能出现

**问题 2:**</br>
侧边导航的生成,只能在项目重新编译之后出现

**问题 3:**<br/>
只有二级,三级标题会生成侧边导航栏,即

```
## 二级标题
### 三级标题
```

## 这是二级标题

### 这是三级标题

## markdown 中使用 Vue

官网的教程: [https://vuepress.vuejs.org/zh/guide/using-vue.html](https://vuepress.vuejs.org/zh/guide/using-vue.html)

1. 在`.vuepress/components`中编写自己组件,命名格式为:`*.vue`
2. 在 markdown 中使用
