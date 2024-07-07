import React, { useEffect, useRef, useState } from "react";
import Topbar from '../components/Topbar'
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import {Link} from "react-router-dom"
import {  userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const UserListDiv = styled.div``;

const UserListEditDiv = styled.div`
  display: flex;
  align-items: center;
`;
const UserListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #1bab1b;
  color: white;
  cursor: pointer;
`;


const AgentOrders = () => {
    const [data, setData] = useState([])
    const user = useSelector(state => state.user.currentUser) 
    // console.log(user)
    useEffect(() => {
        // console.log(user?.email)
      const getOrders = async() => {
        try {
         const res = await userRequest.post("/order/getAllOrdersByCollectionAgent", {email: user.email})
        // console.log(res.data);
        setData(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      getOrders()
    },[])
  
    const columns = [
      { field: "_id", headerName: "ID", width: 50 },
      {
        field: "name",
        headerName: "User",
        width: 150,
      },
      { field: "email", headerName: "Email", width: 150 },
      {
        field: "contactNumber",
        headerName: "Number",
        width: 100,
      },
      {
        field: "address",
        headerName: "Address",
        width: 120,
      },
      {
        field: "collectionStatus",
        headerName: "Collection Status",
        width: 120,
      },
      {
        field: "collectionAgentStatus",
        headerName: "Agent Status",
        width: 120, 
      },
      {
        field: "collectionAgentDetails",
        headerName: "Agent Details",
        width: 120,
        renderCell: (params) => {
          // console.log(params)
          return params.value?.email
  
        }
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          // console.log(params)
          return (
            <UserListEditDiv>
              <Link to={"/addCollectedMaterial/"+params.row._id}>
                <UserListEditButton>Edit</UserListEditButton>
              </Link>
            </UserListEditDiv>
          );
        },
      },
    ];
    return (
      <div>
          <Topbar/>
          <UserListDiv>
        <DataGrid
          rows={data}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        
      </UserListDiv>
      </div>
  )
}

export default AgentOrders
