## 可视化
为了更加容易且清晰的看到两个版本之间的diff, 在这里研究一下， git diff的项目文件可视化

相对应的git config配置文件
```bash
[core]
	editor = code
[diff]
	tool = code
[difftool "code"]
	cmd = code --wait --diff $LOCAL $REMOTE
[alias]
	dv = difftool -t code -y
```
这里只实现了串行的查看diff文件