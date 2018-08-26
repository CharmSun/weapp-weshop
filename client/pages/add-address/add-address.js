// pages/add-address/add-address.js
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
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
      this.setData({
        canDelete: true
      });
    }
  },

  bindCancel: function () {
    wx.navigateBack();
  },

  bindSave: function (e) {
    var name = e.detail.value.name;
    var mobile = e.detail.value.mobile;
    var address = e.detail.value.address;
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