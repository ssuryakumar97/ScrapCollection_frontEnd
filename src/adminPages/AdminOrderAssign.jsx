import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Upload,
} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom"
import { publicRequest } from "../requestMethods";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client"
import { endpoint } from "../requestMethods";

var socket;

const UserDiv = styled.div`
  flex: 4;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h1``;
const UserAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const UserContainer = styled.div`
  display: flex;
`;
const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
`;
const UserUpdate = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const UserShowBottom = styled.div``;
const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const UserShowUsername = styled.span`
  font-weight: 600;
`;
const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottomTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #c9c5c5;
`;
const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const UserShowInfoTitle = styled.span``;
const PermIdentityIcon = styled(PermIdentity)`
  font-size: 16px !important;
`;
const PhoneAndroidIcon = styled(PhoneAndroid)`
  font-size: 16px !important;
`;
const CalendarTodayIcon = styled(CalendarToday)`
  font-size: 16px !important;
`;
const MailOutlineIcon = styled(MailOutline)`
  font-size: 16px !important;
`;
const LocationSearchingIcon = styled(LocationSearching)`
  font-size: 16px !important;
`;

const UserUpdateTitle = styled.span`
    margin-left: 10px;
    font-weight: bolder;
`;
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        margin-bottom: 10px;
        font-size: 14px;
    }
`;

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`;
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;
const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;
const UserUpdateImgInput = styled.input`
    display: none;
`;

const UserUpdateIcon = styled(Upload)`
    cursor: pointer;
`

const UserUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    margin: 20px 0px;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`

const CollectionDetails = styled.h4`
  margin: 10px 0px;
`

const ErrorDiv = styled.div`
  color: red;
  font-size: 14px;
`

const AssignOrder = () => {
  const [orderData, setOrderData] = useState({})
  const [getagentData, setGetAgentData] = useState(null)
  const [agentDetails, setAgentDetails] = useState("")
  const [error, setError] = useState("")

  const {id} = useParams()
  useEffect(()=>{
    const gerOrder = async() => {
      try {
        const res = await publicRequest.get(`/order/getOrderById/${id}`)
        const agent = await publicRequest.get("/order/getNotAssignedAgent")
        console.log(res.data);
        console.log(agent.data[0]?.email);
        setOrderData(res.data)
        setGetAgentData(agent.data)
        setAgentDetails(agent.data[0].email)
      } catch (error) {
        console.log(error);
      }
    }
    gerOrder()
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(e.target);
    socket = io(endpoint)
    try {
      if(getagentData?.length != 0) {
        const updatedData = await publicRequest.post("/order/agentAssignment", {
          clientId: orderData._id,
          collectionAgentEmail: agentDetails,
        });
        console.log(update.data);
        toast.success(update.data.message)
        const agentResData = updatedData.data;
        console.log(agentResData);
        socket.emit("order assigned",agentResData)
      } else {
        setError("Please assign the agent")
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async(e) => {
    console.log(e.target.value);
    if(getagentData?.length !=0 ) {
      setAgentDetails(e.target.value)
    }
  }
  
  console.log(orderData);
  return (
    <UserDiv>
      <ToastContainer autoClose={3000}/>
      <UserTitleContainer>
        <UserTitle>Assign Agent</UserTitle>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowTopTitle>
              <UserShowUsername>{orderData?.name}</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
            <UserShowInfo>
              <PhoneAndroidIcon />
              <UserShowInfoTitle>{orderData?.contactNumber}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <MailOutlineIcon />
              <UserShowInfoTitle>{orderData?.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <LocationSearchingIcon />
              <UserShowInfoTitle>{orderData?.address}</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <CollectionDetails>Collection Status:</CollectionDetails>
                <div>{orderData?.collectionStatus}</div>
              </UserUpdateItem>
              <UserUpdateItem>
              <CollectionDetails>Collection Agent Status</CollectionDetails>
                <div>{orderData?.collectionAgentStatus}</div>
              </UserUpdateItem>
              <UserUpdateItem>
                <CollectionDetails>Collection Agent Details</CollectionDetails>
                <select name="" id="" onChange={handleChange}>
                  {getagentData?.length !=0 ? getagentData?.map((val, ind) => 
                      
                    (
                      <option key={ind} value={val.email}>{val.email}</option>
                    )
                  
                    
                  ) : (
                    <option>All collection agent's where assigned</option>
                  )}
                </select>
              </UserUpdateItem>
              <UserUpdateButton onClick={handleUpdate}>Update</UserUpdateButton>
              {error && <ErrorDiv>{error}</ErrorDiv>}
            </UserUpdateLeft>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserDiv>
  );
};

export default AssignOrder;
