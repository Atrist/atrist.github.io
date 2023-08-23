## file模块
文档参考： [v16.x file](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fs_file_system)

fs.js源码: [lib/fs.js](https://github.com/nodejs/node/blob/v16.8.0/lib/fs.js)

### access
使用access方法来判断文件是否存在
```js
// 检查当前目录中是否存在该文件。
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});
```
使用同步的方法：`accessSync`

`accessSync` 如果任何可访问性检查失败，将抛出 Error。 否则，该方法将返回 undefined。
```js
try {
  accessSync('etc/passwd');
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}
```
当程序没有报错则说明，文件存在，程序抛出error则说明文件不存在。