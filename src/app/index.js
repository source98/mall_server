const path = require("path")

const Koa = require("koa")
const parameter = require("koa-parameter")
const KoaStatic = require("koa-static")
const { koaBody } = require("koa-body")

const router = require("../router")
const errorHandler = require("./errorHandler")

const app = new Koa()
app
  .use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, "../uploads"),
        keepExtensions: true,
      },
    })
  )
  .use(KoaStatic(path.join(__dirname, "../uploads")))
  .use(parameter(app))
  .use(router.routes())
  .use(router.allowedMethods())

app.on("error", errorHandler)

module.exports = app
