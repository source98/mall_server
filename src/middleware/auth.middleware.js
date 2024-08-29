const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../config/config.default")
const {
  tokenExpiredError,
  jsonWebTokenError,
  isNotAdminError,
} = require("../constant/err.type")

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace("Bearer ", "")
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      // token过期
      case "TokenExpiredError":
        return ctx.app.emit("error", tokenExpiredError, ctx)
      //无效的token
      case "JsonWebTokenError":
        return ctx.app.emit("error", jsonWebTokenError, ctx)
    }
  }
  await next()
}

const isAdmin = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.log('error',ctx.state.user)
    return ctx.app.emit("error", isNotAdminError, ctx)
  }
  await next()
}

module.exports = {
  auth,
  isAdmin,
}
