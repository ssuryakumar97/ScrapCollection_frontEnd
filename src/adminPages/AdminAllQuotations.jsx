import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import { userRequest } from '../requestMethods';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const QuotationsDiv = styled.div`
    flex:4;
`
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

const AdminAllQuotations = () => {
    const [quoteData, setQuoteData] = useState([])

    useEffect(() => {
        const getAllQuotationData = async() => {
           const res = await userRequest.get("/quote/getAllQuotations")
          //  console.log(res.data)
           setQuoteData(res.data.data)
        }
        getAllQuotationData()
    },[])

    const handleDelete = async(id) => {
        const deletedResponse = await userRequest.delete(`/quote/deleteQuoteById/${id}`)
        // console.log(deletedResponse)
        if(deletedResponse.data.data.deletedCount === 1){
          toast.success("Data deleted successfully")
        } else {
          toast.error("Something went wrong")
        }
      setQuoteData(quoteData.filter(val => val._id !== id))
      }

    // console.log(quoteData)

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        { field: "userEmail", headerName: "Email", width: 150 },
        {
          field: "status",
          headerName: "Quotation Status",
          width: 150,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            // console.log(params)
            return (
              <UserListEditDiv>
                <Link to={"/admin/quotationRequest/"+params.row._id}>
                  <UserListEditButton>Edit</UserListEditButton>
                </Link>
                <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row._id)}/>
              </UserListEditDiv>
            );
          },
        },
      ];

  return (
    <QuotationsDiv>
        {/* <div>hello</div> */}
        <ToastContainer autoClose={2000}/>
      <DataGrid
        rows={quoteData}
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
    </QuotationsDiv>
  )
}

export default AdminAllQuotations
