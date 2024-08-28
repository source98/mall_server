const bcrypt = require("bcryptjs")

// 加密
const encryptHandler = (value) => {
  let encryptValue = null
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(value, salt)
  encryptValue = hash
  return encryptValue
}

module.exports = {
  encryptHandler,
}
