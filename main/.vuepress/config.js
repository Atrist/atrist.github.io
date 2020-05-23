// .vuepress/config.js
module.exports = {
    title: 'Atrist',
    // 编译输出位置
    dest: './docs',
    base: '/blog/',
    // blog主题
    theme: '@vuepress/theme-blog',
    markdown: {
        // 代码显示 行号
        lineNumbers: true,
        // 设置 标题栏的配置
    },
    themeConfig: {
        // 启用平滑滚动
        author: 'atrist',
        smoothScroll: true,
        nav: [{
                text: 'Blog',
                link: '/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            }, {
                text: 'Resume',
                link: '/1970/01/01/resume/'
            }, {
                text: 'Github',
                link: 'https://github.com/Atrist'
            }
        ],
        footer: {
            contact: [{
                type: 'github',
                link: 'https://github.com/Atrist',
            }],
            copyright: [{
                text: 'Copyright © 2018-present',
                link: '',
            }],
        },
        globalPagination: {
            prevText: '上一页', // Text for previous links.
            nextText: '下一页', // Text for next links.
            lengthPerPage: '5', // Maximum number of posts per page.
            layout: 'Pagination', // Layout for pagination page
        }
    },
    //插件
    plugins: {
        '@vuepress/active-header-links': {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        },
        'seo': {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }, // .vuepress/config.js
        'flowchart': {},
        '@vuepress/back-to-top': {},
        "vuepress-plugin-cat": {},
        '@dovyp/vuepress-plugin-clipboard-copy': {}

    }
}