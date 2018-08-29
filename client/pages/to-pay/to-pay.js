// pages/to-pay/to-pay.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curAddress: null,
    goodsList: [],
    totalPrice: 0,
    note: null
  },

  addAddress: function () {
    wx.navigateTo({
      url: "/pages/add-address/add-address"
    });
  },

  selectAddress: function() {
    wx.navigateTo({
      url: '/pages/select-address/select-address'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartInfo = wx.getStorageSync('cartInfo');
    const list = cartInfo.list.filter( item => {
      return item.selected;
    });
    var totalPrice = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      totalPrice += parseFloat(curItem.price) * curItem.num;
    }
    this.setData({
      goodsList: list,
      totalPrice
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  createOrder: function () {
    const session = qcloud.Session.get();
    if (!session) {
      wx.reLaunch({
        url: '/pages/mine/mine'
      });
    }
    if(!this.data.curAddress){
      wx.showModal({
        title: '提示',
        content: '请选择收货地址',
        showCancel: false
      });
      return;
    }
    util.showBusy('请求中...');
    qcloud.request({
      method: 'POST',
      url: `${config.baseUrl}/order/create`,
      data: {
        open_id: session.userinfo.openId,
        receiver_name: this.data.curAddress.name,
        receiver_mobile: this.data.curAddress.mobile,
        receiver_address: this.data.curAddress.address,
        payment: this.data.totalPrice,
        note: this.data.note,
        order_items: JSON.stringify(this.data.goodsList)
      },
      success: res => {
        if (res.data.code === 0) {
          wx.removeStorageSync('cartInfo');
          wx.showToast({
            title: '提交成功',
            success: () => {
              wx.redirectTo({
                url: '/pages/order/order'
              });
            }
          });
        }
      },
      fail: error => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  },

  bindInput: function (e) {
    this.setData({
      note: e.detail.value
    });
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
    qcloud.request({
      url: `${config.baseUrl}/address/getDefault`,
      data: {
        open_id: session.userinfo.openId
      },
      success: res => {
        if (res.data.code === 0) {
          this.setData({ curAddress: res.data.data });
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