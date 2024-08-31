const { invalidGoodsId } = require("../constant/err.type")
const cartValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goodsId: "number", //koa-parameter 简写：type:number, required: true
    })
  } catch (e) {
    invalidGoodsId.result = e
    return ctx.app.emit("error", invalidGoodsId, ctx)
  }
  await next()
}

module.exports = {
  cartValidator,
}
