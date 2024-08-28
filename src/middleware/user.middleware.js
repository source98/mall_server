const bcrypt = require("bcryptjs")

const { getUserInfo } = require("../service/user.service")
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  userPasswordError,
} = require("../constant/err.type")

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.app.emit("error", userFormateError, ctx)
    return
  }
  await next()
}

const verifyRegister = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    const result = await getUserInfo({ username })
    if (result) {
      ctx.app.emit("error", userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    ctx.app.emit("error", userRegisterError, ctx)
    return
  }

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  try {
    const res = await getUserInfo({ username })
    if (!res) {
      return ctx.app.emit("error", userDoesNotExist, ctx)
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", userPasswordError, ctx)
    }
  } catch (err) {
    return ctx.app.emit("error", userLoginError, ctx)
  }

  await next()
}

// 密码加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

module.exports = {
  userValidator,
  verifyRegister,
  verifyLogin,
  cryptPassword,
}
