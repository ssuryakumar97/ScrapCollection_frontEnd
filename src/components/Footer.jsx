import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import XIcon from '@mui/icons-material/X';


const Container = styled.div`
    display: flex;
`
const Left = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Center = styled.div`
    flex:1;
    padding: 20px;
`
const Right = styled.div`
    flex:1;
    padding: 20px;
`
const Title =  styled.h3`
    margin-bottom: 30px;
`
const List =  styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem =  styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Logo = styled.h1``;

const Desc = styled.p``;

const SocialContainer = styled.div`
    display: flex;

`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

 
function Footer() {
  return (
    <Container>
        <Left>
            <Logo>EULER Scrap Collection</Logo>
            <Desc>Sell your scrap material and used home appliances at best price and at doorstep.</Desc>
            <SocialContainer>
                <SocialIcon color="385999">
                    <FacebookIcon />
                </SocialIcon>
                <SocialIcon color="000000">
                    <XIcon />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <InstagramIcon />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <PinterestIcon />
                </SocialIcon>
            </SocialContainer>
        </Left>
        
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOnIcon style={{marginRight: "10px"}}/>Ambathur, Chennai - 600 058</ContactItem>
            <ContactItem><CallIcon style={{marginRight: "10px"}}/>+91 44 2245 1124</ContactItem>
            <ContactItem><MailOutlineIcon style={{marginRight: "10px"}}/>contact@euler.in</ContactItem>
        </Right>
    </Container>
  )
}

export default Footer
