const fs = require('fs');
const path = require('path');


//解析需要遍历的文件夹，我这以E盘根目录为例
const filePath = path.resolve('./static/img');

//调用文件遍历方法
fileDisplay(filePath);

const imgList = [];

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename, index) {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            const isFile = stats.isFile();//是文件
            const isDir = stats.isDirectory();//是文件夹
            if (isFile) {
              imgList.push(filename)
              if (index === files.length - 1) {
                console.log('["'+imgList.join('","')+'"]')
              }
            }
            if (isDir) {
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}
