# 玩具 vite
## 环境准备
```
git clone  https://github.com/vuejs/vue-dev-server
```
## package.json
```json
  "bin": {
    "vue-dev-server": "./bin/vue-dev-server.js"
  },
  "scripts": {
    "test": "cd test && node ../bin/vue-dev-server.js"
  },
  "dependencies": {
    "@vue/component-compiler": "^3.6.0",
    "express": "^4.16.4",
    "lru-cache": "^5.1.1",
    "recast": "^0.17.3",
    "validate-npm-package-name": "^3.0.0",
    "vue": "^2.6.8",
    "vue-template-compiler": "^2.6.8"
  }
```
- express: 一个nodejs的服务端框架
- recast： 好像是一个可以对js进行任何操作的库？
- lru-cache： 一个最近最先使用的存储
- validate-npm-package-name： 检验npm包名的合法性
- vue-template-compiler：好像是用于vue2.0预编译的渲染函数
- @vue/component-compiler： 用于组件包的编译，现已废弃

### bin/vue-dev-server.js
```js
#!/usr/bin/env node

const express = require('express')
const { vueMiddleware } = require('../middleware')

const app = express()
const root = process.cwd();

// app.use  https://www.expressjs.com.cn/4x/api.html#app.use
app.use(vueMiddleware())

app.use(express.static(root))

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
```
## middleware.js
主要函数体:
```js
// 引入三方包
const vueCompiler = require('@vue/component-compiler')
const fs = require('fs')
const stat = require('util').promisify(fs.stat)
// 返回 Node.js 进程的当前工作目录。
const root = process.cwd()
const path = require('path')
const parseUrl = require('parseurl')
const { transformModuleImports } = require('./transformModuleImports')
const { loadPkg } = require('./loadPkg')
const { readSource } = require('./readSource')

const defaultOptions = {
  cache: true
}
// 如果没有传入参数，则使用默认配置
const vueMiddleware = (options = defaultOptions) => {
  let cache
  let time = {}
  if (options.cache) {
    const LRU = require('lru-cache')

    cache = new LRU({
      max: 500,
      length: function (n, key) { return n * 2 + key.length }
    })
  }

  const compiler = vueCompiler.createDefaultCompiler()
  return async (req, res, next) => {
        // 对请求的路径进行判断，并根据对应的判断进行处理

        // vue文件
        if (req.path.endsWith('.vue')) {      
        const key = parseUrl(req).pathname
        // 尝试获取缓存中的数据
        let out = await tryCache(key)

        if (!out) {
            // Bundle Single-File Component
            const result = await bundleSFC(req)
            out = result
            cacheData(key, out, result.updateTime)
        }
        
        send(res, out.code, 'application/javascript')
        // js 文件
        } else if (req.path.endsWith('.js')) {
        const key = parseUrl(req).pathname
        let out = await tryCache(key)

        if (!out) {
            // transform import statements
            const result = await readSource(req)
            out = transformModuleImports(result.source)
            cacheData(key, out, result.updateTime)
        }

        send(res, out, 'application/javascript')
        // modules
        } else if (req.path.startsWith('/__modules/')) {
        const key = parseUrl(req).pathname
        const pkg = req.path.replace(/^\/__modules\//, '')

        let out = await tryCache(key, false) // Do not outdate modules
        if (!out) {
            out = (await loadPkg(pkg)).toString()
            cacheData(key, out, false) // Do not outdate modules
        }

        send(res, out, 'application/javascript')
        } else {
        next()
        }
    }
```
整个中间件函数，主要是对vue文件，js文件， modules等文件进行处理。
### tryCache
检查 cache中的数据已经发生更新，如果发生变更返回null，如果没有发生更新，则返回缓存中的数据。
```js
  async function tryCache (key, checkUpdateTime = true) {
    const data = cache.get(key)

    if (checkUpdateTime) {
      const cacheUpdateTime = time[key]
      const fileUpdateTime = (await stat(path.resolve(root, key.replace(/^\//, '')))).mtime.getTime()
      if (cacheUpdateTime < fileUpdateTime) return null
    }

    return data
  }
```
### bundleSFC 函数
用于编译单文件组件
```js
  async function bundleSFC (req) {
    const { filepath, source, updateTime } = await readSource(req)
    const descriptorResult = compiler.compileToDescriptor(filepath, source)
    const assembledResult = vueCompiler.assemble(compiler, filepath, {
      ...descriptorResult,
      script: injectSourceMapToScript(descriptorResult.script),
      styles: injectSourceMapsToStyles(descriptorResult.styles)
    })
    return { ...assembledResult, updateTime }
  }
```
### readSource
从 req中拿到 pathname，然后返回这个文件的路径和内容，和最新的更新时间。
```js
const path = require('path')
const fs = require('fs')
const readFile = require('util').promisify(fs.readFile)
const stat = require('util').promisify(fs.stat)
const parseUrl = require('parseurl')
const root = process.cwd()

async function readSource(req) {
  const { pathname } = parseUrl(req)
  const filepath = path.resolve(root, pathname.replace(/^\//, ''))
  return {
    filepath,
    source: await readFile(filepath, 'utf-8'),
    updateTime: (await stat(filepath)).mtime.getTime()
  }
}
exports.readSource = readSource
```
### cacheData
从chache中拿到已缓存的数据，进行新旧对比，如果不同，则对应的更新内容和时间。如果相同，则返回false
```js
 function cacheData (key, data, updateTime) {
    const old = cache.peek(key)

    if (old != data) {
      cache.set(key, data)
      if (updateTime) time[key] = updateTime
      return true
    } else return false
  }
```
### send函数
```js
function send(res, source, mime) {
    res.setHeader('Content-Type', mime)
    // https://www.expressjs.com.cn/4x/api.html#res.end
    // 结束响应过程。
    res.end(source)
}
```
### transformModuleImports
修改module包的引入方式，同时得到包里的代码
```js
const recast = require('recast')
const isPkg = require('validate-npm-package-name')

function transformModuleImports(code) {
  const ast = recast.parse(code)
  recast.types.visit(ast, {
    visitImportDeclaration(path) {
      const source = path.node.source.value
      if (!/^\.\/?/.test(source) && isPkg(source)) {
        path.node.source = recast.types.builders.literal(`/__modules/${source}`)
      }
      this.traverse(path)
    }
  })
  return recast.print(ast).code
}

exports.transformModuleImports = transformModuleImports
```
### loadPkg
将三方包转义成 浏览器可以直接使用的方式，此时的代码只支持vue包。
```js
const fs = require('fs')
const path = require('path')
const readFile = require('util').promisify(fs.readFile)

async function loadPkg(pkg) {
  if (pkg === 'vue') {
    const dir = path.dirname(require.resolve('vue'))
    const filepath = path.join(dir, 'vue.esm.browser.js')
    return readFile(filepath)
  }
  else {
    // TODO
    // check if the package has a browser es module that can be used
    // otherwise bundle it with rollup on the fly?
    throw new Error('npm imports support are not ready yet.')
  }
}

exports.loadPkg = loadPkg
```

## 参考资料
- [尤雨溪几年前开发的“玩具 vite”，才100多行代码，却十分有助于理解 vite 原理](https://juejin.cn/post/7021306258057592862)
- [vue-dev-serve](https://github.com/vuejs/vue-dev-server)