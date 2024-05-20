import { useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"
import { useState } from "react"
import Collection_request from "./pages/Collection_request"
import Pricing from "./pages/Pricing"
import Orders from "./pages/Orders"
import AboutUs from "./pages/AboutUs"
import Admin from "./pages/Admin"
import Inventory from "./pages/Inventory"
import AdminHome from "./adminPages/AdminHome"
import AdminOrders from "./adminPages/AdminOrders"
import AdminOrderAssign from "./adminPages/AdminOrderAssign"
import AdminNotification from "./adminPages/AdminNotification"
import UserNotification from "./pages/UserNotification"

const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ?
  (<>
    <Outlet />
  </>)
  : (<Navigate to='/login' />)
}


function App() {
  // const [userAthenticated, setUserAuthenticated] = useState(false)
  
  const user = useSelector((state) => state.user.isUserAuthenticated)
 
  // setUserAuthenticated(user);

  


  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
            <Route path='/' element={ <Home />} />
      </Route> */}
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
        <Route path="/collection-request" element={<Collection_request/>} />
      </Route>
      <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
        <Route path="/orders" element={<Orders/>} />
      </Route>
      <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
        <Route path="/userNotification" element={<UserNotification/>} />
      </Route>
      
      <Route path="/pricing" element={<Pricing/>} />
      
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/admin" element={<Admin/>} >
        <Route path="adminHome" element={<AdminHome/>} />
        <Route path="orders" element={<AdminOrders/>} />
        <Route path="order/:id" element={<AdminOrderAssign/>} />
        <Route path="notification" element={<AdminNotification/>} />
      </Route>
      <Route path="/inventory" element={<Inventory/>} />
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
