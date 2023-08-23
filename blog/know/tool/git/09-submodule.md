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

## 克隆含有子模块的项目
当你在克隆这样的项目时，默认会包含该子模块目录，但其中还没有任何文件。

必须要运行两个命令
1. `git submodule init`: 用来初始化本地配置文件
2. `git submodule update`: 从该项目中抓取所有数据并检出父项目中列出的合适的提交。
```bash
git submodule init
git submodule update
```
两个命令可以合并成一个:
```bash
git submodule update --init
```
来将子模块中填充对应的模块。


## 参考资料
1. [gitbook-submodule章节](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)