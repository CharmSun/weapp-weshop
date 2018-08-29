const addressModel = require('../model/addressModel');

async function getDefaultAddress (ctx) {
    const {open_id} = ctx.query;
    ctx.state.data = await addressModel.getDefaultAddress(open_id);
}

async function getAddressList (ctx) {
    const {open_id} = ctx.query;
    ctx.state.data = await addressModel.getAddressList(open_id);
}

async function setDefaultAddress (ctx) {
    const {open_id, id} = ctx.request.body;
    await addressModel.setDefaultAddress(open_id, id);
}

async function saveAddressData (ctx) {
    const addressData = ctx.request.body;
    await addressModel.saveAddressData(addressData);
}

async function getAddressById (ctx) {
    const {id} = ctx.query;
    ctx.state.data = await addressModel.getAddressById(id);
}

async function deleteAddress (ctx) {
    const {id} = ctx.request.body;
    await addressModel.deleteAddress(id);
}

module.exports = {
    getDefaultAddress,
    getAddressList,
    setDefaultAddress,
    saveAddressData,
    getAddressById,
    deleteAddress
}
