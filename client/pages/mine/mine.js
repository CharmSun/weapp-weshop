// pages/mine/mine.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const session = qcloud.Session.get();
    if (session) {
      // 本地已经有登录态
      // 可使用本函数更新登录态
      wx.showLoading({
        title: '加载中',
      });
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true });
          wx.hideLoading();
        },
        fail: err => {
          console.error(err);
          util.showModel('登录错误', err.message);
        }
      });
    }
  },

  getUserInfo: function (e) {
    util.showBusy('正在登录');

    // 首次登录
    qcloud.login({
      success: res => {
        this.setData({ userInfo: res, logged: true });
        util.showSuccess('登录成功');
      },
      fail: err => {
        console.error(err);
        util.showModel('登录错误', err.message);
      }
    });
  },

  toOrders: function () {
    const session = qcloud.Session.get();
    if (!session) {
      wx.showToast({
        icon: 'none',
        title: '请先登录'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  toAddress: function () {
    const session = qcloud.Session.get();
    if(!session) {
      wx.showToast({
        icon: 'none',
        title: '请先登录'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/select-address/select-address',
    })
  },

  callService: function () {
    wx.makePhoneCall({
      phoneNumber: '13400000000' 
    });
  },

  showAbout: function () {
    wx.showModal({
      title: '关于我们',
      content: '小店小本经营，概不赊账，谢谢大家支持！！',
      showCancel: false
    });
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