import axios from "axios";
const API = axios.create({baseURL: "/"})

export const uploadImage = (data) => API.post('/api/upload', data)
export const uploadPost = (data) => API.post("/api/posts", data)