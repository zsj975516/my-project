// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  let url = 'https://api.weixin.qq.com/sns/jscode2session'
  let res = await axios.get(url, {
    params: {
      appid: event.userInfo.appId,
      secret: 'a85d8c5d0fe786e4812bb38ac3d062f2',
      js_code: event.code,
      grant_type: 'authorization_code'
    }
  })
  //

  console.log(res.data)

  return {
    data: res.data
  }
}
