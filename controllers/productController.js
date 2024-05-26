const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, description, phone} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, typeId, description, img: fileName, phone})

            // if (info) {
            //     info = JSON.parse(info)
            //     info.forEach(i =>
            //         DeviceInfo.create({
            //             title: i.title,
            //             description: i.description,
            //             deviceId: device.id
            //         })
            //     )
            // }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        else {
            products = await Product.findAndCountAll({limit, offset}) 
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController()