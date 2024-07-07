import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { endpoint, userRequest } from '../requestMethods'
import { socket } from '../requestMethods'
import { ToastContainer, toast } from 'react-toastify'

const QuotationDiv = styled.div`
    flex:4;
`
const TableImage = styled.img`
  width: 50px;
  height: 50px;
`
const SubmitButton = styled.button`
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

const AdminQuotation = () => {

const [quotationData, setQuotationData] = useState(null)
const [editId, setEditId] = useState(-1)
const [disableButton , setDisableButton] = useState(false)
  const {id} = useParams()

useEffect(()=>{
  const getQuote = async() => {
   const response = await userRequest.get(`quote/getQuoteById/${id}`)
    // console.log(response.data.data)
    setQuotationData(response.data.data)
  }
  getQuote()
},[])

const handleEdit = (val) => {
  // console.log(val)
  setEditId(val)
}

const handleUpdate = () => {
  setEditId(-1)
}

const handleSubmit = async(e) => {
  e.preventDefault()
  setDisableButton((val) => !val)
  const priceUpdatedResponse = await userRequest.post("/quote/quotationUpdate",{id: quotationData._id, materials: quotationData.materials})
  // console.log(priceUpdatedResponse)
  toast.success("Price updated successfully")
  await new Promise((resolve) => setTimeout(resolve,2000))
  setDisableButton((val) => !val)
  socket.emit("quotation updated",priceUpdatedResponse.data)
}

const handlePriceDetails = (e, ind) => {
  // console.log(ind)
  setQuotationData((val) => ({...val, materials: (val.materials).map((curr,curInd) => {
    if(curInd === ind) {
      return {...curr, totalPrice: +e.target.value }
    } else {
      return curr
    }
  }) }))
}

// console.log(quotationData)

  return (
    <QuotationDiv>
      <ToastContainer autoClose={2000}/>
      <table>
            <caption><h4>Material Table</h4></caption>
            <thead>
              <tr>
                <th style={{width: "40px"}}>S.No</th>
                <th style={{width: "100px"}}>Image</th>
                <th style={{width: "100px"}}>Name</th>
                <th style={{width: "150px"}}>Description</th>
                <th style={{width: "80px"}}>Quantity(approx)</th>
                <th style={{width: "80px", padding: "0px 10px"}}>Units of Measurement</th>

                <th style={{width: "80px", padding: "0px 10px"}}>Price</th>
                <th style={{width: "80px", padding: "0px 10px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotationData?.materials.map((val, ind) => (

                <tr key={ind}>
                <td>{ind+1}</td>
                {/* <td><TableImage src= {`${endpoint}/api/image/download/${val.image}`} alt="Image" /></td> */}
                <td><TableImage  src={`${endpoint}/api/image/download/${val.image}`} alt="Image" /></td>
                {/* <td><img src= "http://localhost:3000/api/image/download/1717053911301_recycling_images.jpg" alt="Image" /></td> */}
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.quantity}</td>
                <td>{val.unitsOfMeasurement}</td>
                {/* <td><button onClick={handleDelete}>{`${Delete}`}</button></td> */}
                {editId === val._id ? <td><input type='number' value={val.totalPrice} onChange={(e) => handlePriceDetails(e,ind)}/></td> : <td>{val.totalPrice}</td>}
                
                {editId === val._id? <td><button onClick={handleUpdate}>Update Price</button></td> : <td><button onClick={()=>handleEdit(val._id)}>Edit Price</button></td>}
            </tr>               
            ))}
            </tbody>
        </table>
        <SubmitButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleSubmit}>Submit Request</SubmitButton>
    </QuotationDiv>
  )
}

export default AdminQuotation
