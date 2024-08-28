const { createUser } = require("../service/user.service")
const { userRegisterError } = require("../constant/err.type")

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
    const { username, password } = ctx.request.body
    ctx.body = `${username}登录成功`
  }
}

module.exports = new UserController()
