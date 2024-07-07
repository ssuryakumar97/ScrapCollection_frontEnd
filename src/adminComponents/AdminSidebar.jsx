import React  from "react";
import styled from "styled-components";
import {  PersonOutline, Inventory,  Notifications, SupportAgent, ShoppingCart, RequestQuote } from "@mui/icons-material";
import {NavLink} from "react-router-dom"
import Badge from '@mui/material/Badge';

import { useSelector} from "react-redux"
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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
  font-size: 13px;
  margin-bottom: 5px;
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
  const {adminNotification, quotationNotification} =  useSelector((state) => state.notification)
//  console.log(notification);
 

  return (
    <SidebarDiv>
      <ToastContainer autoClose={3000} position="bottom-right"/>
      <SidebarWrapper>

          
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>

          <SidebarList>
            <ActiveLink to="/admin/users">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <PersonOutline
                    style={{ marginRight: "5px", fontSize: "24px" }}
                  />
                  Users
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/collectionAgent">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <SupportAgent
                    style={{ marginRight: "5px", fontSize: "24px" }}
                  />
                  collectionAgent
                </SidebarListItem>
              )}
            </ActiveLink>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>

          <SidebarList>
            <ActiveLink to="/admin/orders">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                    <ShoppingCart
                      style={{ marginRight: "5px", fontSize: "24px" }}
                    />
                  Orders
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/notification">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <Badge
                    badgeContent={adminNotification?.length}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Notifications
                      style={{ marginRight: "5px", fontSize: "24px" }}
                    />
                  </Badge>
                  Orders Notification
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/quotations">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                    <RequestQuote
                      style={{ marginRight: "5px", fontSize: "24px" }}
                    />
                  Quotations
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/quotationNotification">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                  <Badge
                    badgeContent={quotationNotification?.length}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Notifications
                      style={{ marginRight: "5px", fontSize: "24px" }}
                    />
                  </Badge>
                  Quotation Notification
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/materials">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                    <Inventory
                      style={{ marginRight: "5px", fontSize: "24px" }}
                    />
                  Materials
                </SidebarListItem>
              )}
            </ActiveLink>
            <ActiveLink to="/admin/material">
              {({ isActive }) => (
                <SidebarListItem className={isActive ? "active" : ""}>
                    <Inventory
                      style={{ marginRight: "5px", fontSize: "20px" }}
                    />
                  Create Material
                </SidebarListItem>
              )}
            </ActiveLink>
          </SidebarList>
        </SidebarMenu>
       
      </SidebarWrapper>
      
    </SidebarDiv>
  );
};

export default AdminSidebar;
