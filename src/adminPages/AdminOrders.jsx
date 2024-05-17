import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { orderRows } from "../dummyData";
import {Link} from "react-router-dom"
import { publicRequest } from "../requestMethods";
import io from "socket.io-client"

const endpoint = "http://localhost:3000"

var socket

const UserListDiv = styled.div`
  flex: 4;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

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

const DeleteOutlineIconStyled = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
`;




const AdminOrders = () => {
  // const [data, setData] = useState(orderRows)
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false)

  const handleDelete = (id) => {
  setData(data.filter(val => val._id !== _id))
}

const socketRef = useRef(null)

useEffect(() => {
  const getOrders = async() => {
    try {
     const res = await publicRequest.get("/order/getAllOrders")
    // console.log(res.data);
    setData(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  getOrders()
},[])

useEffect(() => {

  socketRef.current = io(endpoint)
  const socket = socketRef.current

  socket.on("order registration", (data) => {
    console.log(data);
  })
  socket.on("new order", (data) => {
    console.log(data);
  })
  socket.on("order received", (data) => {
    console.log(data);
  })
  socket.on("message", (data) => {
    console.log(data);
  })
},[])

function getRowId(row) {
  return row.internalId;
}

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
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UserListEditDiv>
            <Link to={"/admin/orders/"+params.row.id}>
              <UserListEditButton>Edit</UserListEditButton>
            </Link>
            <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row.id)}/>
          </UserListEditDiv>
        );
      },
    },
  ];
  return (
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
  );
};

export default AdminOrders;
