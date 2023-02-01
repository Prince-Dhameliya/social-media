import express from 'express';
import { bookmarkPost, commentPost, createPost, deleteComment, deletePost, getPost, getAllPosts, getTimelinePosts, getTimelineSavedPosts, likePost, updatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/posts', createPost)
router.get('/posts/:id', getPost)
router.put('/posts/:id', updatePost)
router.get('/posts', getAllPosts)
router.put('/posts/:id/like', likePost)
router.put('/posts/:id/bookmark', bookmarkPost)
router.get('/posts/:id/timeline', getTimelinePosts)
router.get('/posts/:id/saved', getTimelineSavedPosts)
router.put('/posts/:id/comment', commentPost)
router.put('/posts/:id/commentdelete', deleteComment)
router.delete('/posts/:id/delete', deletePost)

export default router