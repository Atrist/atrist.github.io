const fs = require('fs')
/**
 * 构建中途使用到的工具函数
 */

/**
 * func: 用于判定路径名是否为文件
 * params: path(绝对路径)
 * return: boolean
 *
 */

exports.isFile = function isFile(path) {
  try {
    const stats = fs.statSync(path)
    return stats.isFile()
  } catch (err) {
    console.error(err)
  }
}

/**
 * 将传入目录中的所有文件以特定的格式(遵循 sidebar 格式 )返回
 * @param {string} path
 * @returns array<files>
 */
exports.fileList = function fileList(rootPath, path) {
  const result = []
  const files = fs.readdirSync(rootPath)
  for (let file of files) {
    if (file === 'index.md') continue
    result.push({
      text: file.split('.')[0],
      link: path + '/' + file.split('.')[0],
    })
  }
  return result
}
