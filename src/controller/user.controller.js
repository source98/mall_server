const jwt = require("jsonwebtoken")

const { createUser, getUserInfo } = require("../service/user.service")
const { userRegisterError, userLoginError } = require("../constant/err.type")
const { JWT_SECRET } = require("../config/config.default")

class UserController {
  async register(ctx) {
    const { username, password } = ctx.request.body
    try {
      const res = await createUser(username, password)
      ctx.body = {
        code: 200,
        message: "用户注册成功",
        success: true,
        result: {
          id: res.id,
          username: res.username,
        },
      }
    } catch (err) {
      ctx.app.emit("error", userRegisterError, ctx)
    }
  }

  async login(ctx) {
    const { username } = ctx.request.body
    try {
      const { password, ...res } = await getUserInfo({ username })

      ctx.body = {
        code: 0,
        success: true,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      }
    } catch (e) {
      return ctx.app.emit("error", userLoginError, ctx)
    }
  }
}

module.exports = new UserController()
