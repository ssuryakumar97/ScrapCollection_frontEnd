import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { endpoint, userRequest } from '../requestMethods'
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminMaterialsDiv = styled.div`
    flex: 4;
`

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductListEditDiv = styled.div`
  display: flex;
  align-items: center;
`;
const ProductListEditButton = styled.button`
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

const AdminMaterials = () => {
    const [materials, setMaterials] = useState([])
    const [deletedData, setDeletedData] = useState()

    useEffect(() => {
        const getMaterialData = async() => {
            const res = await userRequest.get("/material/getAllMaterials")
            setMaterials(res.data)
        }
        getMaterialData()
    },[deletedData])

    // console.log(materials)

    const handleDelete = async(val)=>{
        try {
            const deleteData = await userRequest.delete(`/material/deleteMaterialById/${val._id}`)
            setDeletedData(deleteData.data)
            toast.success("Data deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
          field: "title",
          headerName: "Product",
          width: 180,
          renderCell: (params) => {
            return (
              <ProductListItem>
                <ProductListImg src={`${endpoint}/api/image/download/${params.row.image}`} alt="Product Image" />
                {params.row.title}
              </ProductListItem>
            );
          },
        },
        {
          field: "price",
          headerName: "Price",
          width: 120,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <ProductListEditDiv>
                <Link to={"/admin/materialEdit/"+params.row._id}>
                  <ProductListEditButton>Edit</ProductListEditButton>
                </Link>
                <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row)}/>
              </ProductListEditDiv>
            );
          },
        },
      ];
  return (
    <AdminMaterialsDiv>
      <ToastContainer autoClose={2000} />
          <DataGrid
            rows={materials}
            getRowId={(val)=>val._id}
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
    </AdminMaterialsDiv>
  )
}

export default AdminMaterials
