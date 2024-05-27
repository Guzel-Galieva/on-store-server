const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authHandle = require('../middleware/authHandle')

router.post('/', authHandle, productController.create)
router.get('/', productController.getAll)
router.get('/my', authHandle, productController.getUsers)
router.get('/:id', productController.getOne)
router.post('/delete', productController.deleteOne)


module.exports = router