const { createUser, getUsers, getUserByID, updateUser } = require('./userController')
const router = require('express').Router()

router.get('/', getUsers)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.patch('/:id', updateUser)

module.exports = router;