// pages/select-address/select-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {
        id: 1231,
        name: "苏超男",
        mobile: "12312341234",
        address: "五道口清华科技园",
        isDefault: true
      },
      {
        id: 123,
        name: "苏超男",
        mobile: "12312341234",
        address: "五道口清华科技园",
        isDefault: false
      },
    ]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateBack();
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