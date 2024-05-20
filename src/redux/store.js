import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import notificationReducer from "./notificationRedux";

const store = configureStore({
  reducer:{
    userReducer: userReducer,
    notificationReducer: notificationReducer
  }
})

export default store

 
  

 