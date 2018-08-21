const cateData = require('../data/cate');
const goodsListData = require('../data/cate_goodsList');

function cateList(ctx) {
    ctx.state.data = cateData;
}

function goodsList(ctx) {
    ctx.state.data = goodsListData;
}

module.exports = {
    cateList,
    goodsList
}
