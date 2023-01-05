import express from 'express';
import { bookmarkPost, commentPost, createPost, deleteComment, deletePost, getPost, getPosts, getTimelinePosts, getTimelineSavedPosts, likePost, updatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)
router.get('/', getPosts)
router.put('/:id', updatePost)
router.delete('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.put('/:id/bookmark', bookmarkPost)
router.get('/:id/timeline', getTimelinePosts)
router.get('/:id/saved', getTimelineSavedPosts)
router.put('/:id/comment', commentPost)
router.put('/:id/commentdelete', deleteComment)

export default router