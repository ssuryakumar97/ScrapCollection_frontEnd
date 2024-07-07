import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const UsersDiv = styled.div`
    flex: 4;
`

const UserListEditDiv = styled.div`
  display: flex;
  align-items: center;
`;

const UserListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #1bab1b;
  color: white;
  cursor: pointer;
`;


const DeleteOutlineIconStyled = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
`;

const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const [editId, setEditId] = useState("")
  const [isAgent, setIsAgent] = useState(false)
  const [updatedUser, setUpdatedUser ] = useState({})

    const adminEmail = useSelector(state =>  state.user.currentUser.email)

    useEffect(() => {
        const getAllUsers = async() => {
            const res = await userRequest.get("/user/getOnlyUsers")
            setUsers(res.data)
        }
        getAllUsers()
    },[updatedUser])

    // console.log(users)

    const handleUpdate = async(id, email) => {
    
      const updateUser = await userRequest.post("/user/updateUsers", {adminEmail: adminEmail, userEmail: email, isAgent})
      // console.log(updateUser.data)
      setUpdatedUser(updateUser.data)
      toast.success(updateUser.data.message)
      setEditId("")
      setIsAgent(false)
    }

    const handleDelete = async(id,email) => {       
        const deletedUser = await userRequest.post("/user/deleteUser", {adminEmail: adminEmail, userEmail: email})
        toast.success(deletedUser.data.message)
        if(deletedUser.data.data.deletedCount == 1) {
          const newData = users.filter((val) => val._id != id)
          setUsers(newData)
        }
    } 

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "Email", width: 150 },
        {
          field: "contactNumber",
          headerName: "Contact Number",
          width: 150,
        },
        {
          field: "isCollectionAgent",
          headerName: "Is Agent",
          width: 100,
          renderCell: (params) => {
            // console.log(params.row.isCollectionAgent)
            return (
              <>
              {
                editId == params.row._id ? <select name="isAgent" onChange={e => setIsAgent(e.target.value)} value={isAgent}>
                <option value="true">True</option>
                <option value="false">False</option>
                </select> : <div>{(params.row.isCollectionAgent).toString().charAt(0).toUpperCase() + (params.row.isCollectionAgent).toString().slice(1) }</div>
              }
              </>
            )
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
                {
                  editId == params.row._id ? <UserListEditButton onClick={() => handleUpdate(params.row._id, params.row.email)}>Update</UserListEditButton> : 
                  <>
                  <UserListEditButton onClick={()=>setEditId(params.row._id)}>Edit</UserListEditButton>
                  <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row._id, params.row.email)}/>
                  </>
                }
                
              </UserListEditDiv>
            );
          },
        },
      ];

  return (
    <UsersDiv>
      <ToastContainer autoClose={2000} />
      <DataGrid
        rows={users}
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
    </UsersDiv>
  )
}

export default AdminUsers
