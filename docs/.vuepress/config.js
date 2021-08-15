module.exports = {
  lang: 'zh-CN',
  title: 'Atrist',
  description:
    '前端的基础知识集中, 相关业务场景的解决方案集中, 源码阅读过程中的一些感悟',
  base: '/',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'dmBwuwXMb8fdF5HD1TOPyGTFAQUzV9O9vN4Mh06slnY',
      },
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-HK08p9tJHw',
      },
    ],
  ],
  themeConfig: {
    navbar: [
      { text: '前端基础', link: '/know/', activeMatch: '^/know/' },
      {
        text: '解决方案',
        link: '/answer/',
        activeMatch: '^/answer/',
      },
      {
        text: '源码阅读',
        link: '/code/',
        activeMatch: '^/code/',
      },
    ],
    sidebar: {
      '/know/': [
        {
          text: '前端',
          children: [
            {
              text: 'html',
              link: '/know/front/html/',
              children: [
                {
                  text: '基础',
                  link: '/know/front/html/基础.md',
                  sidebar: 'auto',
                },
                {
                  text: 'head',
                  link: 'head.md',
                },
              ],
            },
            {
              text: 'css',
              link: '/know/front/css/',
              children: ['/know/front/css/基础.md'],
            },
          ],
        },
      ],
      '/answer/': [{ text: '前端', children: ['/know/front/html/基础.md'] }],
    },
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://atrist.github.io/',
      },
    ],
  ],
}
