import React, { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client"
import { endpoint } from '../requestMethods'
import { socket } from '../requestMethods'

// const endpoint = "http://localhost:3000"

// var socket

// toast.configure();

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const Collection_request = () => {

  const [name, setName]=useState("")
  const [contactNumber, setContactNumber]=useState("")
  const [address, setAddress]=useState("")
  const [disabled, setDisabled] = useState(false)

  const email= useSelector((state) => state.user.currentUser.email)

  // useEffect(() => {
  //   // socket = io(endpoint)
  
  //   socket.on("order registration", (data) => {
  //     console.log(data);
  //   })
  // },[])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setDisabled((state) => !state)
      const response = await publicRequest.post("/order/registerOrder",{name, email, contactNumber, address} )
      const resData = response.data.data
      toast.success(response.data.message)
      console.log(resData)
      socket.emit("new order", resData)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      // alert(response.data.message)
      setDisabled((state) => !state)
      setName("")
      setAddress("")
      setContactNumber("")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setDisabled((state) => !state)
    }
    
  }

  
  return (
    <div>
        <Topbar/>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <label htmlFor="">Contact Number</label>
        <input type="text" onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} required/>
        <label htmlFor="">Address</label>
        <textarea rows={10} cols={40} onChange={(e) => setAddress(e.target.value)} value={address} required/>
        <button disabled={disabled}>Submit</button>
      </Form>
      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default Collection_request
