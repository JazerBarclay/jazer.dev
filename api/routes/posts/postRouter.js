const { createPost, getPosts, getPostByID, updatePost, deletePost } = require('./postController')
const router = require('express').Router()

const { validate } = require('../../auth/tokenValidation')

router.get('/', getPosts)
router.get('/:id', getPostByID)
router.get('/:id/:slug', getPostByID)
router.put('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router;