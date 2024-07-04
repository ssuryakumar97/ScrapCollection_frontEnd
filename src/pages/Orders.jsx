import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const OrdersDiv = styled.div`
  margin: 15px 5px;
  padding: 10px;
  border-radius: 10px;
   box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
   cursor: pointer;
`


const Orders = () => {

  const [orderData, setOrderData] = useState([])
  const user = useSelector(state => state.user.currentUser) 
  const navigate = useNavigate()


  useEffect(() => {
    const userOrders = async() => {
      const res = await userRequest.post("/order/getOrderByUsername",{email:user.email}) 
      console.log(res.data)
      setOrderData((val) => [...res.data])
    }
    userOrders();
  },[])

  const handleClick = (val) => {
    console.log(val)
    
      navigate(`/orderDetails/${val._id}`)
    
  }

  console.log(orderData)
  return (
    <div>
      <Topbar/>
      {orderData.length != 0 ? orderData.map((val, ind) => {
        // console.log(val)
        return (
        <OrdersDiv key={ind} onClick={() => handleClick(val)}>
         Your order with reference number <strong>{val._id}</strong> is assigned to the agent <strong>{val.name}</strong> 
      </OrdersDiv>
      )})  : <div>No orders</div>   
      }
    </div>
  )
}

export default Orders
