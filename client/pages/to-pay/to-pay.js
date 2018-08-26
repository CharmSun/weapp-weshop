// pages/to-pay/to-pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curAddress: null,
    goodsList: [
      {
        "id": "01001",
        "name": "琅琊土豆(洋芋条条)",
        "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
        "price": "7",
        "num": 1,
        "pic": "https://lg-6y7g7qm8-1256755208.cos.ap-shanghai.myqcloud.com/banner4.jpg"
      },
      {
        "id": "01002",
        "name": "全家福爆多冰粉",
        "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
        "pic": "https://lg-6y7g7qm8-1256755208.cos.ap-shanghai.myqcloud.com/banner4.jpg",
        "price": "10",
        "num": 2,
      },
      {
        "id": "01003",
        "name": "全家福爆多料煎饼",
        "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
        "price": "15",
        "pic": "https://lg-6y7g7qm8-1256755208.cos.ap-shanghai.myqcloud.com/banner4.jpg",
        "num": 3,
      }
    ]
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