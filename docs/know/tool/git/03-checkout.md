## checkout命令
可以使用checkout命令来跳转到特定的commit版本, 使用命令如下:
```bash
git checkout commitId
```
第一次使用会出现提示语句, 无需过多关注.

示例:
```bash
$ git checkout 67f6c41e8deb55b12ff7bbd96a689eb464a8a0ac
Previous HEAD position was 5ef286f 5.0.0
HEAD is now at 67f6c41 4.0.0
```

### --orphan
从源头切换一个分支
