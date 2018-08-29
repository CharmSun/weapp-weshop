/**
 * @author suncan
 * @date 2018/8/27
 * @description:
 */
const debug = require('debug')('koa-weapp-demo[addressModel]');
const { mysql } = require('../qcloud');


function saveAddressData (addressData) {
    const {open_id, name, mobile, address} = addressData;

    if(!!addressData.id) {
        return mysql('t_address').update({
            name, mobile, address
        }).where({
            id: addressData.id
        });
    } else {
        return mysql('t_address').count('open_id as hasAddress').where({open_id})
            .then((res => {
                if (res[0].hasAddress) {
                    return mysql('t_address').insert({
                        open_id, name, mobile, address
                    });
                } else {
                    return mysql('t_address').insert({
                        open_id, name, mobile, address,
                        isDefault: 1
                    });
                }
            }));
    }
}

function setDefaultAddress (open_id, id) {
    mysql.transaction(function(trx) {
        return trx.update({ isDefault: 0 }).into('t_address').where({open_id}).then(() => {
            return trx.update({
                isDefault: 1
            }).into('t_address').where({id});
        });
    });
}

function getAddressList (open_id) {
    return mysql('t_address').select('*').where({
        open_id
    });
}

function getDefaultAddress (open_id) {
    return mysql('t_address').select('*').where({
        open_id, isDefault: 1
    }).then(res => {
        if(res && res[0]){
            return res[0];
        }
        return {};
    });
}

function getAddressById (id) {
    return mysql('t_address').select('*').where({id}).then(res => {
        if(res && res[0]){
            return res[0];
        }
        return {};
    });
}

function deleteAddress (id) {
    return mysql('t_address').del().where({
        id
    });
}


module.exports = {
    saveAddressData,
    setDefaultAddress,
    getAddressList,
    getDefaultAddress,
    getAddressById,
    deleteAddress
}
