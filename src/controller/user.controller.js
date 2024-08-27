const { createUser } = require("../service/user.service")
class UserController {
  async register(ctx) {
    // 1. 获取数据
    const { username, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(username, password)
    // 3. 返回结果
    ctx.body = {
      code: 200,
      message: "用户注册成功",
      success: true,
      result: {
        id: res.id,
        username: res.username,
      },
    }
  }

  async login(ctx) {
    ctx.body = "登录成功"
  }
}

module.exports = new UserController()
