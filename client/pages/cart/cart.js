// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    batchEdit: false,
    allSelected: true,
    noSelected: false,
    totalCount: 0,
    totalPrice: 0
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
    var cartInfo = wx.getStorageSync('cartInfo');
    for (var i = 0; i < cartInfo.list.length; i++) {
      cartInfo.list[i].left = 0;
    }
    this.setData({
      goodsList: cartInfo.list
    });
    this.setTotal();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var cartCount = 0;
    var list = this.data.goodsList;
    for (var i = 0; i < list.length; i++) {
      cartCount += list[i].num;
    }
    wx.setStorageSync('cartInfo', {
      list,
      cartCount
    });
  },

  navigateToGoods: function () {
    wx.switchTab({
      url: "/pages/category/category"
    });
  },

  switchEdit: function() {
    var list = this.data.goodsList;
    for (var i = 0; i < list.length; i++) {
      list[i].selected = this.data.batchEdit;
    }
    this.setData({
      goodsList: list,
      batchEdit: !this.data.batchEdit
    });
    this.setTotal();
  },

  increaseNum: function (e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num < 99) {
      this.data.goodsList[index].num += 1;
    }
    this.setData({
      goodsList: this.data.goodsList
    });
    this.setTotal();
  },

  reduceNum: function (e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num > 1) {
      this.data.goodsList[index].num -= 1;
    }
    this.setData({
      goodsList: this.data.goodsList
    });
    this.setTotal();
  },

  changeNumInput: function (e) {
    var index = e.target.dataset.index;
    if (e.detail.value > 99) {
      this.data.goodsList[index].num = 99;
    } else if (e.detail.value < 1) {
      this.data.goodsList[index].num = 1;
    } else {
      this.data.goodsList[index].num = e.detail.value;
    }
    this.setData({
      goodsList: this.data.goodsList
    });
    this.setTotal();
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var distX = this.data.startX - moveX;
      var left = 0;
      if(distX > 0) {
         left = distX < 60 ? distX : 60;
      }
      this.data.goodsList[index].left = left;
      this.setData({
        goodsList: this.data.goodsList
      });
    }
  },

  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var distX = this.data.startX - endX;
      var delBtnWidth = 60;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      this.data.goodsList[index].left = distX > delBtnWidth / 2 ? 60 : 0;
      this.setData({
        goodsList: this.data.goodsList
      });
    }
  },

  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.data.goodsList.splice(index, 1);
          this.setData({
            goodsList: this.data.goodsList
          });
          this.setTotal();
        }
      }
    });
  },

  deleteSelected: function () {
    if(this.data.noSelected) {
      return;
    }
    var list = this.data.goodsList.filter(item => !item.selected);
    wx.showModal({
      title: '提示',
      content: '确认删除所选商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            goodsList: list
          });
          this.setTotal();
        }
      }
    });
  },

  selectItem: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.goodsList[index].selected = !this.data.goodsList[index].selected;
    this.setData({
      goodsList: this.data.goodsList
    });
    this.setTotal();
  },

  selectAll: function (e) {
    var currentAllSelected = this.data.allSelected;
    var list = this.data.goodsList;
    for (var i = 0; i < list.length; i++) {
      list[i].selected = !currentAllSelected;
    }
    this.setData({
      goodsList: list
    });
    this.setTotal();
  },

  setTotal: function () {
    var list = this.data.goodsList;
    var totalPrice = 0;
    var totalCount = 0;
    var allSelected = true;
    var noSelected = true;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.selected) {
        totalPrice += parseFloat(curItem.price) * curItem.num;
        totalCount += curItem.num;
      }
      allSelected = allSelected && curItem.selected;
      noSelected = noSelected && !curItem.selected;
    }
    totalPrice = totalPrice.toFixed(2);//取两位小数精度
    this.setData({
      totalPrice,
      totalCount,
      allSelected,
      noSelected
    });
  },

})