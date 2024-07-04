import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { logout } from "../redux/userRedux";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications"
import Badge from '@mui/material/Badge';
import { io } from "socket.io-client";
import { endpoint } from "../requestMethods";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { insertUserNotification } from "../redux/notificationRedux";

var socket;

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: sticky;
  top: 0;
  background-color: #6200EE;
  color: white;
  width: 100%;
  height: 40px;
  z-index: 1;
`;

const LinkItem = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const LeftDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Image = styled.img`
  width: 30px;
  margin-left: 10px;
  border-radius: 2px;
`;

const RightDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-right: 50px;
`;

const SidebarDiv = styled.div`
  padding: 10px;
  &:hover {
    background-color: #eae6e6;
    color: black
  }
  &.active {
    background-color: #eae6e6;
    color: black;
  }
`;

const DropDownMenu = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`;

const DropDownList = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  padding: 0;
  width: 150px;
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  opacity: 1;
  background-color: white;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 35px;
    height: 10px;
    width: 10px;
    transform: rotate(45deg);
    border-top: solid 1px lightgray;
    border-left: solid 1px lightgray;
    background-color: white;
    cursor: pointer;
  }
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
    color: black;
  }
`;

const StyledNotificationsIcon = styled(NotificationsIcon)`
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
    color: black;
  }
`;

const UnorderedList = styled.ul`
  padding: 0px;
  margin: 0px;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 10px;
  text-align: center;
  color: black;
  border: solid 1px lightgrey;
  &:nth-child(1) {
    border-radius: 5px 5px 0 0;
  }
  &:nth-child(3) {
    border-radius: 0 0 5px 5px;
  }
  &:hover {
    background-color: #eae6e6;
    cursor: pointer;
  }
`;

const Topbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [notificationdropDown, setNotificationDropDown] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const expiryTime = useSelector((state) => state.user.expiry);
  const userNotification = useSelector((state) => state.notification.userNotification)
  // console.log(userNotification)
  // console.log(expiryTime);

  useEffect(() => {
    if(expiryTime < Date.now() && user != null){
      dispatch(logout());
      // window.location.reload();
    }
  },[])

  const menuRef = useRef();
  // const user = JSON.parse(localStorage.getItem("currentUser"))
  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    let handler = (event) => {
      
      if (!menuRef.current?.contains(event.target)) {
        setDropDown(false);
      }
    };

    window.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, []);

  // useEffect(()=> {
  //   socket = io(endpoint);
  //   console.log(user)

  //   socket.on("order assigned",(data) => {
  //     console.log(data);
  //     if(user.email == data.orderData.email){
  //       dispatch(insertUserNotification(data))
  //       toast("New order received!");
  //     }
  //   })
  // },[])

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       // const getUserResponse = await userRequest.get("/user/getUser")

  //       // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.name);
  //       // const getUserResponse = await userRequest.get("/user/getUser");
  //       // console.log(getUserResponse.data);
  //       // const res = getUserResponse.data;
  //       // console.log(res);
  //       // setUserData(res);
  //       // console.log(userData);
  //       // setIsAdmin(() => getUserResponse.data.isAdmin)
  //       // console.log(isAdmin);
  //       // setIsCollectionAgent(() => getUserResponse.data.isCollectionAgent)
  //       // console.log(isCollectionAgent);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, []);

  // console.log(userData);

  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
     localStorage.removeItem("persist:root");
    //  localStorage.clear()
    navigate("/login");
    window.location.reload()
  };

  const handleLogin = () => {
    localStorage.removeItem("persist:root");
    // dispatch(logout());
    navigate("/login");
    window.location.reload()
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleQuotations = () => {
    navigate("/quotations")
  }

  return (
    <TopbarContainer>
      <LeftDiv>
        <img href="" src="" alt="" />
        <Image src="/images_c.jpeg" alt="logo" />
        <h1>EULER</h1>
        <div>Scrap Collection</div>
      </LeftDiv>
      <RightDiv>
        <LinkItem to="/">
          {({ isActive }) => (
            <SidebarDiv className={isActive ? "active" : ""}>Home</SidebarDiv>
          )}
        </LinkItem>

        {user?.isAdmin && (
          <>
            <LinkItem to="/admin/users">
              {({ isActive }) => (
                <SidebarDiv className={isActive ? "active" : ""}>
                  Admin
                </SidebarDiv>
              )}
            </LinkItem>

            <LinkItem to="/inventory">
              {({ isActive }) => (
                <SidebarDiv className={isActive ? "active" : ""}>
                  Inventory
                </SidebarDiv>
              )}
            </LinkItem>
          </>
        )}
        {user?.isCollectionAgent && (
          <>
            <LinkItem to="/inventory">
              {({ isActive }) => (
                <SidebarDiv className={isActive ? "active" : ""}>
                  Inventory
                </SidebarDiv>
              )}
            </LinkItem>
            <LinkItem to="/agentOrders">
              {({ isActive }) => (
                <SidebarDiv className={isActive ? "active" : ""}>
                  Orders
                </SidebarDiv>
              )}
            </LinkItem>
          </>
        )}

        <LinkItem to="/pricing">
          {({ isActive }) => (
            <SidebarDiv className={isActive ? "active" : ""}>
              Pricing
            </SidebarDiv>
          )}
        </LinkItem>

{(!user?.isCollectionAgent && !user?.isAdmin) &&
        (
        <>
        <LinkItem to="/quotation-request">
          {({ isActive }) => (
            <SidebarDiv className={isActive ? "active" : ""}>
              Quotation Request
            </SidebarDiv>
          )}
        </LinkItem>

        <LinkItem to="/collection-request">
          {({ isActive }) => (
            <SidebarDiv className={isActive ? "active" : ""}>
              Collection Request
            </SidebarDiv>
          )}
        </LinkItem>
        </>)
}

        

        <DropDownMenu ref={menuRef}>
          <StyledAccountCircleIcon
            onClick={() => setDropDown((prev) => !prev)}
          />
          {dropDown && (
            <DropDownList>
              <UnorderedList>
              {(!user?.isCollectionAgent && !user?.isAdmin) && ( 
                <>
                <ListItem onClick={handleOrders}>Orders</ListItem>
                <ListItem onClick={handleQuotations}>Quotations</ListItem>
                </>
              )}
                <ListItem onClick={handleLogin}>Login</ListItem>
                <ListItem onClick={handleLogout}>Logout</ListItem>
              </UnorderedList>
            </DropDownList>
          )}
        </DropDownMenu>
        <LinkItem to="/userNotification">
          {({ isActive }) => (
            <Badge badgeContent={userNotification.length} color="success">
              <StyledNotificationsIcon className={isActive ? "active" : ""}/>
            </Badge>
          )}
        </LinkItem>
      </RightDiv>
    </TopbarContainer>
  );
};

export default Topbar;
