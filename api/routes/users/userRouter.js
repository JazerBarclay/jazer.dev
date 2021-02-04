const { createUser, getUsers, getUserByID, updateUser, deleteUser, login } = require('./userController')
const router = require('express').Router()

router.get('/', getUsers)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', login)

module.exports = router;