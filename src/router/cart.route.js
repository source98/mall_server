const Router = require("koa-router")
const router = new Router({ prefix: "/carts" })

const { auth } = require("../middleware/auth.middleware")
const { cartValidator } = require("../middleware/cart.middleware")

const { add } = require("../controller/cart.controller")

router.post("/", auth, cartValidator, add)

module.exports = router
