import React from "react";
import styled from "styled-components";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Upload,
} from "@mui/icons-material";
import {Link} from "react-router-dom"

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

const AssignOrder = () => {
  return (
    <UserDiv>
      <UserTitleContainer>
        <UserTitle>Assign Agent</UserTitle>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowTopTitle>
              <UserShowUsername>Anna</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowBottomTitle>Account Details</UserShowBottomTitle>
            <UserShowInfo>
              <PermIdentityIcon />
              <UserShowInfoTitle>annabeck99</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
            <UserShowInfo>
              <PhoneAndroidIcon />
              <UserShowInfoTitle>+91 92434 49578</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <MailOutlineIcon />
              <UserShowInfoTitle>annabeck99@gmail.com</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <LocationSearchingIcon />
              <UserShowInfoTitle>Chennai | Tamil Nadu</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <CollectionDetails>Collection Status:</CollectionDetails>
                <div>pending</div>
              </UserUpdateItem>
              <UserUpdateItem>
              <CollectionDetails>Collection Agent Status</CollectionDetails>
                <div>notAssigned</div>
              </UserUpdateItem>
              <UserUpdateItem>
                <CollectionDetails>Collection Agent Details</CollectionDetails>
                <UserUpdateInput type="email" placeholder="abc@gmail.com" />
              </UserUpdateItem>
              <UserUpdateButton>Update</UserUpdateButton>
            </UserUpdateLeft>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserDiv>
  );
};

export default AssignOrder;
