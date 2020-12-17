// .vuepress/config.js
module.exports = {
  title: "Atrist",
  // 编译输出位置
  dest: "./docs",
  description: "Atrist's Blog",
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
    author: "atrist",
    smoothScroll: true,
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
        text: "Resume",
        link: "/1970/01/01/resume/",
      },
      {
        text: "Github",
        link: "https://github.com/Atrist",
      },
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/Atrist",
        },
      ],
      copyright: [
        {
          text: "Copyright © 2018-present",
          link: "",
        },
      ],
    },
    globalPagination: {
      prevText: "上一页", // Text for previous links.
      nextText: "下一页", // Text for next links.
      lengthPerPage: "5", // Maximum number of posts per page.
      layout: "Pagination", // Layout for pagination page
    },
    sidebar: "auto",
    lastUpdated: true,
  },
  //插件
  plugins: {
    "@vuepress/active-header-links": {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
    flowchart: {},
    "@vuepress/back-to-top": {},
    "vuepress-plugin-cat": {},
    "vuepress-plugin-code-copy": {
      successText: "复制成功",
    },
    "vuepress-plugin-baidu-autopush": {},
    sitemap: {
      hostname: "https://atrist.github.io",
    },
    // markdown 支持 Tex 语法
    "@maginapp/vuepress-plugin-katex": {
      delimiters: "dollars",
    },
    'feed':{
        canonical_base: 'https://atrist.github.io/blog/',
    }
  },
};
