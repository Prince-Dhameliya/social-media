import axios from "axios";

const API = axios.create({baseURL: "/"})

export const getAllPosts = () => API.get(`/api/posts`)
export const likePost = (id, userId) => API.put(`/api/posts/${id}/like`, {userId: userId})
export const dislikePost = (id, userId) => API.put(`/api/posts/${id}/like`, {userId: userId})
export const bookmarkPost = (id, userId) => API.put(`/api/posts/${id}/bookmark`, {userId: userId})
export const unbookmarkPost = (id, userId) => API.put(`/api/posts/${id}/bookmark`, {userId: userId})
export const getTimelinePosts = (id) => API.get(`/api/posts/${id}/timeline`)
export const getTimelineSavedPosts = (id) => API.get(`/api/posts/${id}/saved`)
export const commentPost = (id, data) => API.put(`/api/posts/${id}/comment`, data)
export const deleteComment = (userId, postId, commentId) => API.put(`/api/posts/${commentId}/commentdelete`, {postId: postId,userId: userId})
export const deletePost = (id, userId) => API.delete(`/api/posts/${id}/delete`)