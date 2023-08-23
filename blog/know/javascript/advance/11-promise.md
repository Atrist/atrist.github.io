## 异步编程
### 同步与异步
同步行为: 对应内存中顺序执行的处理指令。 每条指令都会严格按照它们出现的顺序来执行, 而每条指令执行后也能立即获得存储在系统本地(如寄存器或系统内存)的信息。

异步行为：类似于系统中断, 即当前进程外部的实体可以触发代码执行。
## promise
promise是一个状态机，可能处于如下3种状态之一:
- pending
- fulfilled(也称为：resolved)
- rejected

pending是promise的最初始状态。在pending状态下，promise可以转变到fullfilled，或者 rejected。

无论哪种转变，都是不可逆的。同时，当promise的状态由pending到fulfilled,或由pending到rejected，promise的状态就不再改变。

```js
new Promise(()=>console.log('executor'))
```
初始化promise的传入函数是同步执行的，也就是说 这句话会立即的输出'exe'
### proise.resolve()
可以将一个值

## 参考资料
1. [promise mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
2. [现代JS教程 promise](https://zh.javascript.info/promise-basics)