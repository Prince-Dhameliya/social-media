const express = require("express");
const { bookmarkPost, commentPost, createPost, deleteComment, deletePost, getPost, getAllPosts, getTimelinePosts, getTimelineSavedPosts, likePost, updatePost } = require('../Controllers/PostController.js');

const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.get('/', getAllPosts)
router.put('/:id/like', likePost)
router.put('/:id/bookmark', bookmarkPost)
router.get('/:id/timeline', getTimelinePosts)
router.get('/:id/saved', getTimelineSavedPosts)
router.put('/:id/comment', commentPost)
router.put('/:id/commentdelete', deleteComment)
router.delete('/:id/delete', deletePost)

module.exports = router