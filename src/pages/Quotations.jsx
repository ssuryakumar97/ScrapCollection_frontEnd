import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const QuotationsDiv = styled.div`
  margin: 15px 5px;
  padding: 10px;
  border-radius: 10px;
   box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
   cursor: pointer;
`

const Quotations = () => {
    const [quotationData, setQuotationData] = useState([])

    const user = useSelector(state => state.user.currentUser)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllQuotations = async() => {
            const res = await userRequest.post("/quote/getAllQuotationsByUser", {email:user.email})
            console.log(res.data)
            setQuotationData([...res.data.data])
        }
        getAllQuotations()
    },[])
    
    const handleClick = (val) => {
       
          navigate(`/quotationDetails/${val._id}`)
        
      }

  return (
    <div>
        <Topbar/>
        {quotationData.length != 0 ? quotationData.map((val, ind) => {
        // console.log(val)
        return (
        <QuotationsDiv key={ind} onClick={() => handleClick(val)}>
         Your quotation request for the request id <strong>{val._id}</strong> is received with <strong> status: {val.status}</strong>
      </QuotationsDiv>
      )})  : <div>No orders</div>   
      }
    </div>
  )
}

export default Quotations
