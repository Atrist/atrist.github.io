const fs = require('fs')
const path = require('path')
module.exports = {
  lang: 'zh-CN',
  title: 'Atrist',
  description:
    '前端的基础知识集中, 相关业务场景的解决方案集中, 项目源码阅读过程中的一些感悟',
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
    search: false,
    nav: [
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
          title: '前端',
          collapsable: false,
          path: '/know/front/',
          children: [
            {
              title: 'HTML',
              path: '/know/front/html/',
              collapsable: false,
              children: getFilesByPath('/know/front/html/', true)
            }
          ],
        },
      ],
      '/answer/': [
        {
          title: '前端',
          collapsable: false,
          path: '/answer/web/',
          children: ['/answer/web/拖拽.md']
        }, 
        {
          title: '剑指offer',
          collapsable: false,
          path: '/answer/offer/',
          children: getFilesByPath('/answer/offer/')
        }
      ],
      '/code/': [
        {
          title: 'viepress',
          path: "/code/vitepress/",
          children: getFilesByPath('/code/vitepress/')
        }
      ]
    },
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://atrist.github.io/',
      },
    ],
    [
      'autometa', {
        site: {
          name: 'Atrist',
        }
      }],
    ['vuepress-plugin-baidu-autopush']
  ],
}


function getFilesByPath(filepath, sortFlag) {
  // 获取文件夹下面的目录
  const filePath = path.join(__dirname, '../', filepath)
  const files = fs.readdirSync(filePath)
  let res = []
  for (let file of files) {
    if (file === 'index.md') continue
    // 判断是否为文件夹
    const fileStat = fs.statSync(path.join(filePath,file))
    if(fileStat.isFile())
      res.push({ title: file.split('.md')[0], path: filepath + file })
    else continue
  }
  if(sortFlag) return sort(res)
  return res;
}
function sort(data) {
  data.sort((a, b) => {
    parseInt(a.title.split('-')[0]) - parseInt(b.title.split('-')[0])
  })
  // 标题删除 排序数字
  return data.map(item => ({ ...item,title: item.title.split('-')[1] }))
}
