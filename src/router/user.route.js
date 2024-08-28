const Router = require("koa-router")

const router = new Router({ prefix: "/users" })

const {
  userValidator,
  verifyUser,
  cryptPassword,
} = require("../middleware/user.middleware")
const { register, login } = require("../controller/user.controller")

// 用户注册接口
router.post("/register", userValidator, verifyUser, cryptPassword, register)

router.post("/login", login)

module.exports = router
