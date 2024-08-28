const Router = require("koa-router")

const router = new Router({ prefix: "/users" })

const {
  userValidator,
  verifyRegister,
  verifyLogin,
  cryptPassword,
} = require("../middleware/user.middleware")
const { register, login } = require("../controller/user.controller")

// 用户注册接口
router.post("/register", userValidator, verifyRegister, cryptPassword, register)

router.post("/login", userValidator, verifyLogin, login)

module.exports = router
