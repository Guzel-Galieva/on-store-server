const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authHandle = require('../middleware/authHandle')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authHandle, userController.check) 

module.exports = router