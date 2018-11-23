const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middlewares/auth')

router.use('/check', authMiddleware)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/check', controller.check)



module.exports = router