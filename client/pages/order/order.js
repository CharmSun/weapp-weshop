// pages/order/order.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const session = qcloud.Session.get();
    if (!session) {
      wx.reLaunch({
        url: '/pages/mine/mine'
      });
    }
    
    util.showBusy('加载中...');
    qcloud.request({
      url: `${config.baseUrl}/order/list`,
      data: {
        open_id: session.userinfo.openId
      },
      success: res => {
        util.showSuccess('加载完成');
        if (res.data.code === 0) {
          this.setData({
            orderList: res.data.data
          });
        }
      },
      fail: error => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})