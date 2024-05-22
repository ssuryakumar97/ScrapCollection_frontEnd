import React from 'react'
import Topbar from '../components/Topbar'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const NotifiDiv = styled.div`
  margin: 15px 5px;
  padding: 10px;
  border-radius: 10px;
   box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
   cursor: pointer;
`

const UserNotification = () => {

  const userNotification = useSelector((state) => state.notification.userNotification)
  console.log(userNotification);

  return (
    <div>
        <Topbar/>
      <div>
        {userNotification.length !=0 ? userNotification.map((val, ind) => (
          <NotifiDiv key={ind}>
            Your order with reference number <strong>{val.orderData._id}</strong> is assigned to the agent <strong>{val.agentData.name}</strong>
             {/* {val}  */}
          </NotifiDiv>)

        ) : <NotifiDiv>No notification to show</NotifiDiv>}
      </div>
    </div>
  )
}

export default UserNotification
