import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import "./Quotation_request.css"
import styled from 'styled-components';
import {
  Upload,
} from "@mui/icons-material";
import {Form, Link} from "react-router-dom"
import { publicRequest } from '../requestMethods';
import { endpoint } from '../requestMethods';

const MainDiv = styled.div`
  height: 100%;
`

const ContentWrapper = styled.div`
  display: flex;
  height: 80%;
  margin-top: 20px;
  align-items: center ;
`
const LeftDiv = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`
const RightDiv = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`


const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        margin-bottom: 10px;
        font-size: 14px;
    }
`;

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`;
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`;
const UserUpdateUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;
const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin:0px 20px;
`;
const UserUpdateImgInput = styled.input`
    
    width: 80%;
   text-align: center;
   margin-left: 10px;
`;

const UserUpdateIcon = styled(Upload)`
    cursor: pointer;
`

const UserUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 40%;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
`

const ImageUpload = styled(Upload)`
    cursor: pointer;
`
const ImageUploadForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: auto;
`

const Quotation_request = () => {

  const [image, setImage] = useState("")
  const [getImage, setGetImage] = useState(null)

  const onInputChange = (e) => {
    console.log(e.target)
    setImage(e.target.files[0])
  }
  console.log((image));

  const handleImage = async(e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("image", image)
    console.log(formData.values())
    const result = await publicRequest.post(`${endpoint}/api/image/upload`, formData, {
      headers: {"Content-Type":"multipart/form-data" }
    })
    console.log(result)
    setGetImage(result.data)
  }

  return (
    <MainDiv>
        <Topbar/>
        <ContentWrapper>
      <LeftDiv>
        <table>
            <caption>Quotation Request</caption>
            <thead>
                <th>S.No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit of Measurement</th>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>null</td>
                    <td>Wooden Kot</td>
                    <td>king size wooden Kot</td>
                    <td>1</td>
                    <td>pc</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>null</td>
                    <td>Wooden Kot</td>
                    <td>king size wooden Kot</td>
                    <td>1</td>
                    <td>pc</td>
                </tr><tr>
                    <td>1</td>
                    <td>null</td>
                    <td>Wooden Kot</td>
                    <td>king size wooden Kot</td>
                    <td>1</td>
                    <td>pc</td>
                </tr>
            </tbody>
        </table>
      </LeftDiv>
      <RightDiv>
      <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>Material Name</label>
                <UserUpdateInput type="text" placeholder="Newspaper" />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Description</label>
                <textarea name='description' cols={30} rows={10} placeholder='Type your description'/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Quantity</label>
                <UserUpdateInput
                  type="number"
                  placeholder="1"
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Units of measurement</label>
                <select name="measuringUnits">
                  <option value="kg">Kg</option>
                  <option value="pc">Piece</option>
                </select>
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
                <UserUpdateUpload>
                   <UserUpdateImg src={getImage != null ? `${endpoint}}/api/image/download/${getImage.name}`: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} />
                    {/* <label htmlFor="file"><ImageUpload/></label> */}
                    <ImageUploadForm onSubmit={(e) => handleImage(e)}>
                    <UserUpdateImgInput type="file" id="file" onChange={onInputChange}/>
                    <UserUpdateButton>Upload Image</UserUpdateButton>
                    </ImageUploadForm>
                </UserUpdateUpload>
                <UserUpdateButton>Update Material Table</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
          </RightDiv>
          </ContentWrapper>
    </MainDiv>
  )
}

export default Quotation_request
