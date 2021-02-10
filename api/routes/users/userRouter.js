const { createUser, getUsers, getUserByID, updateUser, deleteUser, login } = require('./userController')
const router = require('express').Router()

const { validate } = require('../../auth/tokenValidation')
const { isAdmin } = require('../../auth/adminValidation')

router.get('/', validate, isAdmin, getUsers)
router.get('/:id', validate, isAdmin, getUserByID)
router.put('/', validate, isAdmin, createUser)
router.patch('/:id', validate, isAdmin, updateUser)
router.delete('/:id', validate, isAdmin, deleteUser)
router.post('/login', validate, login)

module.exports = router;