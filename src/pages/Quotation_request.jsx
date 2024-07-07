import React, { useEffect, useRef, useState } from 'react'
import Topbar from '../components/Topbar'
import "./Quotation_request.css"
import styled from 'styled-components';
import {
   Delete
} from "@mui/icons-material";
import {  socket, userRequest } from '../requestMethods';
import { endpoint } from '../requestMethods';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

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



const UserUpdateButton = styled.button`
    &.normal_button {
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
    }
    &.disabled_button {
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: #a1a1be;
    color: white;
    font-weight: 600;
    width: 40%;
    justify-content: center;
    margin: 10px;
    cursor: not-allowed;
    }
`

const SubmitButton = styled.button`
     &.normal_button{border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: pointer;}
    &.disabled_button{border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: #a1a1be;
    color: white;
    font-weight: 600;
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: not-allowed;}

`

const ImageUploadDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: auto;
`

const TableImage = styled.img`
  width: 50px;
  height: 50px;
`

const Quotation_request = () => {

  const [image, setImage] = useState("")
  const [file, setFile] = useState(null)
  const [getImage, setGetImage] = useState(null)
  const initialValue = {imageId: "", image:"",title:"", description: "", quantity: "", unitsOfMeasurement:"kg"}
  const [data, setData] = useState(initialValue)
  const [materialData, setMaterialData] = useState([])
  const [disableButton , setDisableButton] = useState(false)
  const userEmail = useSelector((state) => state.user.currentUser.email)
  // console.log(userEmail)
  const inputFile = useRef(null)


  const onInputChange = (e) => {
    // console.log(e.target)
    setFile(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    // setData(val => ({...val, image : e.target.files[0]}))
  }

  const handleDataChange = (e) => {
    const obj = {[e.target.name]: e.target.value}
   
    setData(val => ({...val, ...obj}))
  }

  const handleTableUpdate = async(e) => {
    e.preventDefault();
    setDisableButton((val) => !val)
 
    const form = new FormData()
    form.append("image", image)
    // console.log(form.values())
    const result = await userRequest.post("/image/upload", form, {
      headers: {"Content-Type":"multipart/form-data" }
    })
    // console.log(result)
    setGetImage(result.data)
    setData(val => ({...val, image: result.data.name, imageId: result.data.id}))
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setData(initialValue)
    setDisableButton(val => !val)
    setFile(null)
    setImage("")
    inputFile.current.type = "text"
    inputFile.current.type = "file"
    // setMaterialData(val => [...val, data]) 
  }

useEffect(()=>{
  if(data.image){
    setMaterialData(val => [...val, data]) 
  }
},[getImage])

// console.log(materialData)

const handleDelete = async(e,val) => {
  e.preventDefault()
  // console.log(val)
  setMaterialData(materialData.filter((item) => item.image != val.image ))
  const deleteImage = await userRequest.delete(`/image/delete/${val.imageId}`)
  // console.log(deleteImage)
}

const handleSubmit = async(e) => {
  e.preventDefault()
  const response = await userRequest.post("/quote/newQuotation",{userEmail,materials: materialData})
  // console.log(response.data)
  setDisableButton((val) => !val)
  toast.success(response.data.message)
  socket.emit("quotation received", response.data)
  await new Promise((resolve) => setTimeout(resolve, 3000))
  setDisableButton((val) => !val)
  setMaterialData([])
}


  
  return (
    <MainDiv>
        <Topbar/>
        <ToastContainer autoClose={3000}/>
        <ContentWrapper>
      <LeftDiv>
        <table>
            <caption><h4>Material Table</h4></caption>
            <thead>
              <tr>
                <th style={{width: "40px"}}>S.No</th>
                <th style={{width: "100px"}}>Image</th>
                <th style={{width: "100px"}}>Name</th>
                <th style={{width: "150px"}}>Description</th>
                <th style={{width: "80px"}}>Quantity(approx)</th>
                <th style={{width: "80px", padding: "0px 10px"}}>Units of Measurement</th>
                <th style={{width: "80px", padding: "0px 10px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {materialData.map((val, ind) => (
                <tr key={ind}>
                <td>{ind+1}</td>
                <td><TableImage src= {`${endpoint}/api/image/download/${val.image}`} alt="Image" /></td>
                {/* <td><img src= "http://localhost:3000/api/image/download/1717053911301_recycling_images.jpg" alt="Image" /></td> */}
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.quantity}</td>
                <td>{val.unitsOfMeasurement}</td>
                {/* <td><button onClick={handleDelete}>{`${Delete}`}</button></td> */}
                <td><div style={{cursor:"pointer", color:"red"}} onClick={(e) => handleDelete(e,val)}><Delete/></div></td>
            </tr>
              ))}                
            </tbody>
        </table>
      </LeftDiv>
      <RightDiv>
      <UserUpdateForm onSubmit={handleTableUpdate}>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>Material Name</label>
                <UserUpdateInput name='title' type="text" placeholder="Newspaper" onChange={handleDataChange} value={data.title} required/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Description</label>
                <textarea name='description' cols={30} rows={10} placeholder='Type your description' onChange={handleDataChange} value={data.description} required/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Quantity</label>
                <UserUpdateInput
                  name='quantity'
                  type="number"
                  placeholder="1"
                  onChange={handleDataChange}
                  value={data.quantity}
                  required
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Units of measurement</label>
                <select name="unitsOfMeasurement" onChange={handleDataChange}>
                  <option value="kg">Kg</option>
                  <option value="pc">Piece</option>
                </select>
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
                <UserUpdateUpload>
                   {/* <UserUpdateImg src={getImage != null ? `${endpoint}/api/image/download/${getImage.name}`: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} /> */}
                   <UserUpdateImg src={file != null ? file : "upload_image.png"} />
                   <div>Upload Material Pic</div>
                    {/* <label htmlFor="file"><ImageUpload/></label> */}
                    <ImageUploadDiv >
                      <UserUpdateImgInput type="file" onChange={onInputChange} accept=".jpg, .jpeg, .png" ref={inputFile} required/>
                      
                    </ImageUploadDiv>
                </UserUpdateUpload>
                <UserUpdateButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"}>Update Material Table</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
          </RightDiv>
          </ContentWrapper>
          <SubmitButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleSubmit}>Submit Request</SubmitButton>
    </MainDiv>
  )
}

export default Quotation_request
