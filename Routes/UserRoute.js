import express from "express";
import { deleteUser, followUser, getAllUsers, getNotifications, getTimelineNotifications, getUser, unfollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get('/user/', getAllUsers)
router.get('/user/:id', getUser)
router.get('/user/:id/notifications', getNotifications)
router.get('/user/:id/timelinenotifications', getTimelineNotifications)
router.put('/user/:id', authMiddleWare, updateUser)
router.put('/user/:id/follow', authMiddleWare, followUser)
router.put('/user/:id/unfollow', authMiddleWare, unfollowUser)
router.delete('/user/:id', authMiddleWare, deleteUser)

export default router;