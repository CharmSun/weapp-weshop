//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl);

    //同步storage中的购物车
    var cartInfo = wx.getStorageSync('cartInfo');
    if (!cartInfo) {
      cartInfo = {
        list: [],
        cartCount: 0
      };
    }
    wx.setStorageSync('cartInfo', cartInfo);
  }
})