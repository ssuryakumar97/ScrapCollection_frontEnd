import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Topbar from '../components/Topbar'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { userRequest, endpoint } from '../requestMethods'


const QuotationDiv = styled.div`
  
  text-align: center;
`

const QuotationTable = styled.table`
  margin: 20px auto;
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

const RejectButton = styled.button`
   &.normal_button{border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: red;
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

const Span = styled.span`
  &.approved{
    color: green
  };
  &.rejected{
    color: red
  }
`

const QuotationDetails = () => {
  const [quotationData, setQuotationData] = useState(null)
  const [disableButton, setDisableButton] = useState(false)
    const {id} = useParams()

    const navigate= useNavigate()
    useEffect(()=>{
      const getQuote = async() => {
       const response = await userRequest.get(`quote/getQuoteById/${id}`)
        // console.log(response.data.data)
        setQuotationData(response.data.data)
      }
      getQuote()
    },[])

    const handleSubmit = async(e) => {
      e.preventDefault()
      // console.log(e.target.value)
      setQuotationData((val) => ({...val, status : e.target.value}))
      const updatedResponse = await userRequest.post("/quote/quotationUpdateByUser",{id, status:e.target.value})
      // console.log(updatedResponse.data)
      if(e.target.value == "approved") {
        navigate("/collection-request")
      }
    }

    // console.log(quotationData)
    const grandTotal = quotationData?.materials.reduce((acc,val) => {
     return acc + val.totalPrice},0)
    // console.log(grandTotal)

  return (
    <div>
        <Topbar/>
        <QuotationDiv>
      <ToastContainer autoClose={2000}/>
      <QuotationTable>
            <caption><h4>Quote Details</h4></caption>
            <thead>
              <tr>
                <th style={{width: "40px"}}>S.No</th>
                <th style={{width: "100px"}}>Image</th>
                <th style={{width: "100px"}}>Name</th>
                <th style={{width: "150px"}}>Description</th>
                <th style={{width: "80px"}}>Quantity(approx)</th>
                <th style={{width: "80px", padding: "0px 10px"}}>Units of Measurement</th>

                <th style={{width: "80px", padding: "0px 10px"}}>Total Price</th>
                
              </tr>
            </thead>
            <tbody>
              {quotationData?.materials.map((val, ind) => (

                <tr key={ind}>
                <td>{ind+1}</td>
                <td><TableImage  src={`${endpoint}/api/image/download/${val.image}`} alt="Image" /></td>
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.quantity}</td>
                <td>{val.unitsOfMeasurement}</td>
                <td>{val.totalPrice}</td>
            </tr>             
            ))}
            </tbody>
        </QuotationTable>
            <div style={{marginRight:"auto"}}>Grand Total: {grandTotal}</div>
            {
              quotationData?.status === "approxQuote"? (<> <SubmitButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleSubmit} value="approved">Approve</SubmitButton>
        <RejectButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleSubmit} value="rejected">Reject</RejectButton></>) : <div>You <Span className={quotationData?.status === "approved"? "approved": "rejected"}><strong>{quotationData?.status}</strong></Span> this quote.</div>
            }
            
       
    </QuotationDiv>
    <div>
    <h4>Note**</h4>
<ul>
    <li>
      Price mentioned in the list are approximate. May vary with weight's.
    </li>  
    <li>
      Price will vary according to physical and working condition of the devices.
    </li>
</ul>
    </div>
    </div>
  )
}

export default QuotationDetails
