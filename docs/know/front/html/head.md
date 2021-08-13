## head
在html文件中有一个 `head` 标签的存在，它与`body`不一样，它的内容不会在浏览器中显示，它的作用是保存页面的一些元数据，包括页面标题，网页语言，网页字符等等。

这是它可以包含的标签元素
- [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title): 用于设置 网页标题的，出现在标签页上的文字
- [style](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style):  内部样式表的一种引入方式
- [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script): 引入js文件的方式
- [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript): 如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 HTML `<noscript>` 元素中定义脚本未被执行时的替代内容。
- [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template): 内容模板元素, 详见[mdn解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)
- [base](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base): 制定所有相对URL的 根 URL，详见下文
- [link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link): 详见下文
- [meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta): 详见下文


## base
HTML `<base>` 元素 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 `<base>` 元素。

如果指定了以下任一属性，这个元素**必须**在其他任何属性是URL的元素之前。

- `href`
  - 用于文档中相对 URL 地址的基础 URL。允许绝对和相对URL。
- `target`
  - 默认浏览上下文的关键字或作者定义的名称，当没有明确目标的链接 `<a>` 或表单 `<form>` 导致导航被激活时显示其结果。
  - `_self`: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
  - `_blank`: 载入结果到一个新的未命名的浏览上下文。
  - `_parent`: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和_self一样。
  - `_top`: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和_self一样。

如果指定了多个 `<base>` 元素，只会使用第一个 `href` 和 `target` 值, 其余都会被忽略。


## link
**HTML外部资源链接元素** (`<link>`) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。

```html
<link href="main.css" rel="stylesheet">
```
- href: 指定了外部资源的路径
- ref: 表示链接文件与文档的关系, 相关的[链接类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)

#### 示例: 引入一个css文件
```html
<link href="style.css" rel="stylesheet">
```
#### 示例: 提供可替换的样式表
你也可以指定 ["可替换的外部样式表"](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets)。
```html
<link href="default.css" rel="stylesheet" title="Default Style">
<link href="fancy.css" rel="alternate stylesheet" title="Fancy">
<link href="basic.css" rel="alternate stylesheet" title="Basic">
```


## meta
`meta`元素定义的元数据的类型包括以下几种：
- 如果设置了 [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name) 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
- 如果设置了 [http-equiv](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv) 属性，meta 元素则是编译指令，提供的信息与类似命名的HTTP头部相同。
- 如果设置了 [charset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-charset) 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 [itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-itemprop) 属性，meta 元素提供用户定义的元数据。

### charset
这个属性声明了文档的字符编码。如果使用了这个属性，其值必须是与ASCII大小写无关（ASCII case-insensitive）的"utf-8"。

### content
此属性包含 [http-equiv](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv) 或 [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name) 属性的值，具体取决于所使用的值。
### http-equiv
属性定义了一个编译指示指令。这个属性叫做 `http-equiv(alent)` 是因为所有允许的值都是特定HTTP头部的名称，如下：
- `content-security-policy`
  - 它允许页面作者定义当前页的[内容策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。
- `content-type`
  - 如果使用这个属性，其值必须是 `"text/html; charset=utf-8"`。注意：该属性只能用于 MIME type 为 text/html 的文档，不能用于MIME类型为XML的文档。
- default-style
  - 设置默认 [CSS 样式表组](https://developer.mozilla.org/zh-CN/docs/Web/CSS)的名称。
- refresh
  - 这个属性指定:
  - 如果 [content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 只包含一个正整数，则为重新载入页面的时间间隔(秒)；
  - 如果 [content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 包含一个正整数，并且后面跟着字符串 ';url=' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)
#### 示例
```html
<meta charset="utf-8">

<!-- Redirect page after 3 seconds -->
<meta http-equiv="refresh" content="3;url=https://www.mozilla.org">
```
### name
`name` 和 `content` 属性可以一起使用，以名-值对的方式给文档提供元数据，其中 `name` 作为元数据的名称，`content` 作为元数据的值。
#### 示例
```html
<meta name="color-scheme" content="dark light">
```



## 参考资料
- [meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
- [标准元数据名称](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)