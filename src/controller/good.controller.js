const path = require("path")
const { fileUpLoadError, publishGoodsError } = require("../constant/err.type")
const { createGoods } = require("../service/goods.service")
class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files
    if (file) {
      ctx.body = {
        code: 200,
        success: true,
        message: "图片上传成功",
        result: {
          goodsName: path.basename(file.filepath),
        },
      }
    } else {
      return ctx.app.emit("error", fileUpLoadError, ctx)
    }
  }

  async create(ctx) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
      ctx.body = {
        code: 200,
        success: true,
        message: "发布商品成功1",
        result: res,
      }
    } catch (e) {
      console.error(e)
      return ctx.app.emit("error", publishGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
