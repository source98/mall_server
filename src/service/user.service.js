// 导入模型对象
const User = require("../model/user.model")

class UserService {
  // 注册用户
  async createUser(username, password) {
    const res = await User.create({ username, password })
    return res.dataValues
  }

  // 根据传入的参数查找是否在表中重复
  async getUserInfo(params) {
    const res = await User.findOne({
      // attributes: Object.keys(params),
      attributes: ["id", "username", "password", "is_admin"],
      where: params,
    })
    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
