# 小程序Demo Node.js服务端与前端 WeShop - 小商店

## 功能
- 首页
- 分类
- 购物车
- 我的
- 提交订单
- 我的订单
- 收货地址管理
- 店铺地址

## server端
1. 准备建立Server 端服务，进入server目录中
2. 修改server目录下 config.js 中的相关配置（主要是appId，appSecret和mysql三项），
3. 执行npm install 安装依赖
4. 初始化数据库，进入server 目录中，执行tools下的initdb.js脚本，或者手动将weshop.sql文件导入数据库
5. 用package.json 中的脚本执行相关 npm 命令，启动server服务

## client端
修改client目录下congfig.js, 设置后台服务启动地址和端口

