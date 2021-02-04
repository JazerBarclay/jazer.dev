const { getUsers } = require('./userController')
const router = require('express').Router()

router.get('/', getUsers)

module.exports = router;