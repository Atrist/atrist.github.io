## prommise
Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值, 是一种异步编程的解决方案, 最开始由社区提出, 最后由ES6写入语法规范, 原生提供了`promise`对象.

promise对象有以下两个特点:
1. 状态不受外界影响, promise一共有三个状态:
   1. `pending`(进行中)
   2. `fulfilled`(已成功)
   3. `rejected`(已失败)
2. 状态一旦改变,就不会再变. 
   
   对象状态的变化只能由 `pending => fulfilled` 或 `pending => rejected`. 状态一旦变化, 就无法再变, 此时 `promise`称为 `resolved`(已定型或已完成)
## 基本用法
ES6中规定, `Promise`对象是一个构造函数, 用来生成`promise` 实例.


## 手写实现
## 参考资料
1. [promise mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
2. [promise 现代JS教程](https://zh.javascript.info/promise-basics)
3. [promise对象 阮一峰es6](https://es6.ruanyifeng.com/#docs/promise)
