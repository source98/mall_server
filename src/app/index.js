const Koa = require("koa")
const { koaBody } = require("koa-body")
// 路由
const userRouter = require("../router/user.route")
// app实例
const app = new Koa()
// 中间件
app.use(koaBody())
app.use(userRouter.routes())

module.exports = app
