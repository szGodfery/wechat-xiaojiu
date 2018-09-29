<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>


<style>
/* 全局导入字体样式 */
@import "../static/styles/iconfont.less";
page{
  background-color: #edece8;
}
text{
  font-size: 12px;
}
</style>
