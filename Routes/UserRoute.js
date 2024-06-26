const express = require("express");
const { deleteUser, followUser, getAllUsers, getNotifications, getTimelineNotifications, getUser, unfollowUser, updateUser } = require("../Controllers/UserController.js");
const authMiddleWare = require("../MiddleWare/authMiddleWare.js");

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/:id/notifications', getNotifications)
router.get('/:id/timelinenotifications', getTimelineNotifications)
router.put('/:id', authMiddleWare, updateUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unfollow', authMiddleWare, unfollowUser)
router.delete('/:id', authMiddleWare, deleteUser)

module.exports = router