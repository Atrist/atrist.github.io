## 子仓库
在建立自己的workshop项目中, 一些基本的DEMO会根据现有比较优秀的开源项目作为模板, 也就需要去查看其他项目的源码.

一个Git文件夹中,是不允许存在其他的Git仓库的.

所以为了方便管理, 这里将使用git提供的 submodule 功能 来进行对其他项目仓库进行管理.

## 添加一个子仓库
命令格式
```sh 
git submodule add <url> <path>
```
- url: 远程仓库的 https 地址
- path: 克隆到本地目的的文件夹地址

## 更新

## 参考资料
1. [gitbook-submodule章节](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)