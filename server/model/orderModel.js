/**
 * @author suncan
 * @date 2018/8/27
 * @description:
 */
const debug = require('debug')('koa-weapp-demo[orderModel]');
const { mysql } = require('../qcloud');
const moment = require('moment');


function createOrder (orderData) {
    const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
    const {open_id, receiver_name, receiver_mobile, receiver_address, payment, note, order_items} = orderData;

    return mysql('t_order').insert({
        open_id, payment, create_time, order_items, note, receiver_name, receiver_mobile, receiver_address
    });
}


function getOrderList (open_id) {
    return mysql('t_order').select('*').where({
        open_id
    }).orderBy('create_time', 'desc');
}


module.exports = {
    createOrder,
    getOrderList
}
