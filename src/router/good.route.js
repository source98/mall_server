const Router = require("koa-router")
const router = new Router({ prefix: "/goods" })

const { upload } = require("../controller/good.controller")

const { auth, isAdmin } = require("../middleware//auth.middleware")

router.post("/upload", auth, isAdmin, upload)

module.exports = router
