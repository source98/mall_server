const { Op } = require("sequelize")
const Cart = require("../model/cart.model")

class CartService {
  async createOrUpdate(userId, goodsId) {
    try {
      let res = await Cart.findOne({
        where: {
          [Op.and]: {
            userId,
            goodsId,
          },
        },
      })

      if (res) {
        await res.increment("number")
        return await res.reload()
      } else {
        return await Cart.create({
          userId,
          goodsId,
        })
      }
    } catch (e) {
      console.log("🚀 ~ CartService ~ createOrUpdate ~ e:", e)
    }
  }
}

module.exports = new CartService()
