import express from 'express';
import { commentPost, createPost, deleteComment, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.put('/:id/comment', commentPost)
router.put('/:id/commentdelete', deleteComment)

export default router