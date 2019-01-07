import wxUtil from './wxUtil'

export default {
  login: async (code) => {
    try {
      let res = await wxUtil.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
          appid: 'wxc013eb17f4c0d48b',
          secret: 'a85d8c5d0fe786e4812bb38ac3d062f2',
          js_code: code,
          grant_type: 'authorization_code'
        }, // string/object/ArrayBuffer
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text'

      })

      console.log('request', res)
    } catch (e) {
      console.error('request', e)
    }
  }
}
