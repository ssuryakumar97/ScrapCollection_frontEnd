import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { logout } from "../redux/userRedux";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  position: sticky;
  top: 0;
  background-color: violet;
  width: 100%;
  height: 40px;
`;

const LinkItem = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const LeftDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Image = styled.img`
  width: 30px;
 margin-left: 10px ;
 border-radius: 2px;
`

const RightDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding-right: 50px;
`;

const SidebarDiv = styled.div`
  padding: 10px;
  &:hover{
    background-color: #eae6e6;
  }
  &.active{
    background-color: #eae6e6;
  }
`

const DropDownMenu = styled.div`
  display: flex;
  align-items: center;
`

const DropDownList = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  padding: 0;
  width: 100px;
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

  const user = useSelector((state) => state.currentUser);

  const menuRef = useRef()
  // const user = JSON.parse(localStorage.getItem("currentUser"))
  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    let handler = (event) => {
      if(!menuRef.current?.contains(event.target)){
        setDropDown(false)
      }
    }

    window.addEventListener("mousedown", handler)

    return () => {
      window.removeEventListener("mousedown", handler)
    }
  },[])

  

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
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  

  return (
    <TopbarContainer>
      <LeftDiv>
        <img href="" src="" alt="" />
        <Image src="/public/images_c.jpeg" alt="logo" />
        <h1>EULER</h1><div>Scrap Collection</div>
      </LeftDiv>
      <RightDiv>
        
          <LinkItem to="/">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Home</SidebarDiv>)}</LinkItem>
        
        {user?.isAdmin && (
          <>
            
              <LinkItem to="/admin">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Admin</SidebarDiv>)}</LinkItem>
            
            
              <LinkItem to="/inventory">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Inventory</SidebarDiv>)}</LinkItem>
            
          </>
        )}
        {user?.isCollectionAgent && (
          <>
            <LinkItem to="/inventory">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Inventory</SidebarDiv>)}</LinkItem>
          </>
        )}
        
          <LinkItem to="/pricing">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Pricing</SidebarDiv>)}</LinkItem>
        
        
          <LinkItem to="/collection-request">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>Collection Request</SidebarDiv>)}</LinkItem>
       
          <LinkItem to="/about">{({isActive}) => (<SidebarDiv className={isActive ? "active" : ""}>About</SidebarDiv>)}</LinkItem>
        
        <DropDownMenu ref={menuRef}>
        <StyledAccountCircleIcon onClick={() => setDropDown((prev) => !prev)} />
        {dropDown && (
          <DropDownList >
            <UnorderedList>
              <ListItem onClick={handleOrders}>Orders</ListItem>
              <ListItem onClick={handleLogin}>Login</ListItem>
              <ListItem onClick={handleLogout}>Logout</ListItem>
            </UnorderedList>
          </DropDownList>
        )}
        </DropDownMenu>
      </RightDiv>
    </TopbarContainer>
  );
};

export default Topbar;
