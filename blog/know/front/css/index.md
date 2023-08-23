## 什么是css
CSS （Cascading Style Sheets，层叠样式表）是用来控制网页在浏览器中的显示外观的声明式语言。
## css用来干嘛
CSS（层叠样式表）用于设置和布置网页 - 例如，更改内容的字体，颜色，大小和间距，将其拆分为多个列，或添加动画和其他装饰功能。有些类似于装修房子中粉刷工。


## css语法
```css
h1 {
    color: red;
    font-size: 5em;
}
```
语法由一个 **选择器(selector)** 起头。 它 选择(selects) 了我们将要用来添加样式的 HTML 元素。 在这个例子中我们为一级标题（主标题`<h1>` (en-US)）添加样式。

接着输入一对大括号`{ }`。 在大括号内部定义一个或多个形式为 **属性(property):值(value);** 的 声明(declarations)。每个声明都指定了我们所选择元素的一个属性，之后跟一个我们想赋给这个属性的值。

一个 CSS 样式表可以包含很多个规则：
```css
h1 {
    color: red;
    font-size: 5em;
}

p {
    color: black;
}
```
## 参考资料
1. [css learn mdn](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
