module.exports = {
  title: "AI",
  description: "AI's Blog",
  base: "/blog/",
  themeConfig: {
    nav: [
      { text: "Front-End", link: "/Front", activeMatch: "^/$|^/Front/" },
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
      text: "HTML",
      children: [
        { text: "What is HTML?", link: "/Front/" },
        { text: "Getting Started", link: "/Front/getting-started" },
        { text: "Configuration", link: "/Front/configuration" },
        { text: "Asset Handling", link: "/Front/assets" },
        { text: "Markdown Extensions", link: "/Front/markdown" },
        { text: "Using Vue in Markdown", link: "/Front/using-vue" },
        { text: "Deploying", link: "/Front/deploy" },
      ],
    },
    {
      text: "Css",
      children: [
        { text: "Frontmatter", link: "/Front/frontmatter" },
        { text: "Global Computed", link: "/Front/global-computed" },
        { text: "Global Component", link: "/Front/global-component" },
        { text: "Customization", link: "/Front/customization" },
        {
          text: "Differences from Vuepress",
          link: "/Front/differences-from-vuepress",
        },
      ],
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
