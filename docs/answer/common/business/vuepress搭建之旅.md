## 博客搭建之旅
记录这个博客搭建过程中的一些心路历程.

## 技术选择
最开始, 其实是选择了vitepress作为博客框架, 来进行搭建的. 因为vitepress是vite + vue3, 相对于现在来说, 技术栈是比较新的. 同时也是一个新起的项目, 对于源码的上手难度相较更低一些.

但是最后, 因为相关SEO的需求在vitepress无法实现, 因为vitepress暂无插件机制, 使得无法自动生成站点地图,以及自动的进行meta注入.

所以最后选择了vuepress1.x来完成这一次博客的搭建.

使用到的插件如下:
1. vuepress-plugin-sitemap
2. vuepress-plugin-autometa
3. vuepress-plugin-baidu-autopush
4. vuepress-plugin-seo
5. @xiaopanda/vuepress-plugin-code-copy
## 网站SEO优化
为了使得网站拥有更多流量, 搭建博客完成之后, 进行了网站SEO的优化, 因为Git Pages阻止了百度爬虫的爬取, 所以最后面向的只有谷歌搜索引擎做网站优化.

1. 登录google的站点管理网站 [search google](https://search.google.com/)
2. 对网站进行所有权的验证
3. 对网页的首页和站点地图进行资源提交
4. 提交站点地图
