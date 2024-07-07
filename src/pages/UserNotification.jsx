import React from 'react'
import Topbar from '../components/Topbar'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { updateUserNotification } from '../redux/notificationRedux'

const NotifiDiv = styled.div`
  margin: 15px 5px;
  padding: 10px;
  border-radius: 10px;
   box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
   cursor: pointer;
`

const UserNotification = () => {

  const userNotification = useSelector((state) => state.notification.userNotification)
  const navigate = useNavigate()
  // console.log(userNotification);
  const dispatch = useDispatch()

  const handleClick = (val) => {
    // console.log(val)
    const updatedNotification = userNotification.filter((curr) => curr._id != val._id)
    if(val?.notificationType === "quotation"){
      navigate(`/quotationDetails/${val._id}`)
    } else {
      navigate(`/orderDetails/${val.orderData._id}`)
    }
    dispatch(updateUserNotification(updatedNotification))
  }

  return (
    <div>
        <Topbar/>
      <div>
        {userNotification.length !=0 ? userNotification.map((val, ind) => {
          // console.log(val)
          if(val.notificationType === "quotation"){
            return (
              <NotifiDiv key={ind} onClick={() => handleClick(val)}>
            Your quotation request for the request id <strong>{val._id}</strong> is received 
             {/* {val}  */}
          </NotifiDiv>)} else {
             return (
                <NotifiDiv key={ind} onClick={() => handleClick(val)}>
              Your order with reference number <strong>{val.orderData._id}</strong> is assigned to the agent <strong>{val.agentData.name}</strong>
               {/* {val}  */}
                </NotifiDiv>)
          }
          }
          

        ) : <NotifiDiv>No notification to show</NotifiDiv>}
      </div>
    </div>
  )
}

export default UserNotification
