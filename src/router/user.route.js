const Router = require("koa-router")

const router = new Router({ prefix: "/users" })

const {
  userValidator,
  verifyRegister,
  verifyLogin,
  cryptPassword,
} = require("../middleware/user.middleware")
const { auth } = require("../middleware//auth.middleware")

const {
  register,
  login,
  editPassword,
} = require("../controller/user.controller")

// 用户注册
router.post("/register", userValidator, verifyRegister, cryptPassword, register)

// 用户登录
router.post("/login", userValidator, verifyLogin, login)

// 修改密码
router.patch("/editPassword", auth, editPassword)

module.exports = router
