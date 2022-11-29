import axios from "axios";

const API = axios.create({baseURL: ""})

const URL = "";

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
  
//     return req;
//   });

export const getTimelinePosts = (id) => API.get(`posts/${id}/timeline`)
export const likePost = (id, userId) => API.put(`posts/${id}/like`, {userId: userId})
export const dislikePost = (id, userId) => API.put(`posts/${id}/like`, {userId: userId})
export const deletePost = (id, userId) => API.delete(`posts/${id}/delete`)
export const commentPost = (id, data) => API.put(`posts/${id}/comment`, data)
export const deleteComment = (postId, commentId) => API.put(`posts/${commentId}/commentdelete`, {postId: postId})

export const getPosts = async () => {
    try {
        return await axios.get(`${URL}/posts`);
    } catch (error) {
        console.log("Error while calling get posts api", error);
    }
}