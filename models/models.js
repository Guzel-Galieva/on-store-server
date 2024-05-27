const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "CUSTOMER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    description: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

User.hasMany(Product)
Product.belongsTo(User) //

Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type
}