const { getUserInfo } = require("../service/user.service")
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
} = require("../constant/err.type")

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.app.emit("error", userFormateError, ctx)
    return
  }
  await next()
}

const verifyUser = async (ctx, next) => {
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

module.exports = { userValidator, verifyUser }
