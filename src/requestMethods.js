import axios from "axios"

const base_url = "http://localhost:3000/api"


const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.token

// const token = localStorage.getItem("token")

// console.log(JSON.parse(localStorage.getItem("persist:root")).currentUser)
// console.log(localStorage.getItem("token"))


export const publicRequest = axios.create({
    baseURL: base_url
})

export const userRequest = axios.create({
    baseURL: base_url,
    headers: {
        "Authorization": `Bearer ${token}`
    }
})