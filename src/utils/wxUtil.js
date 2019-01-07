export default {
  // 获取设备网络状态
  getNetworkType: (param = {}) => new Promise((resolve, reject) => {
    wx.getNetworkType({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取设备HCE状态
  getHCEState: (param = {}) => new Promise((resolve, reject) => {
    wx.getHCEState({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取设备屏幕亮度
  getScreenBrightness: (param = {}) => new Promise((resolve, reject) => {
    wx.getScreenBrightness({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取设备信息
  getSystemInfo: (param = {}) => new Promise((resolve, reject) => {
    wx.getSystemInfo({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取设备地理位置
  getLocation: (param = {}) => new Promise((resolve, reject) => {
    wx.getLocation({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 使用微信内置地图查看位置
  openLocation: (param = {}) => new Promise((resolve, reject) => {
    wx.openLocation({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 使用微信内置地图查看位置
  getSetting: (param = {}) => new Promise((resolve, reject) => {
    wx.getSetting({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 微信登录获取code
  login: (param = {}) => new Promise((resolve, reject) => {
    wx.login({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取userInfo
  getUserInfo: (param = {}) => new Promise((resolve, reject) => {
    wx.getUserInfo({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 发起 HTTPS 网络请求
  request: (param = {}) => new Promise((resolve, reject) => {
    wx.request({
      ...param,
      success: resolve,
      fail: reject
    })
  }),
  // 获取设备电量
  getBatteryInfo: (param = {}) => new Promise((resolve, reject) => {
    wx.getBatteryInfo({
      ...param,
      success: resolve,
      fail: reject
    })
  })
}
