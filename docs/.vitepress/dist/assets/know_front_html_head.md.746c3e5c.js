import{o as a,c as e,a as t}from"./app.06dc3881.js";const n='{"title":"head","description":"","frontmatter":{},"headers":[{"level":2,"title":"head","slug":"head"},{"level":2,"title":"base","slug":"base"},{"level":2,"title":"link","slug":"link"},{"level":2,"title":"meta","slug":"meta"},{"level":3,"title":"charset","slug":"charset"},{"level":3,"title":"content","slug":"content"},{"level":3,"title":"http-equiv","slug":"http-equiv"},{"level":3,"title":"name","slug":"name"},{"level":2,"title":"参考资料","slug":"参考资料"}],"relativePath":"html/head元素.md","lastUpdated":1619972285356}',s={},l=[t('<h2 id="head"><a class="header-anchor" href="#head" aria-hidden="true">#</a> head</h2><p>在html文件中有一个 <code>head</code> 标签的存在，它与<code>body</code>不一样，它的内容不会在浏览器中显示，它的作用是保存页面的一些元数据，包括页面标题，网页语言，网页字符等等。</p><p>这是它可以包含的标签元素</p><ul><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title" target="_blank" rel="noopener noreferrer">title</a>: 用于设置 网页标题的，出现在标签页上的文字</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style" target="_blank" rel="noopener noreferrer">style</a>: 内部样式表的一种引入方式</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script" target="_blank" rel="noopener noreferrer">script</a>: 引入js文件的方式</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript" target="_blank" rel="noopener noreferrer">noscript</a>: 如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 HTML <code>&lt;noscript&gt;</code> 元素中定义脚本未被执行时的替代内容。</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template" target="_blank" rel="noopener noreferrer">template</a>: 内容模板元素, 详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template" target="_blank" rel="noopener noreferrer">mdn解释</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" target="_blank" rel="noopener noreferrer">base</a>: 制定所有相对URL的 根 URL，详见下文</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link" target="_blank" rel="noopener noreferrer">link</a>: 详见下文</li><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta" target="_blank" rel="noopener noreferrer">meta</a>: 详见下文</li></ul><h2 id="base"><a class="header-anchor" href="#base" aria-hidden="true">#</a> base</h2><p>HTML <code>&lt;base&gt;</code> 元素 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <code>&lt;base&gt;</code> 元素。</p><p>如果指定了以下任一属性，这个元素<strong>必须</strong>在其他任何属性是URL的元素之前。</p><ul><li><code>href</code><ul><li>用于文档中相对 URL 地址的基础 URL。允许绝对和相对URL。</li></ul></li><li><code>target</code><ul><li>默认浏览上下文的关键字或作者定义的名称，当没有明确目标的链接 <code>&lt;a&gt;</code> 或表单 <code>&lt;form&gt;</code> 导致导航被激活时显示其结果。</li><li><code>_self</code>: 载入结果到当前浏览上下文中。（该值是元素的默认值）。</li><li><code>_blank</code>: 载入结果到一个新的未命名的浏览上下文。</li><li><code>_parent</code>: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和_self一样。</li><li><code>_top</code>: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和_self一样。</li></ul></li></ul><p>如果指定了多个 <code>&lt;base&gt;</code> 元素，只会使用第一个 <code>href</code> 和 <code>target</code> 值, 其余都会被忽略。</p><h2 id="link"><a class="header-anchor" href="#link" aria-hidden="true">#</a> link</h2><p><strong>HTML外部资源链接元素</strong> (<code>&lt;link&gt;</code>) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><ul><li>href: 指定了外部资源的路径</li><li>ref: 表示链接文件与文档的关系, 相关的<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types" target="_blank" rel="noopener noreferrer">链接类型</a></li></ul><h4 id="示例-引入一个css文件"><a class="header-anchor" href="#示例-引入一个css文件" aria-hidden="true">#</a> 示例: 引入一个css文件</h4><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h4 id="示例-提供可替换的样式表"><a class="header-anchor" href="#示例-提供可替换的样式表" aria-hidden="true">#</a> 示例: 提供可替换的样式表</h4><p>你也可以指定 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets" target="_blank" rel="noopener noreferrer">&quot;可替换的外部样式表&quot;</a>。</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>default.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Default Style<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fancy.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alternate stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Fancy<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>basic.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alternate stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Basic<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="meta"><a class="header-anchor" href="#meta" aria-hidden="true">#</a> meta</h2><p><code>meta</code>元素定义的元数据的类型包括以下几种：</p><ul><li>如果设置了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name" target="_blank" rel="noopener noreferrer">name</a> 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。</li><li>如果设置了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv" target="_blank" rel="noopener noreferrer">http-equiv</a> 属性，meta 元素则是编译指令，提供的信息与类似命名的HTTP头部相同。</li><li>如果设置了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-charset" target="_blank" rel="noopener noreferrer">charset</a> 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。</li><li>如果设置了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-itemprop" target="_blank" rel="noopener noreferrer">itemprop</a> 属性，meta 元素提供用户定义的元数据。</li></ul><h3 id="charset"><a class="header-anchor" href="#charset" aria-hidden="true">#</a> charset</h3><p>这个属性声明了文档的字符编码。如果使用了这个属性，其值必须是与ASCII大小写无关（ASCII case-insensitive）的&quot;utf-8&quot;。</p><h3 id="content"><a class="header-anchor" href="#content" aria-hidden="true">#</a> content</h3><p>此属性包含 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv" target="_blank" rel="noopener noreferrer">http-equiv</a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name" target="_blank" rel="noopener noreferrer">name</a> 属性的值，具体取决于所使用的值。</p><h3 id="http-equiv"><a class="header-anchor" href="#http-equiv" aria-hidden="true">#</a> http-equiv</h3><p>属性定义了一个编译指示指令。这个属性叫做 <code>http-equiv(alent)</code> 是因为所有允许的值都是特定HTTP头部的名称，如下：</p><ul><li><code>content-security-policy</code><ul><li>它允许页面作者定义当前页的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy" target="_blank" rel="noopener noreferrer">内容策略</a>。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。</li></ul></li><li><code>content-type</code><ul><li>如果使用这个属性，其值必须是 <code>&quot;text/html; charset=utf-8&quot;</code>。注意：该属性只能用于 MIME type 为 text/html 的文档，不能用于MIME类型为XML的文档。</li></ul></li><li>default-style <ul><li>设置默认 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS 样式表组</a>的名称。</li></ul></li><li>refresh <ul><li>这个属性指定:</li><li>如果 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content" target="_blank" rel="noopener noreferrer">content</a> 只包含一个正整数，则为重新载入页面的时间间隔(秒)；</li><li>如果 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content" target="_blank" rel="noopener noreferrer">content</a> 包含一个正整数，并且后面跟着字符串 &#39;;url=&#39; 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)</li></ul></li></ul><h4 id="示例"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h4><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utf-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n\n<span class="token comment">&lt;!-- Redirect page after 3 seconds --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>refresh<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3;url=https://www.mozilla.org<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h3 id="name"><a class="header-anchor" href="#name" aria-hidden="true">#</a> name</h3><p><code>name</code> 和 <code>content</code> 属性可以一起使用，以名-值对的方式给文档提供元数据，其中 <code>name</code> 作为元数据的名称，<code>content</code> 作为元数据的值。</p><h4 id="示例-1"><a class="header-anchor" href="#示例-1" aria-hidden="true">#</a> 示例</h4><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>color-scheme<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dark light<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="参考资料"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta" target="_blank" rel="noopener noreferrer">meta</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name" target="_blank" rel="noopener noreferrer">标准元数据名称</a></li></ul>',36)];s.render=function(t,n,s,o,p,r){return a(),e("div",null,l)};export{n as __pageData,s as default};
