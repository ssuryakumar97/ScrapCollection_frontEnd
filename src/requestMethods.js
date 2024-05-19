import axios from "axios"

//For API connection
// const base_url = "http://localhost:3000/api"
const base_url = "https://scrapcollection-backend.onrender.com/api"

//For socketio connection
// export const endpoint = "http://localhost:3000" 
export const endpoint = "https://scrapcollection-backend.onrender.com" 

// const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.token

// const token = localStorage.getItem("token")

// console.log(JSON.parse(localStorage.getItem("persist:root")).currentUser)
// console.log(localStorage.getItem("token"))


export const publicRequest = axios.create({
    baseURL: base_url
})

export const userRequest = axios.create({
    baseURL: base_url,
    headers: {
        // "Authorization": `Bearer ${token}`
    }
})

// export const endpoint = "https://scrapcollection-backend.onrender.com"

