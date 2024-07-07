
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { updateQuotationNotification } from '../redux/notificationRedux'

const NotificationDiv = styled.div`
    flex:4;
`

const NotifiDiv = styled.div`
  margin: 15px 5px;
  padding: 2.5px;
  border-radius: 10px;
   box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
   cursor: pointer;
`



const AdminQuotationNotification = () => {
    const notification =  useSelector((state) => state.notification.quotationNotification)
    // console.log(notification)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const handleClick = (curr) => {
      const id = curr.data._id

      const updatedNotification = notification.filter((val) => val.data._id != id)
      // console.log(updatedNotification);
      dispatch(updateQuotationNotification(updatedNotification))
      navigate(`/admin/quotationRequest/${id}`)
    }
  return (
    <NotificationDiv>
      {notification?.length != 0 ? notification?.map((curr, ind) => (
        <NotifiDiv key={ind} onClick={() => handleClick(curr)}>
          <p>You got new quotation request from the user<strong> {curr.data.userEmail}</strong></p>
        </NotifiDiv>
      )): (<NotifiDiv>No new notification to show</NotifiDiv>)}
    </NotificationDiv>
  )
}

export default AdminQuotationNotification
