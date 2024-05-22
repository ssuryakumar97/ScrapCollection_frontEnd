import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"
import { useEffect, useState } from "react"
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
import { insertAdminNotification, insertUserNotification } from "./redux/notificationRedux"
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client"
import { endpoint } from "./requestMethods"
import { socket } from "./requestMethods"

// var socket;

const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ?
  (<>
    <Outlet />
  </>)
  : (<Navigate to='/login' />)
}


function App() {
  // const [userAthenticated, setUserAuthenticated] = useState(false)
  
  const {currentUser:user, isUserAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
 
  // setUserAuthenticated(user);
  useEffect(() => {
    // socket = io(endpoint)
  
    socket.on("order registration", (data) => {
      console.log(data);
    })
    socket.on("order received", (data) => {
      if(user?.isAdmin){
        console.log(data);
        // dispatch(insertNotification([...notification,data]))
        dispatch(insertAdminNotification(data))
        toast("New order received!");
      }
    })
    socket.on("order assigned",(data) => {
      console.log(data);
      if(user?.email == data?.orderData.email){
        dispatch(insertUserNotification(data))
        toast("New order received!");
      }
    })
  },[socket])
  


  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      {/* <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
            <Route path='/' element={ <Home />} />
      </Route> */}
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/' element={<PrivateRoute isAuthenticated={isUserAuthenticated}/>} >
        <Route path="/collection-request" element={<Collection_request/>} />
      </Route>
      <Route path='/' element={<PrivateRoute isAuthenticated={isUserAuthenticated}/>} >
        <Route path="/orders" element={<Orders/>} />
      </Route>
      <Route path='/' element={<PrivateRoute isAuthenticated={isUserAuthenticated}/>} >
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
