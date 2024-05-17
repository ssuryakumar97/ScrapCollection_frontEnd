import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { userRequest } from '../requestMethods.js'
import axios from 'axios'
import styled from 'styled-components'

const Image = styled.img`
  width: 40vw;
  height: 80%;
`

const HomeDivContainer = styled.div`
  display: flex;
  align-items: center;
`

const LeftDiv = styled.div`
  flex: 1;
  margin: auto;
`
const RightDiv = styled.div`
  flex: 1;
  margin: 10px auto;
`

const Home = () => {

  const [allUser, setAllUser] = useState([])

  // useEffect(() => {
  //   const getAllUsers = async() => {
  //     // const token =await JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.token
  //     // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.name);
  //     try {
  //       const res = await userRequest.get("/user/getAllUser")
  //       setAllUser(res.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getAllUsers()
  // } ,[])


  return (
    <div>
      <Topbar/>
     <HomeDivContainer>
      <LeftDiv><Image src="recycling_images.jpg" alt="Home page image" /></LeftDiv>
      <RightDiv><h1>Sell your scrap at best price</h1></RightDiv>
     </HomeDivContainer>
    </div>
  )
}

export default Home
