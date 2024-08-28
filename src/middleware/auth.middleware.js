const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../config/config.default")
const { tokenExpiredError, jsonWebTokenError } = require("../constant/err.type")

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
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

module.exports = {
  auth,
}
