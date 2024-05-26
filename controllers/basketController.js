const {BasketProduct, Product} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async addProduct(req, res) {
        const {productId} = req.body
        const basket = await BasketProduct.create({basketId : req.user.id, productId})
        return res.json(basket)
    }

    async getAll(req, res) {
        const basket = await BasketProduct.findAll({where:{basketId : req.user.id}})
        const itemIds = basket.map(prod => prod.productId)
        console.log(itemIds)
        const products = await Product.findAll({ where: { id: itemIds} } )
        return res.json(products)
    }

}


module.exports = new BasketController()