# remote-git-tags

借助 `git ls-remotes --tags` 拿到 远程的tags，然后对返回数据进行处理，以map的方式存储，便于拿取。
## 环境准备
```bash
git clone https://github.com/sindresorhus/remote-git-tags.git
```

## packages.json
```json
"scripts": {
  "test": "xo && ava"
},
  "devDependencies": {
  "ava": "^3.15.0",
  "xo": "^0.44.0"
}
```

## index.js 
```ts
import {promisify} from 'node:util';
import childProcess from 'node:child_process';

const execFile = promisify(childProcess.execFile);

export default async function remoteGitTags(repoUrl) {
	const {stdout} = await execFile('git', ['ls-remote', '--tags', repoUrl]);
	const tags = new Map();

	for (const line of stdout.trim().split('\n')) {
		const [hash, tagReference] = line.split('\t');

		// Strip off the indicator of dereferenced tags so we can override the
		// previous entry which points at the tag hash and not the commit hash
		// `refs/tags/v9.6.0^{}` → `v9.6.0`
		const tagName = tagReference.replace(/^refs\/tags\//, '').replace(/\^{}$/, '');

		tags.set(tagName, hash);
	}

	return tags;
}
```
## promisify
将 callback 的函数方式调用改版成 promise 

node v17x  promisify 实现
```js
function promisify(original) {
  // Lazy-load to avoid a circular dependency.
  if (validateFunction === undefined)
    ({ validateFunction } = require('internal/validators'));

  validateFunction(original, 'original');

  if (original[kCustomPromisifiedSymbol]) {
    const fn = original[kCustomPromisifiedSymbol];

    validateFunction(fn, 'util.promisify.custom');

    return ObjectDefineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
  }

  // Names to create an object from in case the callback receives multiple
  // arguments, e.g. ['bytesRead', 'buffer'] for fs.read.
  const argumentNames = original[kCustomPromisifyArgsSymbol];

  function fn(...args) {
    return new Promise((resolve, reject) => {
      // 向 args 中 push 函数
      ArrayPrototypePush(args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (let i = 0; i < argumentNames.length; i++)
            obj[argumentNames[i]] = values[i];
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
      ReflectApply(original, this, args);
    });
  }

  ObjectSetPrototypeOf(fn, ObjectGetPrototypeOf(original));

  ObjectDefineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return ObjectDefineProperties(
    fn,
    ObjectGetOwnPropertyDescriptors(original)
  );
}
```
`validateFunction` 函数
```js
const validateFunction = hideStackFrames((value, name) => {
  // 判断对象是否为函数
  if (typeof value !== 'function')
    throw new ERR_INVALID_ARG_TYPE(name, 'Function', value);
});
```
### 简单的实现
promisify 就是将 callback 的异步函数调用变成 promise 的方式进行调用，便于使用。

```js
function promisify(original){
  function fn(...args){
    return new Promise((res,rej)=>{
      // 添加一个 callback 函数，用于源代码中进行调用，并触发 res
      args.push((err,...values)=>{
        if(err){
          return rej(err)
        }
        res(values)
      })
      // 静态方法 Reflect.apply() 通过指定的参数列表发起对目标(target)函数的调用。
      Reflect.apply(original, this, args);
    })
  }
  return fn;
}
```

## 参考资料
- [github1s node utils 源码](https://github1s.com/nodejs/node/blob/master/lib/internal/util.js)
- [Reflect apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)
- [child_process.execFile](http://nodejs.cn/api/child_process.html#child_processexecfilefile-args-options-callback)