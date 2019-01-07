<template>
  <div class="container">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
    </form>
    <a href="/pages/coushude1/main" class="counter">去往另一个凑数的页面</a>
  </div>
</template>

<script>
  import wxUtil from '../../utils/wxUtil'
  // import myUtil from '../../utils/myUtil'
  import card from '@/components/card'

  export default {
    data () {
      return {
        motto: 'Hello World',
        userInfo: {}
      }
    },

    components: {
      card
    },

    methods: {
      bindViewTap () {
        const url = '../logs/main'
        wx.navigateTo({url})
      },
      async getUserInfo () {
        // 调用登录接口
        try {
          let res = await wxUtil.login()
          console.log(res)
          // let loginRes = await myUtil.login(res.code)

          // console.log(loginRes)
          // try {
          //   let userInfo = await wxUtil.getUserInfo()
          //
          //   this.userInfo = userInfo.userInfo
          //   console.log(userInfo)
          // } catch (e) {
          //   console.error('getUserInfo', e)
          // }
        } catch (e) {
          console.error('login', e)
        }
      },
      clickHandle (msg, ev) {
        console.log('clickHandle:', msg, ev)
      }
    },

    async created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
      try {
        let res = await wxUtil.getSetting()
        console.log(res)
      } catch (e) {
        console.error('getSetting', e)
      }
    }
  }
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128 rpx;
    height: 128 rpx;
    margin: 20 rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
