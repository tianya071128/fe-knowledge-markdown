/*
 * @Descripttion:
 * @Author: 温祖彪
 * @Date: 2021-09-13 17:34:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-09-13 17:44:48
 */
// => 导入模块
const mongoose = require('mongoose');
// => URI > mongodb://用户名:密码@主机:端口/数据库名称
const MONGODB_URI = 'mongodb://root:123@localhost:27017/testMongo';
// => 连接数据库
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('mongodb connect fail!');
    return;
  }
  console.log('mongodb connect success!');
});
module.exports = mongoose;
