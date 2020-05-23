---
title: hadoop在linux中的配置
date: 2020-5-23
tags:
  - hadoop
  - node
summary: 为了便于使用hadoop提供的WebHDFS REST API,需要配置一下linux中的配置
author: Atrist
---

## 1. 需要使用sudo 方式启动 start-dfs.sh

### 理由:
1. hadoop 会有`创建/删除`文件或文件夹等操作,而这些操作,一般需要超级管理员来做,而webHDFS作为API, 不具备手动提权的能力,所以,需要使用sudo方式启动

### 步骤
1. 改写 ssh的配置文件,使得ssh允许以root方式启动

    ssh的配置文件: `/etc/ssh/sshd_config`
    ```
    UseDNS no
    AddressFamily inet
    SyslogFacility AUTHPRIV
    PermitRootLogin yes
    ```
2. 重启ssh服务
    ```sh
    sudo service ssh restart
    ```
3. 在root用户,生成一个ssh-key
    ```sh
    # 此刻的操作,  在root用户下
    ssh-keygen -t rsa -P ""
    cd ~/.ssh/
    cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys
    ```
## 2. WebHDFS的Authentication
在发送请求的时候,需要将  `user.name = root`,简单例子:

这是一个创建文件目录的url示例:

```http
http://<HOST>:<PORT>/webhdfs/v1/useremo?user.name=root&op=MKDIRS
```