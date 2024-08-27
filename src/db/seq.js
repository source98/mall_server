const { Sequelize } = require("sequelize")

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
} = require("../config/config.default")

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  port: MYSQL_PORT,
})

// seq
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.")
//   })
//   .then((err) => {
//     console.error("Unable to connect to the database:", err)
//   })

module.exports = seq
