const orderModel = require('../model/orderModel');

async function createOrder (ctx) {
    const orderData = ctx.request.body;
    await orderModel.createOrder(orderData);
}

async function getOrderList (ctx) {
    const {open_id} = ctx.query;
    ctx.state.data = await orderModel.getOrderList(open_id);
}

module.exports = {
    createOrder,
    getOrderList
}
