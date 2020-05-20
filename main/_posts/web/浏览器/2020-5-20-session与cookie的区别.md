---
title: session与cookie的区别
date: 2020-5-20
tags:
  - browser 
summary: 开发中session与cookie的区别
---

## 参考资料
1. [n-blog的session](https://github.com/nswbmw/N-blog/blob/master/book/4.4%20%E5%8A%9F%E8%83%BD%E8%AE%BE%E8%AE%A1.md)
## 会话
由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）。

## cookie与session的区别
- cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
- 通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
- session 更安全，cookie 可以直接在浏览器查看甚至编辑

## koa-session
