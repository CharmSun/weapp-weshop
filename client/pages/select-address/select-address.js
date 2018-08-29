// pages/select-address/select-address.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    var isDefault = e.currentTarget.dataset.isDefault;
    if (isDefault) {
      return;
    }
    const session = qcloud.Session.get();
    if (!session) {
      wx.reLaunch({
        url: '/pages/mine/mine'
      });
    }
    
    qcloud.request({
      method: 'post',
      login: true,
      url: `${config.baseUrl}/address/setDefault`,
      data: {
        open_id: session.userinfo.openId,
        id 
      },
      success: res => {
        if (res.data.code === 0) {
          wx.navigateBack();
        }
      },
      fail: error => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  addAddress: function () {
    wx.navigateTo({
      url: "/pages/add-address/add-address"
    });
  },

  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/add-address/add-address?id=" + e.currentTarget.dataset.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    const session = qcloud.Session.get();
    if (!session) {
      wx.reLaunch({
        url: '/pages/mine/mine'
      });
    }
    util.showBusy('加载中...');
    qcloud.request({
      login: true,
      url: `${config.baseUrl}/address/getList`,
      data: {
        open_id: session.userinfo.openId
      },
      success: res => {
        util.showSuccess('加载完成');
        if (res.data.code === 0) {
          this.setData({ addressList: res.data.data });
        }
      },
      fail: error => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
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