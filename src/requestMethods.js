import axios from "axios"
import { io } from "socket.io-client"
// import { endpoint } from "./requestMethods"

//For API connection
// const base_url = "http://localhost:3000/api"
const base_url = "https://scrapcollection-backend.onrender.com/api"

//For socketio connection
// export const endpoint = "http://localhost:3000" 
export const endpoint = "https://scrapcollection-backend.onrender.com" 
export const socket = io(endpoint)

// const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.token

// const token = localStorage.getItem("token")

// console.log(JSON.parse(localStorage.getItem("persist:root")).currentUser)


export const publicRequest = axios.create({
    baseURL: base_url
})

export const userRequest = axios.create({
    baseURL: base_url,
    headers: {
        // "Authorization": `Bearer ${token}`
    }
})


