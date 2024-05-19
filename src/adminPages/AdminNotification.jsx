import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'
import { updateAdminNotification } from '../redux/notificationRedux'

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

const AdminNotification = () => {
  const notification =  useSelector((state) => state.notificationReducer.adminNotification)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (curr) => {
    const id = curr._id
    const updatedNotification = notification.filter((val) => val._id != id)
    console.log(updatedNotification);
    dispatch(updateAdminNotification(updatedNotification))
    navigate(`/admin/order/${id}`)
  }

  return (
    <NotificationDiv>
      {notification?.length != 0 ? notification?.map((curr, ind) => (
        <NotifiDiv key={ind} onClick={() => handleClick(curr)}>
          <p>You got new collection request from the user<strong> {curr.name}</strong> with email <strong>{curr.email}</strong></p>
        </NotifiDiv>
      )): (<div>No new notification to show</div>)}
    </NotificationDiv>
  )
}

export default AdminNotification
