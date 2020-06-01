---
title: hadoop的webHttps接口的使用
date: 2020-5-23
tags:
  - hadoop
  - node
summary: 利用hadoop的httpWeb进行node的二次开发
author: Atrist
---

## 参考

1. [hadoop 3.1.3 的文档](https://hadoop.apache.org/docs/r3.1.3/)
2. [hadoop 的 WebHDFS REST API](https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/WebHDFS.html)

## hadoop 的端口

1. 9870
2. 9864

## 文件和文件夹的操作

### 1. 创建一个文件夹

方法: put

官方的例子:

```sh
curl -i -X PUT "http://<HOST>:<PORT>/<PATH>?op=MKDIRS[&permission=<OCTAL>]"
```

我的使用方式:<br/>

- 必带的 `path` 连接: `webhdfs/v1`
- 文件的 `path`: `/userdemo`

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

方法: `put`

**我的使用方式**

1. 发送一个创建文件目录的请求

   ```http
   http://39.97.171.144:9870/webhdfs/v1/demo.demo?op=CREATE&user.name=root&noredirect=true
   ```

   noredirect: true 不自动重定向

   如果请求成功的话: <br/>
   response:

   ```json
   {
     "Location": "http://iZ2ze8zprwjrt5s0qgmkrjZ:9864/webhdfs/v1/demo.demo?op=CREATE&user.name=root&namenoderpcaddress=localhost:9000&createflag=&createparent=true&overwrite=false"
   }
   ```

   使用`Location`改变第二次的请求地址

2. 再次发送一个请求:
   ```js
   let res1 = await axios({
     method: "put",
     url: "http://39.97.171.144:9864/webhdfs/v1/user/hadoop/file1.txt",
     params: {
       "user.name": "root",
       op: "CREATE",
       namenoderpcaddress: "localhost:9000",
       offset: "0",
       createparent: "true",
     },
   });
   ```
   在 `body` 里面携带文件内容

### 5. 打开并下载文件

方法: Get
官方链接:

```http
http://<HOST>:<PORT>/webhdfs/v1/<PATH>?op=OPEN&noredirect=true
```

**我的使用方式**

1. 先发送一个不自动重定向的链接

   ```http
   http://39.97.171.144:9870/webhdfs/v1/demo.demo?op=OPEN&user.name=root&noredirect=true
   ```

2. 此次请求会返回一个 `location`,使用 `location` 再次请求

   ```js
   let res1 = await axios({
     method: "get",
     url: "http://39.97.171.144:9864/webhdfs/v1/user/hadoop/file1.txt",
     params: {
       "user.name": "root",
       op: "OPEN",
       namenoderpcaddress: "localhost:9000",
       offset: "0",
     },
   });
   ```

   文件的内容在 `res1.data`

3. 进行文件数据的转发--借靠`buffer`
   ```js
   const data = Buffer.from(res1.data);
   ctx.set({
     "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
     "content-length": `${res1.headers["content-length"]}`,
     "Content-Disposition": `attachment; filename=file1.txt`, //filename是浏览器下载时的文件名字
   });
   ctx.body = data;
   ```
