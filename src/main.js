const app = require("./app")

const { APP_PORT } = require("./config/config.default")

app.listen(`${APP_PORT}`, () => {
  console.log("http://localhost:8000")
})
