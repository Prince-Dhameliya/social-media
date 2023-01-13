import express from "express";
import { deleteUser, followUser, getAllUsers, getNotifications, getTimelineNotifications, getUser, unfollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/:id/notifications', getNotifications)
router.get('/:id/timelinenotifications', getTimelineNotifications)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unfollow', authMiddleWare, unfollowUser)

export default router;