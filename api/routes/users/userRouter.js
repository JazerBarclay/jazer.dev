const { createUser, getUsers, getUserByID, updateUser, deleteUser } = require('./userController')
const router = require('express').Router()

router.get('/', getUsers)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;