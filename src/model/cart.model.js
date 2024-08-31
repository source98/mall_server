const { DataTypes } = require("sequelize")

const seq = require("../db/seq")

const Cart = seq.define("zd_cart", {
  //id 会被sequelize自动创建
  goodsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品Id",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户Id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
})
// 创建表执行脚本  node src/model/cart.model.js
// Cart.sync({ force: true })

module.exports = Cart
