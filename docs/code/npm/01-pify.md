## pify
npm包地址: [https://www.npmjs.com/package/pify](https://www.npmjs.com/package/pify)


## 用途
返回所提供函数或模块的 `Promise` 包装版本。

## 源码
### Tag v1.0.0
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
这一次的源码, 基础知识点
1. call, apply 函数的使用
2. promise的基础用法

### Tag v1.1.0
```js
'use strict';

function isFn(fn) {
	return ({}).toString.call(fn) === '[object Function]';
}

var pify = module.exports = function (fn, P) {
	P = P || Promise;

	if (!isFn(fn)) {
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

pify.all = function (module, P) {
	var ret = {};

	for (var method in module) {
		if (({}).hasOwnProperty.call(module, method)) {
			var x = module[method];
			ret[method] = isFn(x) ? pify(x, P) : x;
		}
	}

	return ret;
};
```
这一次的代码相较于前面的代码，变动点有两个
1. 将入参类型是否为函数的判断提成了一个函数
2. 增加all功能支持

### Tag 1.1.1
```js
'use strict';

var pify = module.exports = function (fn, P) {
	P = P || Promise;

	if (typeof fn !== 'function') {
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

pify.all = function (obj, P) {
	var ret = {};

	Object.keys(obj).forEach(function (key) {
		var x = obj[key];
		ret[key] = typeof x === 'function' ? pify(x, P) : x;
	});

	return ret;
};
```
1. 借助使用了 typeof 关键字来实现函数类型的判断
2. 使用 object.keys.forEach代替了以前使用的 for in 循环
