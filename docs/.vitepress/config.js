module.exports = {
  title: "AI",
  description: "AI's Blog",
  base: "/blog/",
  themeConfig: {
    nav: [
      { text: "Tech", link: "/Front/", activeMatch: "^/$|^/Front/" },
      {
        text: "Config Reference",
        link: "/config/basics",
        activeMatch: "^/config/",
      },
      {
        text: "Release Notes",
        link: "https://github.com/vuejs/vitepress/releases",
      },
    ],
    algolia: {
      apiKey: "123",
      indexName: "index_name",
    },
    carbonAds: {
      carbon: "your-carbon-key",
      custom: "your-carbon-custom",
      placement: "your-carbon-placement",
    },
    sidebar: {
      "/Front/": getFrontSidebar(),
      "/config/": getConfigSidebar(),
      "/": getFrontSidebar(),
    },
  },
};

function getFrontSidebar() {
  return [
    {
      text: "前端",
      children: getCommonSidebar(
        ["HTML", "CSS", "JS", "Vue", "React"],
        "/Front"
      ),  
    },
    {
      text: "算法与数据结构",
    },
  ];
}

function getConfigSidebar() {
  return [
    {
      text: "App Config",
      children: [{ text: "Basics", link: "/config/basics" }],
    },
    {
      text: "Theme Config",
      children: [
        { text: "Homepage", link: "/config/homepage" },
        { text: "Algolia Search", link: "/config/algolia-search" },
        { text: "Carbon Ads", link: "/config/carbon-ads" },
      ],
    },
  ];
}

function getCommonSidebar(catalogue, prefix) {
  let res = [];
  for (let i of catalogue) {
    res.push({
      text: i,
      link: prefix + "/" + i,
    });
  }
  return res;
}
