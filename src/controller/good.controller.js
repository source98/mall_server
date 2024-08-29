const path = require("path")
const { fileUpLoadError } = require("../constant/err.type")
class GoodsController {
  async upload(ctx, next) {
    ctx.body = "怎么个事儿"
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
}

module.exports = new GoodsController()
