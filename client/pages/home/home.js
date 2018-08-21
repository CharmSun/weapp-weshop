//index.js
var config = require('../../config');

Page({
  data: {
    banners: [],
    goodsList: [],
    panel: {
      show: false,
      goods: {},
      goodsNum: 1
    },
    cartCount: 0
  },

  onLoad: function () {
    wx.request({
      url: `${config.baseUrl}/banners`,
      success: res => {
        if (res.data.code === 0) {
          const data = res.data.data
          this.setData({
            banners: data.banners
          });
        }
      }
    });
    wx.request({
      url: `${config.baseUrl}/hot/goodsList`,
      success: res => {
        if (res.data.code === 0) {
          const data = res.data.data
          this.setData({
            goodsList: data.goodsList
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartInfo = wx.getStorageSync('cartInfo');
    this.setData({
      cartCount: cartInfo.cartCount
    });
  },

  showPanel: function (e) {
    var index = e.target.dataset.index;
    this.setData({
      'panel.show': true,
      'panel.goods': this.data.goodsList[index],
      'panel.goodsNum': 1
    });
  },

  increaseNum: function (e) {
    var num = ++this.data.panel.goodsNum;
    if (num < 100) {
      this.setData({
        'panel.goodsNum': num
      });
    }
  },

  reduceNum: function (e) {
    var num = --this.data.panel.goodsNum;
    if (num > 0) {
      this.setData({
        'panel.goodsNum': num
      });
    }
  },

  changeNumInput: function (e) {
    var num = e.detail.value;
    if (e.detail.value > 99) {
      num = 99;
    } else if (e.detail.value < 1) {
      num = 1;
    }
    this.setData({
      'panel.goodsNum': num
    })
  },

  addToCart: function () {
    var goods = this.data.panel.goods;
    var cartInfo = wx.getStorageSync('cartInfo');
    var inCart = false;
    for (var i = 0; i < cartInfo.list.length; i++) {
      var item = cartInfo.list[i];
      if (item.id == goods.id) {
        item.num += this.data.panel.goodsNum;
        inCart = true;
        break;
      }
    }
    if (!inCart) {
      cartInfo.list.push({
        ...goods,
        num: this.data.panel.goodsNum,
        selected: true
      });
    }
    var cartCount = 0;
    for (var i = 0; i < cartInfo.list.length; i++) {
      cartCount += cartInfo.list[i].num;
    }
    cartInfo.cartCount = cartCount;
    wx.setStorage({
      key: 'cartInfo',
      data: cartInfo,
    });
    this.setData({
      'cartCount': cartCount,
      'panel.show': false,
      'panel.goods': {},
      'panel.goodsNum': 1
    });
  },

  closePanel: function (e) {
    this.setData({
      'panel.show': false,
      'panel.goods': {},
      'panel.goodsNum': 1
    });
  },

  navigateToCart: function (e) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  }

})
