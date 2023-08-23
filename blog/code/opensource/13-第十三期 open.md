# open 
使用 child_process 根据操作系统的不同调用不同的命令 来打开 输入的 URL

## 环境准备
```
git clone https://github.com/sindresorhus/open.git
```

## package.json
```json
"scripts": {
  "test": "xo && tsd"
},
"files": [
  "index.js",
  "index.d.ts",
  "xdg-open"
],
"dependencies": {
  "define-lazy-prop": "^2.0.0",
  "is-docker": "^2.1.1",
  "is-wsl": "^2.2.0"
},
"devDependencies": {
  "@types/node": "^15.0.0",
  "ava": "^3.15.0",
  "tsd": "^0.14.0",
  "xo": "^0.39.1"
}
```
这里来解释一下使用到的一些包。
- dependencies： 生成环境中需要依赖的包。
- devDependencies： 开发应用时所依赖的工具包。
- define-lazy-prop：给对象的每一个属性设置为 计算属性（即有缓存）
- is-docker：检查进程是否在 Docker 容器内运行
- is-wsl： 检查进程是否在适用于 Linux 的 Windows 子系统中运行（Windows 上的 Bash）
- ava： 可并发执行的测试库
- tsd：检查 TypeScript 类型定义
- xo：JavaScript/TypeScript linter（ESLint 包装器）具有很好的默认值

## index.js
```js

// 导入
const path = require('path');
const childProcess = require('child_process');
const {promises: fs, constants: fsConstants} = require('fs');
const isWsl = require('is-wsl');
const isDocker = require('is-docker');
const defineLazyProperty = require('define-lazy-prop');

// Path to included `xdg-open`.
const localXdgOpenPath = path.join(__dirname, 'xdg-open');
const {platform, arch} = process;

// .... 其他代码

// 导出
module.exports = open;
```
### open 
这里来看一下 导出的 open 函数。

这个函数对传入的targte进行判断，然后使用bseOpen进行调用。
```js
const open = (target, options) => {
	if (typeof target !== 'string') {
		throw new TypeError('Expected a `target`');
	}

	return baseOpen({
		...options,
		target
	});
};
```
### baseOpen
open 功能的主要承载函数, 
```js
const baseOpen = async options => {
	options = {
		wait: false,
		background: false,
		newInstance: false,
		allowNonzeroExitCode: false,
		...options
	};

  // 如果 传入的应用 是 数组，则遍历执行
	if (Array.isArray(options.app)) {
		return pTryEach(options.app, singleApp => baseOpen({
			...options,
			app: singleApp
		}));
	}
  // 解构 并赋新的名字，同时带上默认值
	let {name: app, arguments: appArguments = []} = options.app || {};
  // 浅拷贝？
	appArguments = [...appArguments];

  // app的名字是数组 与 第一种类似的情况
	if (Array.isArray(app)) {
		return pTryEach(app, appName => baseOpen({
			...options,
			app: {
				name: appName,
				arguments: appArguments
			}
		}));
	}

	let command;
	const cliArguments = [];
	const childProcessOptions = {};
  //  根据平台的不同 拼接不同的命令字符串
  // darwin mac
	if (platform === 'darwin') {
		command = 'open';

		if (options.wait) {
			cliArguments.push('--wait-apps');
		}

		if (options.background) {
			cliArguments.push('--background');
		}

		if (options.newInstance) {
			cliArguments.push('--new');
		}

		if (app) {
			cliArguments.push('-a', app);
		}
	} else if (platform === 'win32' || (isWsl && !isDocker())) {
    // windows 中，或者是 windwos的bash 子系统
		const mountPoint = await getWslDrivesMountPoint();

		command = isWsl ?
			`${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` :
			`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;

		cliArguments.push(
			'-NoProfile',
			'-NonInteractive',
			'–ExecutionPolicy',
			'Bypass',
			'-EncodedCommand'
		);

		if (!isWsl) {
			childProcessOptions.windowsVerbatimArguments = true;
		}

		const encodedArguments = ['Start'];

		if (options.wait) {
			encodedArguments.push('-Wait');
		}

		if (app) {
			// Double quote with double quotes to ensure the inner quotes are passed through.
			// Inner quotes are delimited for PowerShell interpretation with backticks.
			encodedArguments.push(`"\`"${app}\`""`, '-ArgumentList');
			if (options.target) {
				appArguments.unshift(options.target);
			}
		} else if (options.target) {
			encodedArguments.push(`"${options.target}"`);
		}

		if (appArguments.length > 0) {
			appArguments = appArguments.map(arg => `"\`"${arg}\`""`);
			encodedArguments.push(appArguments.join(','));
		}

		// Using Base64-encoded command, accepted by PowerShell, to allow special characters.
		options.target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');
	} else {
		if (app) {
			command = app;
		} else {
			// When bundled by Webpack, there's no actual package file path and no local `xdg-open`.
			const isBundled = !__dirname || __dirname === '/';

			// Check if local `xdg-open` exists and is executable.
			let exeLocalXdgOpen = false;
			try {
				await fs.access(localXdgOpenPath, fsConstants.X_OK);
				exeLocalXdgOpen = true;
			} catch {}

			const useSystemXdgOpen = process.versions.electron ||
				platform === 'android' || isBundled || !exeLocalXdgOpen;
			command = useSystemXdgOpen ? 'xdg-open' : localXdgOpenPath;
		}

		if (appArguments.length > 0) {
			cliArguments.push(...appArguments);
		}

		if (!options.wait) {
			// `xdg-open` will block the process unless stdio is ignored
			// and it's detached from the parent even if it's unref'd.
			childProcessOptions.stdio = 'ignore';
			childProcessOptions.detached = true;
		}
	}

	if (options.target) {
		cliArguments.push(options.target);
	}

	if (platform === 'darwin' && appArguments.length > 0) {
		cliArguments.push('--args', ...appArguments);
	}

  // 执行命令
	const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);

	if (options.wait) {
		return new Promise((resolve, reject) => {
			subprocess.once('error', reject);

			subprocess.once('close', exitCode => {
				if (options.allowNonzeroExitCode && exitCode > 0) {
					reject(new Error(`Exited with code ${exitCode}`));
					return;
				}

				resolve(subprocess);
			});~
		});
	}

	subprocess.unref();

	return subprocess;
};
```




## 参考资料
- [node-lru-cache](https://github.com/isaacs/node-lru-cache)
- [Symbol mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)