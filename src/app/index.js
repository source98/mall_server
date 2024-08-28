const Koa = require("koa")
const { koaBody } = require("koa-body")
// 路由
const userRouter = require("../router/user.route")

const errorHandler = require("./errorHandler")
// app实例
const app = new Koa()
// 中间件
app.use(koaBody())
app.use(userRouter.routes())

app.on("error", errorHandler)

module.exports = app
