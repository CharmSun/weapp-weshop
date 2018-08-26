/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://10.129.148.226:5757';

var config = {

  host,

  //baseUrl: `https://www.easy-mock.com/mock/5b71064aad65f917b568cebe/weshop`,
  baseUrl: `http://10.129.148.226:5757/weshop`,

  // 下面的地址配合云端 Demo 工作
  service: {

    // 登录地址，用于建立会话
    loginUrl: `${host}/weshop/login`,

    // // 测试的请求地址，用于测试会话
    // requestUrl: `${host}/weapp/user`,

    // // 测试的信道服务地址
    // tunnelUrl: `${host}/weapp/tunnel`,

    // // 上传图片接口
    // uploadUrl: `${host}/weapp/upload`
  }
};

module.exports = config;