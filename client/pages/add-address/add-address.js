// pages/add-address/add-address.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: null,
    canDelete: false
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
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
      this.setData({
        canDelete: true
      });
      util.showBusy('加载中...');
      qcloud.request({
        url: `${config.baseUrl}/address/get`,
        data: {
          id: options.id
        },
        success: res => {
          util.showSuccess('加载完成');
          if (res.data.code === 0) {
            this.setData({ addressData: res.data.data });
          }
        },
        fail: error => {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        }
      });
    }
    
  },

  bindCancel: function () {
    wx.navigateBack();
  },

  bindSave: function (e) {
    const session = qcloud.Session.get();
    if (!session) {
      wx.reLaunch({
        url: '/pages/mine/mine'
      });
    }
    const open_id = session.userinfo.openId;
    const name = e.detail.value.name;
    const mobile = e.detail.value.mobile;
    const address = e.detail.value.address;
    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      });
      return;
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      });
      return;
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      });
      return;
    }
    util.showBusy('请求中...');
    var addressData = this.data.addressData;
    qcloud.request({
      method: 'post',
      login: true,
      url: `${config.baseUrl}/address/save`,
      data: {
        ...addressData,
        open_id, name, mobile, address
      },
      success: res => {
        util.showSuccess('保存成功');
        wx.navigateBack();
      },
      fail: error => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  deleteAddress: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          qcloud.request({
            method: 'post',
            login: true,
            url: `${config.baseUrl}/address/del`,
            data: { id },
            success: res => {
              util.showSuccess('删除成功');
              wx.navigateBack();
            },
            fail: error => {
              util.showModel('请求失败', error);
              console.log('request fail', error);
            }
          });
        }
      }
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