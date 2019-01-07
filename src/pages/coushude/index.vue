<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl"
           :src="userInfo.avatarUrl"/>
      <div class="userinfo-nickname">{{userInfo.nickName}}</div>
      <button open-type="getUserInfo" v-if="needLogin">登录</button>
    </div>
    <div class="phoneinfo">
      <div class="phone_info-item">
        <span class="label">手机品牌</span>
        <span class="value">{{brand}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">手机型号</span>
        <span class="value">{{model}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">系统版本</span>
        <span class="value">{{system}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">客户端平台</span>
        <span class="value">{{platform}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">网络状态</span>
        <span class="value">{{networkType}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">HCE状态</span>
        <span class="value">{{HCEState}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">屏幕亮度</span>
        <span class="value">{{screenBrightness}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">电池电量</span>
        <span class="value">{{batteryLevel}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">字体大小</span>
        <span class="value">{{fontSizeSetting}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">微信语言</span>
        <span class="value">{{language}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">微信版本</span>
        <span class="value">{{version}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">屏幕高度</span>
        <span class="value">{{screenHeight}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">屏幕宽度</span>
        <span class="value">{{screenWidth}}</span>
      </div>
      <div class="phone_info-item">
        <span class="label">状态栏高度</span>
        <span class="value">{{statusBarHeight}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import wxUtil from '../../utils/wxUtil'

  export default {
    data () {
      return {
        needLogin: false,
        userInfo: {},
        HCEState: '',
        screenBrightness: '',
        batteryLevel: '', // 电池电量
        fontSizeSetting: '', // 字体大小
        language: '', // 微信语言
        version: '', // 微信版本
        brand: '', // 手机品牌
        model: '', // 手机型号
        system: '', // 系统版本
        platform: '', // 客户端平台
        screenHeight: '', // 屏幕高度
        screenWidth: '', // 屏幕宽度
        statusBarHeight: '', // 状态栏高度
        networkType: ''
      }
    },
    async onPullDownRefresh () {
      console.log('下拉刷新')
      await this.getBatteryInfo()
      await this.getScreenBrightness()

      wx.stopPullDownRefresh()
    },
    methods: {
      async getBatteryInfo () {
        let batteryInfo = await wxUtil.getBatteryInfo()
        let text = ''
        if (batteryInfo.isCharging) text += `充电中   `
        text += batteryInfo.level
        this.batteryLevel = text
      },
      async getScreenBrightness () {
        let screenBrightness = await wxUtil.getScreenBrightness()
        this.screenBrightness = screenBrightness.value
      },
      async getSystemInfo () {
        let systemInfo = await wxUtil.getSystemInfo()
        this.fontSizeSetting = systemInfo.fontSizeSetting
        this.language = systemInfo.language
        this.version = systemInfo.version
        this.screenHeight = systemInfo.screenHeight
        this.screenWidth = systemInfo.screenWidth
        this.statusBarHeight = systemInfo.statusBarHeight
        this.brand = systemInfo.brand
        this.model = systemInfo.model
        this.system = systemInfo.system
        this.platform = systemInfo.platform
      },
      async getNetworkType () {
        let networkType = await wxUtil.getNetworkType()
        this.networkType = networkType.networkType
      },
      async getUserInfo () {
        let setting = await wxUtil.getSetting()
        if (!setting.authSetting['scope.userInfo']) {
          this.needLogin = true
        } else {
          let userInfo = await wxUtil.getUserInfo()
          this.userInfo = userInfo.userInfo
        }
      }
    },
    async created () {
      wx.onNetworkStatusChange((isConnected, networkType) => {
        if (!isConnected) {
          this.networkType = '未连接网络'
        } else {
          this.networkType = networkType
        }
      })

      this.getUserInfo()

      try {
        let res = await wxUtil.getHCEState()

        let s = {
          0: '正常',
          13000: '当前设备不支持NFC',
          13001: '当前设备支持NFC，但系统NFC开关未开启',
          13002: '当前设备支持NFC，但不支持HCE',
          13003: 'AID列表参数格式错误',
          13004: '未设置微信为默认NFC支付应用',
          13005: '返回的指令不合法',
          13006: '注册AID失败'
        }
        this.HCEState = s[res.errCode]
      } catch (e) {
        this.HCEState = '暂不支持查询'
        console.error('getHCEState', e)
      }

      this.getNetworkType()
      this.getSystemInfo()
      this.getBatteryInfo()
      await this.getScreenBrightness()
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;

    .userinfo {
      height: 200px;
      width: 100%;
      text-align: center;

      .userinfo-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }

      .userinfo-nickname {
        text-align: center;
      }
    }

    .phoneinfo {
      width: 100%;

      .phone_info-item {
        $label_width: 120px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;

        &:nth-child(1) {

          border-top: 1px solid #ccc;
        }

        .label {
          text-indent: 10px;
          display: inline-block;
          width: $label_width;
        }

        .value {
          display: inline-block;
          width: calc(100% - #{$label_width});
        }
      }
    }

  }

</style>
