import axios from "axios";
const API = axios.create({baseURL: "http://localhost:5000/"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = JSON.stringify(localStorage.getItem("profile").token);
    }
    return req
})

export const getAllUser = () => API.get('/api/user')
export const getUser = (userId) => API.get(`/api/user/${userId}`)
export const getNotifications = (id) => API.get(`/api/user/${id}/notifications`,{userId : `${id}`})
export const getTimelineNotifications = (id) => API.get(`/api/user/${id}/timelinenotifications`)
export const updateUser = (id, formData) => API.put(`/api/user/${id}`, formData)
export const followUser = (id, data) => API.put(`/api/user/${id}/follow`, data)
export const unFollowUser = (id, data) => API.put(`/api/user/${id}/unfollow`, data)
export const deleteUser = (id, data) => API.delete(`/api/user/${id}`, {data})