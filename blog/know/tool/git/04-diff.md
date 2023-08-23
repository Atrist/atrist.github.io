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
### diff 查看 不同的tag
```
git diff v1.0 v2.0
```
### stat
```
git diff head~1 head --stat
```
命令行概览展示修改的文件
```bash
> git diff head~1 head --stat
.../algorithm/data/06-\345\205\266\344\273\226.md" |  7 +++++++
.../know/back/nodejs/01-install.md                 |  0
docs/know/back/nodejs/98-process.md                |  2 ++
.../know/back/nodejs/99-file.md                    |  0
.../know/tool/git/01-\345\237\272\347\241\200.md"  |  5 +++++
docs/know/tool/git/04-diff.md                      | 15 +++++++++++++++       
...242\204\350\256\242\347\273\237\350\256\241.md" | 22 ++++++++++++++++++++++
...232\217\346\234\272\351\200\211\346\213\251.md" | 14 ++++++++++++++        
...203\275\347\232\204\350\267\257\345\276\204.md" |  5 ++++-
9 files changed, 69 insertions(+), 1 deletion(-)
```