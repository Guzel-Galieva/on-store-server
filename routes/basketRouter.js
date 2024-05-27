const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authHandle = require('../middleware/authHandle')

router.post('/', authHandle, basketController.addProduct)
router.get('/', authHandle, basketController.getAll)
router.delete('/all', basketController.deleteAll)
router.post('/delete', basketController.deleteOne)

module.exports = router