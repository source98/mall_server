const path = require("path")
const {
  fileUpLoadError,
  publishGoodsError,
  updateGoodsError,
  invalidGoodsId,
  removeGoodsError,
  restoreGoodsError,
  findAllGoodsError,
} = require("../constant/err.type")
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods
} = require("../service/goods.service")
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
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      )
      ctx.body = {
        code: 200,
        success: true,
        message: "发布商品成功",
        result: res,
      }
    } catch (e) {
      console.error(e)
      return ctx.app.emit("error", publishGoodsError, ctx)
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "修改商品成功",
          result: "",
        }
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx)
      }
    } catch (e) {
      return ctx.app.emit("error", updateGoodsError, ctx)
    }
  }

  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "下架商品成功",
          result: "",
        }
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx)
      }
    } catch (e) {
      return ctx.app.emit("error", removeGoodsError, ctx)
    }
  }

  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "上架商品成功",
          result: "",
        }
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx)
      }
    } catch (e) {
      return ctx.app.emit("error", restoreGoodsError, ctx)
    }
  }

  async findAllGoods(ctx) {
    const { pageNumber = 1, pageSize = 10 } = ctx.request.query
    try {
      const res = await findGoods(pageNumber, pageSize)
      ctx.body = res
    } catch (e) {
      return ctx.app.emit("error", findAllGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
