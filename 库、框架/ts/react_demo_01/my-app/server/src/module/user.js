/*
 * @Descripttion: 连接的 shuli 数据库的 user 集合
 * @Author: 温祖彪
 * @Date: 2021-09-13 17:45:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-10-14 23:05:55
 */
const mongoose = require('../db');
// 创建模式, 用于约束集合
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_pwd: {
    type: String,
    required: true,
  },
  user_type: String,
  token: String,
});

// 创建模型 -- 模型代表着数据库的集合, 用于操作集合
const User = mongoose.model('reactUser', userSchema);

module.exports = User;
