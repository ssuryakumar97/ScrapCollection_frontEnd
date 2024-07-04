import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Collection_request from "./pages/Collection_request";
import Pricing from "./pages/Pricing";
import Orders from "./pages/Orders";
// import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";
import AdminUsers from "./adminPages/AdminUsers";
import AdminOrders from "./adminPages/AdminOrders";
import AdminOrderAssign from "./adminPages/AdminOrderAssign";
import AdminNotification from "./adminPages/AdminNotification";
import UserNotification from "./pages/UserNotification";
import {
  insertAdminNotification,
  insertUserNotification,
  insertQuotationNotification,
} from "./redux/notificationRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { endpoint } from "./requestMethods";
import { socket } from "./requestMethods";
import Quotation_request from "./pages/Quotation_request";
import AdminQuotationNotification from "./adminPages/AdminQuotationNotification";
import AdminQuotation from "./adminPages/AdminQuotation";
import AdminAllQuotations from "./adminPages/AdminAllQuotations";
import OrderDetails from "./pages/OrderDetails";
import QuotationDetails from "./pages/QuotationDetails";
import AgentOrders from "./pages/AgentOrders";
import AddCollectedMaterials from "./pages/AddCollectedMaterials";
import Quotations from "./pages/Quotations";
import InventoryMaterialsInfo from "./pages/InventoryMaterialsInfo";
import AdminCollectionAgent from "./adminPages/AdminCollectionAgent";


// var socket;

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  // const [userAthenticated, setUserAuthenticated] = useState(false)

  const { currentUser: user, isUserAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  // console.log(user);

  useEffect(()=>{
    // window.location.reload()

  },[user])
  // setUserAuthenticated(user);
  useEffect(() => {
    // socket = io(endpoint)
    // window.location.reload()
    console.log(user);
    // const userData =
    //   localStorage.getItem("persist:root") == null
    //     ? ""
    //     : JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
    //         .currentUser;
    // console.log(userData);
    socket.on("order registration", (data) => {
      console.log(data);
    });
    socket.on("order received", (data) => {
      if (user?.isAdmin) {
        console.log(data);
        // dispatch(insertNotification([...notification,data]))
        dispatch(insertAdminNotification(data));
        toast("New order received!");
      }
    });
    socket.on("new order assigned", (data) => {
      if (user?.email == data?.orderData.email) {
        dispatch(insertUserNotification(data));
        toast("New order received!");
      }
      if (user?.email == data?.agentData.email) {
        dispatch(insertUserNotification(data));
        toast("New order received!");
      }
    });
    socket.on("new quotation received", (data) => {
      if (user?.isAdmin) {
        console.log(data);
        dispatch(insertQuotationNotification(data));
        toast("New quotation received");
      }
    });
    socket.on("quotation updated data",(data) => {
      if(user?.email == data.data.userEmail){
        console.log(data);
        dispatch(insertUserNotification(data.data))
        toast("Your quotation with price details received");
      }
    })
  }, [user, socket]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          {/* <Route path='/' element={<PrivateRoute isAuthenticated={user}/>} >
            <Route path='/' element={ <Home />} />
      </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/quotation-request" element={<Quotation_request />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route
              path="/collection-request"
              element={<Collection_request />}
            />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/quotations" element={<Quotations />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/inventoryMaterials/:id" element={<InventoryMaterialsInfo />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/userNotification" element={<UserNotification />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/orderDetails/:id" element={<OrderDetails />} />
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="/quotationDetails/:id" element={<QuotationDetails />} />
          </Route>

          <Route path="/pricing" element={<Pricing />} />

          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >

          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="collectionAgent" element={<AdminCollectionAgent />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="order/:id" element={<AdminOrderAssign />} />
            <Route path="notification" element={<AdminNotification />} />
            <Route path="quotations" element={<AdminAllQuotations />} />
            <Route
              path="quotationNotification"
              element={<AdminQuotationNotification />}
              />
          <Route path="quotationRequest/:id" element={<AdminQuotation/>} />
          </Route>
        </Route>
        <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
          <Route path="/inventory" element={<Inventory />} />
        </Route>
        <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
          <Route path="/agentOrders" element={<AgentOrders/>}/>
          </Route>
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isUserAuthenticated} />}
          >
          <Route path="/addCollectedMaterial/:id" element={<AddCollectedMaterials/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
