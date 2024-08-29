const Router = require("koa-router")
const router = new Router({ prefix: "/goods" })

const { upload } = require("../controller/good.controller")

router.post("/upload", upload)

module.exports = router
