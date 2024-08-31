const Goods = require("../model/goods.model")
class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, {
      where: { id },
    })
    return res[0] > 0
  }

  async removeGoods(id) {
    return await Goods.destroy({ where: { id } })
  }

  async restoreGoods(id) {
    return await Goods.restore({ where: { id } })
  }

  async findGoods(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize
    const { count: total, rows: list } = await Goods.findAndCountAll({
      offset,
      limit: +pageSize,
    })
    return {
      pageNumber,
      pageSize,
      total,
      list,
    }
  }
}

module.exports = new GoodsService()
