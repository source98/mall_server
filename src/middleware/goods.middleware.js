const { goodsFormateError } = require("../constant/err.type")

const goodValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goodsName: {
        type: "string",
        required: true,
      },
      goodsPrice: {
        type: "number",
        required: true,
      },
      goodsNum: {
        type: "number",
        required: true,
      },
      goodsImg: {
        type: "string",
        required: true,
      },
    })
  } catch (e) {
    goodsFormateError.result = e
    return ctx.app.emit("error", goodsFormateError, ctx)
  }
  await next()
}

module.exports = {
  goodValidator,
}
