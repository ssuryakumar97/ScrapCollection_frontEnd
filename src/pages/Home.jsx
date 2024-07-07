import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components'
import Footer from '../components/Footer.jsx'

const Image = styled.img`
  width: 40vw;
  height: 80%;
`

const HomeDivContainer = styled.div`
  display: flex;
  align-items: center;
`

const LeftDiv = styled.div`
  flex: 1;
  margin: auto;
`
const RightDiv = styled.div`
  flex: 1;
  margin: auto;
`

const MaterialDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  gap:40px;
  justify-content: center;
`

const MaterialContainer = styled.div`
  border: solid black 1px;
  border-radius: 10px;
  height: 300px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.image});
`

const RecycleDiv = styled.div`
  border: solid black 1px;
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: white;
  opacity: 0.8;
  /* z-index: 1; */
`

const WorkingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => {


  return (
    <div>
      <Topbar/>
     <HomeDivContainer>
      <LeftDiv><Image src="recycling_images.jpg" alt="Home page image" /></LeftDiv>
      <RightDiv><h1>Sell your scrap at best price at your door step</h1></RightDiv>
      
     </HomeDivContainer>
     <MaterialDiv>

     <h2>What we recycle?</h2>
    <Container>

      <MaterialContainer image="metals.jpg">
        <RecycleDiv>

        <h3>METALS</h3>
        <div>IRON, STEEL, BRASS, COPPER, TIN, EVER SILVER</div>
        </RecycleDiv>
      </MaterialContainer>

      <MaterialContainer image="plasticImage.jpg">
        <RecycleDiv>

        <h3>PLASTIC</h3>
        <div>PVC PIPES, PLASTIC CHAIRS, BUCKET, CONTAINER, TOYS</div>
        </RecycleDiv>
      </MaterialContainer>
      <MaterialContainer image="glass.jpg">
        <RecycleDiv>

        <h3>GLASS</h3>
        <div>KETCHUP BOTTLE, GLASS JAR, ALCOHOL BOTTLE, BEER BOTTLE</div>
        </RecycleDiv>
      </MaterialContainer>
      <MaterialContainer image="paper.jpg">
        <RecycleDiv>

        <h3>PAPER</h3>
        <div>MAGAZINES, NEWSPAPER, SCHOOL BOOKS, NOTES</div>
        </RecycleDiv>
      </MaterialContainer>
      <MaterialContainer image="appliances.jpg">
        <RecycleDiv>

        <h3>APPLIANCES</h3>
        <div>TV, LAPTOP, AC, REFRIGERATOR, WOODEN KOT, WARDROBE</div>
        </RecycleDiv>
      </MaterialContainer>
    </Container>
     </MaterialDiv>
     <WorkingDiv>
     <h1>How it works?</h1>
     <div>
      <HomeDivContainer>
      <LeftDiv><Image src="quotation.png" alt="Quotation image" /></LeftDiv>
      <RightDiv><h4>Quotation</h4><div>Know the value of your scrap materials.</div></RightDiv>
         </HomeDivContainer>
         <HomeDivContainer>
      <RightDiv><h4>PickUp</h4><div>Raise collection request if quotation price is ok.</div></RightDiv>
      <LeftDiv><Image src="collection.jpg" alt="Collection image" /></LeftDiv>
         </HomeDivContainer>
         <HomeDivContainer>
      <LeftDiv><Image src="scrap-pickup.jpg" alt="Scrap pickup image" /></LeftDiv>
      <RightDiv><h4>Doorstep Collection</h4><div>We pickup scrap at doorstep.</div></RightDiv>
         </HomeDivContainer>
         <HomeDivContainer>
      <RightDiv><h4>Instant Cash</h4><div>Get instant cash for your scrap material.</div></RightDiv>
      <LeftDiv><Image src="instant-cash.jpg" alt="Instant cash image" /></LeftDiv>
         </HomeDivContainer>
     </div>
     </WorkingDiv>
     <Footer/>
    </div>
  )
}

export default Home
