const { DataTypes } = require("sequelize")

const seq = require("../db/seq")

// 创建模型对象
const Goods = seq.define(
  "zd_good",
  {
    //id 会被sequelize自动创建
    goodsName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    goodsPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格",
    },
    goodsNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品库存",
    },
    goodsImg: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片地址",
    },
  },
  {
    paranoid: true,
  }
)
// 创建表执行脚本  node src/model/good.model.js
// Goods.sync({ force: true })

module.exports = Goods
