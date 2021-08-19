## pify
npm包地址: [https://www.npmjs.com/package/pify](https://www.npmjs.com/package/pify)


## 用途
返回所提供函数或模块的 `Promise` 包装版本。

## 源码
### tag v1.0.0
```js
'use strict';
module.exports = function (fn, P) {
	P = P || Promise;
    
	if (({}).toString.call(fn) !== '[object Function]') {
		throw new TypeError('Expected a function');
	}

	return function () {
		var that = this;
		var args = [].slice.call(arguments);

		return new P(function (resolve, reject) {
			args.push(function (err, result) {
				if (err) {
					reject(err);
				} else if (arguments.length > 2) {
					resolve([].slice.call(arguments, 1));
				} else {
					resolve(result);
				}
			});

			fn.apply(that, args);
		});
	};
};
```