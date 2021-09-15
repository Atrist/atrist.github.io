# body
在HTML文件中有一个body的标签，它里面的内容会出现在浏览器页面中，是用户可见的。

根据用途的不同，在这里划分成以下几个部分
1. 文字系列
2. 交互系列
3. 其他有趣的标签系列
## 文字系列
包括文字，标题，字体等
### h1~h6
`<h1> - <h6>` 标签可定义标题。
- `<h1>` 定义最大的标题。
- `<h6>` 定义最小的标题。

### p
表示这是一个段落

## 交互系列
包括按钮，输入框，单选框等
### button
表示一个可以点击的按钮。默认情况下，HTML按钮的显示样式都比较丑，所以一般会使用 CSS 来改变按钮的样貌。

### input
input 标签算是前端经常会使用到一个标签。

这里只罗列一些简单的熟悉，详细见: [input mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)
#### value
input控件输入的值
```html
<input value="123" />
```
#### type
input 可以具备很多类型
##### button
```html
<input value="123" type="button" />
```
出现的样式类似于 button 标签，value为里面显示的值。
##### checkbox
```html
<input value="123" type="checkbox" />
```
### select
select会呈现一个下拉框
```html
<select name="pets" id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>
```
### progress
HTML中的`<progress>`元素用来显示一项任务的完成进度
```html
<progress id="file" max="100" value="70"> 70% </progress>
```
## 参考资料
1. [form mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)
2. [select mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select)
3. [progress mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/progress)


