import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const getTimelinePosts = (id) => API.get(`posts/${id}/timeline`)
export const likePost = (id, userId) => API.put(`posts/${id}/like`, {userId: userId})
export const dislikePost = (id, userId) => API.put(`posts/${id}/like`, {userId: userId})
export const deletePost = (id, userId) => API.delete(`posts/${id}/delete`)
export const commentPost = (id, data) => API.put(`posts/${id}/comment`, data)
export const deleteComment = (postId, commentId) => API.put(`posts/${commentId}/commentdelete`, {postId: postId})