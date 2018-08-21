const bannersData = require('../data/banners');
const goodsListData = require('../data/hot_goodsList');

function banners(ctx) {
    ctx.state.data = bannersData;
}

function goodsList(ctx) {
    ctx.state.data = goodsListData;
}

module.exports = {
    banners,
    goodsList
}
