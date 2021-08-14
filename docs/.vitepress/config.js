const fs = require('fs')
const path = require('path')
const utils = require('./utils')
module.exports = {
  title: 'Atrist',
  description: "atrist's Blog, 用于记录前端学习和前端问题的个人博客",
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
    nav: [
      { text: '基础', link: '/know/', activeMatch: '^/know/' },
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
      '/know/': getKnowSidebar(),
      '/leetcode/': getLeetcodeSidebar(),
      '/code/': [
        {
          text: 'vitepress',
          link: '/code/vitepress/',
          children: utils.fileList(
            path.join(__dirname, '../', 'code/vitepress'),
            '/code/vitepress/'
          ),
        },
      ],
      '/': getKnowSidebar(),
    },
  },
  plugins: {
    sitemap: {
      hostname: 'https://www.atrist.github.io',
      // 排除无实际内容的页面
      exclude: ['/404.html'],
    },
  },
}

function getKnowSidebar() {
  return [
    {
      text: '',
      link: '/know/front/',
      children: [
        {
          text: '前端',
          link: '/know/front/',
        },
      ],
    },
    {
      text: 'HTML',
      link: '/know/front/html',
      children: [...getSideBarByArray('/know/front/html/', ['基础', 'head'])],
    },
  ]
}
function getWebSidebar() {
  return [
    {
      text: 'HTML',
      link: '/web/html/',
      children: [
        ...getSideBarByArray('/web/html/', ['基础', 'head']),
        {
          text: 'body',
          link: '/web/html/body/',
          children: getCommonSidebar('/web/html/body/'),
        },
      ],
    },
    {
      text: 'CSS',
      link: '/web/css/',
      children: [...getSideBarByArray('/web/css/', ['选择器', '布局', '动画'])],
    },
    {
      text: 'JAVASCRIPT',
    },
    {
      text: 'REACT',
    },
  ]
}

function getLeetcodeSidebar() {
  return [
    {
      text: '数据结构',

      link: '/leetcode/dataStructure/',
      children: getCommonSidebar('/leetcode/dataStructure/'),
    },
    {
      text: '算法',
      link: '/leetcode/algorithm/',
      children: getCommonSidebar('/leetcode/algorithm/'),
    },
    {
      text: '剑指Offer',
      link: '/leetcode/offer/',
      children: getCommonSidebar('/leetcode/offer/'),
    },
  ]
}

/**
 * 排序函数
 */
function sort(dir) {
  const dirs = dir.map((item) => ({
    item: item,
    weight: parseInt(item.split('.')[0]),
  }))
  const res = dirs.sort((a, b) => a.weight - b.weight)
  return res.map((item) => item.item)
}

function getCommonSidebar(filepath, sort) {
  const filePath = path.join(__dirname, '../', filepath)
  let dirs = fs.readdirSync(filePath)
  let result = []
  for (let dir of dirs) {
    const stat = fs.lstatSync(filePath + dir)
    if (stat.isFile()) result.push(dir)
  }
  dirs = result
  if (sort && typeof sort === 'function') dirs = sort(dirs)
  let res = []
  for (let dir of dirs) {
    if (dir === 'index.md') continue
    res.push({
      text: dir.split('.md')[0],
      link: filepath + dir.split('.md')[0],
    })
  }
  return res
}

function getSideBarByArray(path, array) {
  let res = []
  if (!Array.isArray(array)) return []
  for (let i of array) {
    res.push({
      text: i,
      link: path + i,
    })
  }
  return res
}

function getCodeSidebar(root) {
  let result = []
  let queue = [root]
  while (queue.length !== 0) {
    let rootPath = queue.shift()
    const files = fs.readdirSync(rootPath)
    console.log(files)

    for (let file of files) {
      if (file === 'index.md') continue
      if (utils.isFile(rootPath + '/' + file)) {
      }
    }
  }
  // 递归的进行对目录的变换
}
