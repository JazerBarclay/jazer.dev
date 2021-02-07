const { createPost, getPosts, getPostBySlug, updatePost, deletePost } = require('./postController')
const router = require('express').Router()

const { validate } = require('../../auth/tokenValidation')
const { isAdmin } = require('../../auth/adminValidation')

router.get('/', validate, getPosts)
router.get('/:slug', validate, getPostBySlug)
router.put('/', validate, isAdmin, createPost)
router.patch('/:slug', validate, isAdmin, updatePost)
router.delete('/:slug', validate, isAdmin, deletePost)

module.exports = router;