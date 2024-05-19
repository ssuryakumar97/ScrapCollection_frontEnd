import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Timeline, LineStyle, TrendingUp, PersonOutline, Inventory, AssessmentOutlined, CurrencyRupeeOutlined, Mail, Feedback, ChatBubble, Work, Report, Notifications, SupportAgent, ShoppingCart } from "@mui/icons-material";
import {Link, NavLink} from "react-router-dom"
import Badge from '@mui/material/Badge';
// import "../../App.css"
import io from "socket.io-client"
import {insertAdminNotification} from "../redux/notificationRedux"
import {useDispatch, useSelector} from "react-redux"
import { endpoint } from "../requestMethods";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const endpoint = "http://localhost:3000"
// const endpoint = "https://scrapcollection-backend.onrender.com"

var socket
// toast.configure()

const SidebarDiv = styled.div`
  flex: 1;
  /* height: calc(100% - 50px); */
    height: 80%;
  background-color: #fcf8fc;
  position: sticky;
  /* top: 50px; */
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  font-size: 13px;
  color: lightgray;
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
  font-size: 11px;
`;
const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #d5cbd5;
  }
  &.active {
    background-color: #dad2da;
  }
`;

const ActiveLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
`

const AdminSidebar = () => {
  const dispatch = useDispatch()
  const notification =  useSelector((state) => state.notificationReducer.adminNotification)
 console.log(notification);

  useEffect(() => {

    socket = io(endpoint)
  
    socket.on("order registration", (data) => {
      console.log(data);
    })
    socket.on("order received", (data) => {
      console.log(data);
      // dispatch(insertNotification([...notification,data]))
      dispatch(insertAdminNotification(data))
      toast("New order received!");
    })
  },[])

 
 

  return (
    <SidebarDiv>
      <ToastContainer autoClose={3000} position="bottom-right"/>
      <SidebarWrapper>
        <SidebarMenu> 
          <SidebarTitle>Dashboard</SidebarTitle>

          <SidebarList>
            <ActiveLink to="/admin/adminHome">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <LineStyle style={{ marginRight: "5px", fontSize: "20px" }} />
                  Home
                </SidebarListItem>
              )}
            </ActiveLink>

            <SidebarListItem>
              <TrendingUp style={{ marginRight: "5px", fontSize: "20px" }} />
              Sales
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>

          <SidebarList>
            <ActiveLink to="/admin/users">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <PersonOutline
                    style={{ marginRight: "5px", fontSize: "20px" }}
                  />
                  Users
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/collectionAgent">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <SupportAgent
                    style={{ marginRight: "5px", fontSize: "20px" }}
                  />
                  collectionAgent
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/inventory">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <Inventory style={{ marginRight: "5px", fontSize: "20px" }} />
                  Inventory
                </SidebarListItem>
              )}
            </ActiveLink>
            <SidebarListItem>
              <AssessmentOutlined
                style={{ marginRight: "5px", fontSize: "20px" }}
              />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>

          <SidebarList>
            <ActiveLink to="/admin/orders">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                    <ShoppingCart
                      style={{ marginRight: "5px", fontSize: "20px" }}
                    />
                  Orders
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/notification">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <Badge
                    badgeContent={notification?.length}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Notifications
                      style={{ marginRight: "5px", fontSize: "20px" }}
                    />
                  </Badge>
                  Orders Notification
                </SidebarListItem>
              )}
            </ActiveLink>
            <SidebarListItem>
              <Feedback style={{ marginRight: "5px", fontSize: "20px" }} />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <ChatBubble style={{ marginRight: "5px", fontSize: "20px" }} />
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Staff</SidebarTitle>

          <SidebarList>
            <SidebarListItem>
              <Work style={{ marginRight: "5px", fontSize: "20px" }} />
              Manage
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
      
    </SidebarDiv>
  );
};

export default AdminSidebar;
