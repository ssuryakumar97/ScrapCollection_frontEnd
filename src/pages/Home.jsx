import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { userRequest } from '../requestMethods.js'
import axios from 'axios'

const Home = () => {

  const [allUser, setAllUser] = useState([])

  useEffect(() => {
    const getAllUsers = async() => {
      const token =await JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.token
      console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.name);
      try {
        const res = await userRequest.get("/user/getAllUser")
        setAllUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers()
  } ,[])


  return (
    <div>
      <Topbar/>
      {allUser && allUser.map((value) => (
        <div style={{border: "1px solid black", margin: "10px"}} key={value._id}>
        <div>{value.name}</div>
        <div>{value.email}</div>
        <div>{value.isAdmin}</div>
        <div>{value.isCollectionAgent}</div>
        </div>
      ))}
    </div>
  )
}

export default Home
