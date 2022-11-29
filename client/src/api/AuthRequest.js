import axios from "axios";
const API = axios.create({baseURL: ""})

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)

    // "client-install": "cd client && npm install",
    // "client-build": "cd client && npm run build",
    // "heroku-postbuild": "npm run client-install && npm run client-build",