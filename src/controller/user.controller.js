const jwt = require("jsonwebtoken")

const {
  createUser,
  getUserInfo,
  updateUserPassword,
} = require("../service/user.service")
const {
  userRegisterError,
  userLoginError,
  userEditPasswordError,
} = require("../constant/err.type")

const { encryptHandler } = require("../utils/index.js")
// 私钥
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
        code: 200,
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

  async editPassword(ctx) {
    const { username, newPassword } = ctx.request.body
    try {
      await updateUserPassword(username, encryptHandler(newPassword))
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        message: "修改密码成功",
        result: "",
      }
    } catch (err) {
      return ctx.app.emit("error", userEditPasswordError, ctx)
    }
  }
}

module.exports = new UserController()
