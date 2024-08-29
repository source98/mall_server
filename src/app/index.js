const Koa = require("koa")
const { koaBody } = require("koa-body")

// 路由
const router = require("../router")

const errorHandler = require("./errorHandler")
// app实例
const app = new Koa()
// 中间件
app.use(koaBody())
   .use(router.routes())
   .use(router.allowedMethods())

app.on("error", errorHandler)

module.exports = app
