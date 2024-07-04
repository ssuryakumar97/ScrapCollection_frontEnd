import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { userRequest } from '../requestMethods'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const TablesStyled = styled.table`
  margin: 20px auto;
`

const DetailsButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 100px;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
`

const Inventory = () => {

  const [inventoryData, setInventoryData] = useState()

  const navigate = useNavigate()

  useEffect(()=> {
    const getInventoryDetails = async() => {
      const res = await userRequest.get("/soldMaterial/inventory")
      // console.log(res.data.data)
      setInventoryData(res.data.data)
    }
    getInventoryDetails()
  },[])

  console.log(inventoryData)

  const handleClick = (val) => {
    // console.log(val._id)
    navigate(`/inventoryMaterials/${val._id}`)

  }

  return (
    <div>
        <Topbar/>
        <TablesStyled>
          <thead>
            <tr>
              <td style={{width: "40px"}}>S.No</td>
              <td style={{width: "150px"}}>Name</td>
              <td style={{width: "150px"}}>Total Quantity</td>
              <td style={{width: "150px"}}>Total Price</td>
              <td style={{width: "150px"}}>Action</td>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.length != 0 && inventoryData?.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{val.title}</td>
                    <td>{val.totalQuantity}</td>
                    <td>{val.totalPrice}</td>
                    <td><DetailsButton onClick={() => handleClick(val)}>Details</DetailsButton></td>
                  </tr>
                )
            })}
          </tbody>
        </TablesStyled>
    </div>
  )
}

export default Inventory
