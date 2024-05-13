import { useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"
import { useState } from "react"

const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ?
  (<>
    <Outlet />
  </>)
  : (<Navigate to='/login' />)
}


function App() {
  // const [userAthenticated, setUserAuthenticated] = useState(false)
  
  const user = useSelector((state) => state.isUserAuthenticated)
  // setUserAuthenticated(user);


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
            <Route path='/' element={ <Home />} />
      </Route>
      {/* <Route path="/" element={<Home/>} /> */}
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
