const { createOrUpdate } = require('../service/cart.service')

class CartController {
  async add(ctx) {
    console.log("🚀 ~ CartController ~ add ~ ctx:", ctx.state.user.id)
    const userId = ctx.state.user.id
    const goodsId = ctx.request.body.goodsId
    const res = await createOrUpdate(userId, goodsId)
    ctx.body = {
      code: 200,
      success: true,
      message: "添加购物车成功",
      result: res,
    }
  }
}

module.exports = new CartController()
