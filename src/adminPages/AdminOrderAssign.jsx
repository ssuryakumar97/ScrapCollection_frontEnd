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
import { useNavigate, useParams} from "react-router-dom"
import { userRequest } from "../requestMethods";
import {ToastContainer, toast } from "react-toastify";


import { socket } from "../requestMethods";

// var socket;

const UserDiv = styled.div`
  flex: 4;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h1``;


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

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const UserShowUsername = styled.span`
  font-weight: 600;
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

const PhoneAndroidIcon = styled(PhoneAndroid)`
  font-size: 16px !important;
`;

const MailOutlineIcon = styled(MailOutline)`
  font-size: 16px !important;
`;
const LocationSearchingIcon = styled(LocationSearching)`
  font-size: 16px !important;
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

const UserUpdateButton = styled.button`
    &.normal_button{border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: pointer;}
    &.disabled_button{border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: #a1a1be;
    color: white;
    font-weight: 600;
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: not-allowed;}
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
  const [disableButton, setDisableButton] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(()=>{
    const gerOrder = async() => {
      try {
        const res = await userRequest.get(`/order/getOrderById/${id}`)
        const agent = await userRequest.get("/order/getNotAssignedAgent")
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
    // console.log(e.target);
    // socket = io(endpoint)
    try {
      setDisableButton(val => !val)
      if(getagentData?.length != 0) {
        const updatedData = await userRequest.post("/order/agentAssignment", {
          clientId: orderData._id,
          collectionAgentEmail: agentDetails,
        });
        const agentResData = updatedData.data;
        // console.log(agentResData)
        socket.emit("order assigned",agentResData)
        toast.success(agentResData.message)
        await new Promise(resolve => setTimeout(resolve,2000))
        setDisableButton(val => !val)
        if(agentResData.message === "Updated successfully"){
          navigate("/admin/orders")
        }
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
              <UserUpdateButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleUpdate}>Update</UserUpdateButton>
              {error && <ErrorDiv>{error}</ErrorDiv>}
            </UserUpdateLeft>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserDiv>
  );
};

export default AssignOrder;
