export const navConfig = [
  {
    text: '编程',
    ariaLabel: '编程',
    items: [
      {
        text: '前端',
        link: '/know/front/',
        items: [
          { text: 'HTML', link: '/know/front/html/' },
          { text: 'CSS', link: '/know/front/css/' },
          { text: 'Javascript', link: '/know/javascript/' },
        ],
      },
      {
        text: '工程化',
        ariaLabel: '工程化',
        items: [
          { text: 'react', link: '/know/engineering/react/' },
          {
            text: 'webpack',
            link: '/know/engineering/webpack/',
          },
          { text: 'npm', link: '/know/engineering/npm/' },
          {
            text: 'typescript',
            link: '/know/typescript/',
          },
        ],
      },
      {
        text: '计算机基础',
        link: '/know/computer/',
        items: [
          { text: '算法', link: '/know/computer/algorithm/' },
          { text: '数据结构', link: '/know/computer/data/' },
          { text: '网络', link: '/know/computer/network/' },
        ],
      },
      {
        text: '工具',
        link: '/know/tool/',
        items: [
          { text: 'git', link: '/know/tool/git/' },
          { text: 'vscode', link: '/know/tool/vscode/' },
        ],
      },
    ],
  },
  {
    text: '解决方案',
    ariaLabel: '解决方案',
    items: [
      {
        text: '面试',
        ariaLabel: '面试',
        link: '/answer/interview/',
        items: [
          {
            text: '前端基础',
            link: '/answer/interview/basic/',
          },
        ],
      },
      {
        text: '通用',

        ariaLabel: '通用',
        link: '/answer/common/',
      },
      {
        text: '音视频',
        ariaLabel: '音视频',
        items: [{ text: 'webRTC', link: '/answer/webRTC/' }],
      },
      {
        text: '投资',
        ariaLabel: '投资',
        link: '/answer/invest/',
        items: [{ text: '书籍', link: '/answer/invest/' }],
      },
    ],
  },
  {
    text: '源码阅读',
    link: '/code/',
    items: [
      {
        text: 'npm包',
        link: '/code/npm/',
      },
      {
        text: 'react系列',
        link: '/code/react/',
      },
      {
        text: '源码共读',
        link: '/code/opensource/',
      },
    ],
  },
  {
    text: '项目集成',
    link: '/workshop/',
    items: [{ text: 'Cli', link: '/workshop/cli/' }],
  },
  {
    text: '简历',
    link: '/blog/resume',
  },
];
