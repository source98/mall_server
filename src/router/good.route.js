const Router = require("koa-router")
const router = new Router({ prefix: "/goods" })

const { upload } = require("../controller/good.controller")

const { auth, isAdmin } = require("../middleware//auth.middleware")
const { goodValidator } = require("../middleware/goods.middleware")

// 商品图片上传
router.post("/upload", auth, isAdmin, upload)
// 测试接口
// router.post("/upload",upload)

// 发布商品
router.post("/publishGood", auth, isAdmin, goodValidator,(ctx) => {
  ctx.body = '成功'
})

module.exports = router
