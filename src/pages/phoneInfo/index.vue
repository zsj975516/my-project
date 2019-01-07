<template>
  <div class="phone_info">
    <div class="user_info">
      <div class="user_header">

      </div>
      <div class="user_name">{{userName}}</div>
    </div>
    <div class="phone_info-container">
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
        userName: '测试用户名',
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

    async created () {
      wx.onNetworkStatusChange((isConnected, networkType) => {
        if (!isConnected) {
          this.networkType = '未连接网络'
        } else {
          this.networkType = networkType
        }
      })

      try {
        let res = await wxUtil.getNetworkType()
        this.networkType = res.networkType
      } catch (e) {
        console.error('getNetworkType', e)
      }
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
      try {
        let res = await wxUtil.getScreenBrightness()
        this.screenBrightness = res.value
      } catch (e) {
        console.error('getScreenBrightness', e)
      }
      try {
        let res = await wxUtil.getSystemInfo()
        this.fontSizeSetting = res.fontSizeSetting
        this.language = res.language
        this.version = res.version
        this.screenHeight = res.screenHeight
        this.screenWidth = res.screenWidth
        this.statusBarHeight = res.statusBarHeight
        this.brand = res.brand
        this.model = res.model
        this.system = res.system
        this.platform = res.platform

        console.log('getSystemInfo', res)
      } catch (e) {
        console.error('getSystemInfo', e)
      }
      // try {
      //   let res = await wxUtil.getLocation({type: 'gcj02'})
      //   await wxUtil.openLocation({
      //     latitude: res.latitude,
      //     longitude: res.longitude,
      //     scale: 18
      //   })
      //   console.log('getLocation', res)
      // } catch (e) {
      //   console.error('getLocation', e)
      // }

      try {
        let res = await wxUtil.getBatteryInfo()
        let text = ''
        if (res.isCharging) text += `充电中   `
        text += res.level
        this.batteryLevel = text
      } catch (e) {
        console.error('', e)
      }
    }
  }
</script>

<style scoped lang="scss">
  .phone_info {

    .user_info {
      .user_header {
        height: 100px;
        width: 100px;
        background-color: #aaaaaa;
        border-radius: 50%;
        margin: 0 auto;
      }

      .user_name {
        text-align: center;
      }
    }

    .phone_info-container {

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
