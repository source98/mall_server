class UserController {
  async register(ctx) {
    ctx.body = "注册成功！"
  }

  async login(ctx) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
