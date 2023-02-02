import axios from "axios";
const API = axios.create({baseURL: "/"})

export const logIn = (formData) => API.post('/api/auth/login', formData)
export const signUp = (formData) => API.post('/api/auth/register', formData)