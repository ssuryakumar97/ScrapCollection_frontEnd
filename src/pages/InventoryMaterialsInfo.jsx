import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { useParams } from 'react-router-dom'
import { endpoint, userRequest } from '../requestMethods'
import styled from 'styled-components'

const TablesStyled = styled.table`
  margin: 20px auto;
`

const TableImage = styled.img`
    width: 50px;
    height: 50px;
`

const InventoryMaterialsInfo = () => {

    const [materialInfo, setMaterialInfo] = useState()
    const {id} = useParams()

    useEffect(() => {
        const getMaterialsInfo = async() => {
            const res = await userRequest.get(`/soldMaterial/inventoryMaterials/${id}`)
            // console.log(res.data.data)
            setMaterialInfo(res.data.data)
        }
        getMaterialsInfo()
    },[])

  return (
    <div>
      <Topbar/>
      <TablesStyled>
          <thead>
            <tr>
              <td style={{width: "40px"}}>S.No</td>
              <td style={{width: "150px"}}>Name</td>
              <td style={{width: "150px"}}>Image</td>
              <td style={{width: "150px"}}>Description</td>
              <td style={{width: "150px"}}>Quantity</td>
              <td style={{width: "150px"}}>Price per Unit</td>
              <td style={{width: "150px"}}>Total Price</td>
            </tr>
          </thead>
          <tbody>
            {materialInfo?.materials?.length != 0 && materialInfo?.materials?.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{val.title}</td>
                    <td><TableImage src= {`${endpoint}/api/image/download/${val.image}`} alt="Image"/></td>
                    <td>{val.description}</td>
                    <td>{val.quantity}</td>
                    <td>{val.price}</td>
                    <td>{val.totalPrice}</td>
                  </tr>
                )
            })}
          </tbody>
          <tfoot>
            <tr><td colSpan={7}> Grand Total:{materialInfo?.totalPrice}</td></tr>
          </tfoot>
        </TablesStyled>
    </div>
  )
}

export default InventoryMaterialsInfo
