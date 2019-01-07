<script>
  export default {
    created () {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      console.log('app created and cache logs by setStorageSync')
    },
    async mounted () {
      try {
        // const db = wx.cloud.database({})
        // let res = await db.collection('test').get()
        // console.log('collection--->', res)

        // 调用云函数，返回用户openId，参数为云函数名称
        // let res1 = await wx.cloud.callFunction({name: 'userlogin'})
        // console.log('updateOpenId', res1.result)
      } catch (e) {
        console.error(e)
      }
    }
  }
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
