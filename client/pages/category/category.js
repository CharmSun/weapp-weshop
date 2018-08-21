// pages/category/category.js
var config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    goodsList: [],
    curTabIdx: 0,
    cartCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${config.baseUrl}/cate`,
      success: res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.setData({
            category: data.category
          });
          if (data.category && data.category.length > 0){
            this.getCateGoods(data.category[0].id);
          }
        }
      }
    });
  },

  getCateGoods: function (cateId) {
    wx.request({
      url: `${config.baseUrl}/cate/goodsList`,
      data: {cateId: cateId},
      success: res => {
        if (res.data.code === 0) {
          var list = res.data.data.goodsList;
          var cartInfo = wx.getStorageSync('cartInfo');
          for (var i = 0; i < list.length; i++) {
            list[i].num = 0;
            for (var j = 0; j < cartInfo.list.length; j++) {
              var item = cartInfo.list[j];
              if (list[i].id == item.id) {
                list[i].num = item.num;
              }
            }
          }
          this.setData({
            goodsList: list
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
    var list = this.data.goodsList;

    for(var i=0; i < list.length; i++) {
      list[i].num = 0;
      for (var j = 0; j < cartInfo.list.length; j++) {
        var item = cartInfo.list[j];
        if (list[i].id == item.id) {
          list[i].num = item.num;
        }
      }
    }
    this.setData({
      goodsList: list,
      cartCount: cartInfo.cartCount
    });
  },

  switchTab(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      curTabIdx: index
    });
    this.getCateGoods(this.data.category[index].id);
  },

  increaseNum: function(e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num < 99){
      this.data.goodsList[index].num += 1;
    }
    var cartInfo = this.addToCart(this.data.goodsList[index]);
    this.setData({
      goodsList: this.data.goodsList,
      cartCount: cartInfo.cartCount
    });
  },

  reduceNum: function (e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num > 0) {
      this.data.goodsList[index].num -= 1;
    }
    var cartInfo = this.addToCart(this.data.goodsList[index]);
    this.setData({
      goodsList: this.data.goodsList,
      cartCount: cartInfo.cartCount
    });
  },

  addToCart: function (goods) {
    var cartInfo = wx.getStorageSync('cartInfo');
    var inCart = false;
    for (var i = 0; i < cartInfo.list.length; i++) {
      var item = cartInfo.list[i];
      if (item.id == goods.id) {
        if (goods.num > 0) {
          item.num = goods.num;
        } else {
          cartInfo.list.splice(i, 1);
        }
        inCart = true;
        break;
      }
    }
    if (!inCart && goods.num > 0) {
      cartInfo.list.push({
        ...goods,
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
    return cartInfo;
  },

  navigateToCart: function (e) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  }

})