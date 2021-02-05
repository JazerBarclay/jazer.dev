const { createUser, getUsers, getUserByID, updateUser, deleteUser, login } = require('./userController')
const router = require('express').Router()

const { validate } = require('../../auth/tokenValidation')

router.get('/', validate, getUsers)
router.get('/:id', validate, getUserByID)
router.put('/', validate, createUser)
router.patch('/:id', validate, updateUser)
router.delete('/:id', validate, deleteUser)
router.post('/login', login)

module.exports = router;