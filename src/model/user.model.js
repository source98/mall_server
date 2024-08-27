const { DataTypes } = require("sequelize")

const seq = require("../db/seq")

// 创建模型对象
const User = seq.define("zd_user", {
  //id 会被sequelize自动创建
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名 唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员? 1: 是, 0: 否",
  },
})
// 创建表执行脚本  node src/model/user.model.js
// User.sync({ force: true })

module.exports = User
