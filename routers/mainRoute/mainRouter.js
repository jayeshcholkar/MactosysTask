const router = require('express').Router()
const propertyRouter = require('../propertyRouter')
const userRouter = require('../userRouter')
const validateToken = require('../../middleware/userAuth')

router.use('/user', userRouter)
router.use(validateToken)
router.use('/property', propertyRouter)

module.exports = router