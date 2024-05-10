import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { logout } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const Topbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollectionAgent, setIsCollectionAgent] = useState(false);
  const [userData, setUserData] = useState({});

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        // const getUserResponse = await userRequest.get("/user/getUser")
        const token =await JSON.parse(
          JSON.parse(localStorage.getItem("persist:root")).currentUser
        )?.token;
        console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.name);
        const getUserResponse = await userRequest.get("/user/getUser");
        console.log(getUserResponse.data);
        const res = getUserResponse.data;
        console.log(res);
        setUserData(res);
        console.log(userData);
        // setIsAdmin(() => getUserResponse.data.isAdmin)
        // console.log(isAdmin);
        // setIsCollectionAgent(() => getUserResponse.data.isCollectionAgent)
        // console.log(isCollectionAgent);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const user = useSelector((state) => state.currentUser);
  console.log(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // localStorage.removeItem("token")
    navigate("/login");
  };

  return (
    <TopbarContainer>
      <div>Home</div>
      {/* {isAdmin && (<> <div>Admin</div> 
      <div>Inventory</div></>)}
      {isCollectionAgent && (<div>Inventory</div>)} */}
      {/* {user.isAdmin && (<> <div>Admin</div> 
      <div>Inventory</div></>)}
      {user.isCollectionAgent && (<div>Inventory</div>)} */}
      {userData.isAdmin && (
        <>
          {" "}
          <div>Admin</div>
          <div>Inventory</div>
        </>
      )}
      {userData.isCollectionAgent && <div>Inventory</div>}
      <div>Pricing</div>
      <div>Collection Request</div>
      <div>Orders</div>
      <div>About</div>
      <button onClick={handleLogout}>Logout</button>
    </TopbarContainer>
  );
};

export default Topbar;
