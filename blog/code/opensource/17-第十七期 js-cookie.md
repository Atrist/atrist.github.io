# js-cookie
学习目标：
1. 熟悉js-cookie源码
2. 了解 cookie、localstorage、sessionStorage 的区别
## 环境准备、
```bash
git clone https://github.com/js-cookie/js-cookie
```
## package.json
```json
"scripts": {
  "test": "grunt test",
  "format": "grunt exec:format",
  "dist": "rm -rf dist/* && rollup -c",
  "release": "release-it"
}
```
这一次来看，主要是 rollup 这个工具的使用。如果想要了解更加仔细，可以访问[官网](https://rollupjs.org/guide/en/)

代码结构
```
api.mjs
  -- assign.mjs
  -- converter.mjs
```
## converter.mjs
向外暴露了一个工具函数，根据名称和代码来看，用于写入和读写的时候对特殊字符的转换。
```js
/* eslint-disable no-var */
export default {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1)
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
}
/* eslint-enable no-var */
```
这里的replace的第二个参数是一个函数，根据mdn的解释：
1. 在这种情况下，当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。
2. 如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。

有一个slice函数，可以用于字符串和数组，都是返回一个新的对象，这个对象由（begin，end） 包括begin，不包括end
1. 当 参数为负数，则是倒数的顺序。

## assin.mjs
模拟提供的 assin 函数，用于对象的复制。
```js
/* eslint-disable no-var */
export default function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source) {
      target[key] = source[key]
    }
  }
  return target
}
/* eslint-enable no-var */
```
## api.mjs
主要函数，用于实现cookie的get和set。

向外提供一个对象，具备 get 和 set 的函数。
### set函数
```js
  function set (name, value, attributes) {
    // 判断环境，如果不是浏览器环境，则直接退出
    if (typeof document === 'undefined') {
      return
    }
    // 解构，覆盖默认属性
    attributes = assign({}, defaultAttributes, attributes)
    // 将过期时间由数字转成日期 864e5 一天的毫秒数
    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5)
    }
    // toUTCString() 方法把一个日期转换为一个字符串，使用UTC时区。
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString()
    }
    // 数据编码
    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape)
    // 额外属性添加，比如 过期时间
    var stringifiedAttributes = ''
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName

      if (attributes[attributeName] === true) {
        continue
      }
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
    }

    return (document.cookie =
      name + '=' + converter.write(value, name) + stringifiedAttributes)
  }
```
### get 函数
```js
  function get (name) {
    // 环境和传参判断
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return
    }
    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : []
    var jar = {}
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=')
      // slice 缺省，直接取到数组末尾
      var value = parts.slice(1).join('=')

      try {
        var found = decodeURIComponent(parts[0])
        jar[found] = converter.read(value, found)
        // 相等，则意味找到，直接退出
        if (name === found) {
          break
        }
      } catch (e) {}
    }
    // name存在则返回name，不然就返回所有jar
    return name ? jar[name] : jar
  }
```
### 返回的对象
使用 Object.create 进行对象的创建
```js
  return Object.create(
    {
      // set 函数
      set: set,
      // get 函数
      get: get,
      // remove 函数
      remove: function (name, attributes) {
        set(
          name,
          '',
          assign({}, attributes, {
            expires: -1
          })
        )
      },
      // 带属性的新建
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      // 自带转换器的新建
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    // 原有对象，携带 默认属性和默认转换器
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
```
### 默认导出
```js
export default init(defaultConverter, { path: '/' })
```
导出一个带默认转换器，和默认配置为  `{ path: '/' }` 的 对象。

## 收获
1. 了解rollup这个打包工具
2. 熟悉slice，replace函数
3. 了解到了object.create 的用法
## 参考资料
- [若川 js-cookie](https://www.yuque.com/ruochuan12/notice/p17)
- [replace mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 