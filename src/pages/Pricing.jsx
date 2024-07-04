import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { endpoint, userRequest } from '../requestMethods'
import styled from 'styled-components'

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`

const PricingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

const PricingWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  gap: 100px;
`

const Pricing = () => {

  const [pricingData, setPricingData] = useState()

  useEffect(() => {
    const data = async() => {
      const res = await userRequest("/material/getAllMaterials")
      console.log(res.data)
      setPricingData(res.data)
    }
    data()
  },[])

  console.log(pricingData)

  return (
    <div>
        <Topbar/>
        <PricingWrapper>
          {
            pricingData?.map((val, ind) => {
              return (
                <PricingDiv key={ind}>
                  <Image
                    src={`${endpoint}/api/image/download/${val.image}`}
                    alt="image"
                  />
                  <div>{val.title}</div>
                  <div>{val.price}/{val.unitsOfMeasurement}</div>
                </PricingDiv>
              );

            })
          }
      
      </PricingWrapper>
    </div>
  )
}

export default Pricing
