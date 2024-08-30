const Router = require("koa-router")
const router = new Router({ prefix: "/goods" })

const {
  upload,
  create,
  update,
  remove,
} = require("../controller/good.controller")

const { auth, isAdmin } = require("../middleware//auth.middleware")
const { goodValidator } = require("../middleware/goods.middleware")

// 商品图片上传
router.post("/upload", auth, isAdmin, upload)
// 测试接口
// router.post("/upload",upload)

// 发布商品
router.post("/publishGood", auth, isAdmin, goodValidator, create)
// 修改商品
router.put("/publishGood/:id", auth, isAdmin, goodValidator, update)
// 删除商品
router.delete("/deleteGoods/:id", auth, isAdmin, remove)

module.exports = router
