---
title: hadoop的http接口使用
date: 2020-5-23
tags:
  - hadoop
  - node
summary: 利用hadoop的httpWeb进行node的二次开发
author: Atrist
---

## 参考

1. [hadoop 3.1.3的文档](https://hadoop.apache.org/docs/r3.1.3/)
2. [hadoop的WebHDFS REST API](https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/WebHDFS.html)


## hadoop的端口
1. 9870
2. 9864
## 文件和文件夹的操作

### 1. 创建一个文件夹
方法: put


官方的例子:
```sh
curl -i -X PUT "http://<HOST>:<PORT>/<PATH>?op=MKDIRS[&permission=<OCTAL>]"
```


我的使用方式:
```http
http://39.97.171.144:9870/webhdfs/v1/useremo?user.name=root&op=MKDIRS
```

### 2. 重新命名文件或文件夹

方法: put

官方的例子:
```sh
curl -i -X PUT "<HOST>:<PORT>/webhdfs/v1/<PATH>?op=RENAME&destination=<PATH>"
```


我的使用方式:
```http
http://39.97.171.144:9870/webhdfs/v1/useremo?user.name=root&op=RENAME&destination=/userrename
```

destination: 表示需要重新命令的文件或文件夹

### 3. 删除文件/文件夹

方法: delete

官方示例:
```sh
curl -i -X DELETE "http://<host>:<port>/webhdfs/v1/<path>?op=DELETE[&recursive=<true|false>]"
```

我的使用方式:
```http
http://39.97.171.144:9870/webhdfs/v1/userrename?user.name=root&op=DELETE
```


### 4. 创建一个文件并上传

方法: put

1. 发送一个创建文件目录的请求
```http
http://39.97.171.144:9870/webhdfs/v1/demo.demo?op=CREATE&user.name=root&noredirect=true
```

noredirect: true  不自动重定向


如果请求成功的话: <br/>
response:
```json
{
    "Location": "http://iZ2ze8zprwjrt5s0qgmkrjZ:9864/webhdfs/v1/demo.demo?op=CREATE&user.name=root&namenoderpcaddress=localhost:9000&createflag=&createparent=true&overwrite=false"
}
```

2. 再次发送一个请求:

在`header`里面携带`Location`字段:
```json
"Location": "http://iZ2ze8zprwjrt5s0qgmkrjZ:9864/webhdfs/v1/demo.demo?op=CREATE&user.name=root&namenoderpcaddress=localhost:9000&createflag=&createparent=true&overwrite=false"
```
http的请求

```http
http://39.97.171.144:9864/webhdfs/v1/demo.demo?op=CREATE&user.name=root
```

在body里面携带文件内容