/**
 * @file ydk
 * @author shuai.li
 */


/**
 * 下载图片存储到缓存
 * @param config
 * @returns {Promise}
 */
export function downloadImage(serverId) {
  return new Promise((resolve, reject) => {
    ydk.downloadImage({
      serverId,
      progress: true, // 默认为 false
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  });
}

export function uploadImage(localId) {
  return new Promise((resolve, reject) => {
    ydk.uploadImage({
      localId,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  });
}

export function previewImage(url) {
  return new Promise((resolve, reject) => {
    ydk.previewImage({
      current: url, // 当前显示的图片链接
      urls: [url], // 需要预览的图片链接列表
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  });
}

export function chooseImage() {
  return new Promise((resolve, reject) => {
    ydk.chooseImage({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  });
}

export function getLocalImgData(localId) {
  return new Promise((resolve, reject) => {
    wx.getLocalImgData({
      localId,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  });
}

