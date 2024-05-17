import React from 'react'
import Topbar from '../components/Topbar'
import AdminSidebar from "../adminComponents/AdminSidebar"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'


import styled from 'styled-components'

const MainAdminDiv = styled.div`
  display: flex;
`

const Admin = () => {
  return (
    <div>
        <Topbar/>
        <MainAdminDiv>

        <AdminSidebar/>
        {/* <AdminHome/> */}
        <Outlet/>
        </MainAdminDiv>
    </div>
  )
}

export default Admin
