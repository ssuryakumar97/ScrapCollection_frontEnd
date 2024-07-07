import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const AdminMaterialDiv = styled.div`
    flex: 4;
`
const AddProductTitle = styled.h1``
const AddProductForm = styled.form`
    margin-top: 10px;
`
const AddProductItem = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label{
        color: gray;
        font-weight: 600;
        margin-bottom: 10px;
    };
    input{
        padding: 10px;
    };
    select{
        padding: 10px;
    }
`
const AddProductButton = styled.button`
    &.normal{
        margin-top: 10px;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        background-color: darkblue;
        color: white;
        font-weight: 600;
        cursor: pointer;
    } 
    &.disable{
        margin-top: 10px;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        background-color: #5050ff;
        color: white;
        font-weight: 600;
        cursor: not-allowed;
    } 
`

const ProductInfoImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 20px;
`

const AdminMaterial = () => {

    const [image, setImage] = useState()
    const [file, setFile] = useState(null)
    const initialValues = {
        image:"",
        title: "",
        description: "",
        unitsOfMeasurement: "kg",
        price: ""
    };
    const [data, setData] = useState(initialValues)
    const [disableButton, setDisableButton] = useState(false)
    const inputFile = useRef()


    const handleImageChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
       if(e.target.name == "price") {
                const obj = {[e.target.name]: +e.target.value}
                setData((val) => ({...val, ...obj}))
            } else {
                const obj = {[e.target.name]: e.target.value}
                setData((val) => ({...val, ...obj}))
            }
        
    }

    const handleClick = async(e) => {
        e.preventDefault()
        setDisableButton(true)
        const form = new FormData()
        form.append("image", image)
        const result = await userRequest.post("image/upload", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(result.data)
        const obj = {...data, image:result.data.name, imageId:result.data.id }
        const updateProduct = await userRequest.post("/material/uploadMaterial", obj)
        // console.log(updateProduct.data)
        toast.success("New Material added")
        inputFile.current.type = "text"
        inputFile.current.type = "file"
        setFile(null)
        setData(initialValues)
        setDisableButton(false)
    }

  return (
    <AdminMaterialDiv>
      <ToastContainer autoClose={2000} />
        <AddProductTitle>New Material</AddProductTitle>
        <AddProductForm onSubmit={handleClick}>
            <AddProductItem>
            <ProductInfoImg src={file==null ?"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg": file}/>
                <label>Image</label>
                <input type="file" id='file' onChange={handleImageChange} ref={inputFile} required/>
            </AddProductItem>
            
            <AddProductItem>
                <label>Name</label>
                <input type="text" placeholder='Material name' name='title' onChange={handleChange} value={data.title} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Description</label>
                <input type="text" placeholder='Description' name='description' onChange={handleChange} value={data.description} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Price</label>
                <input type="number" placeholder='1000' name='price' onChange={handleChange} value={data.price} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Units of Measurement</label>
                <select name="unitsOfMeasurement" onChange={handleChange} value={data.unitsOfMeasurement} required>
                    <option value="kg">Kg</option>
                    <option value="pc">Piece</option>
                </select>
            </AddProductItem>
            <AddProductButton className={disableButton? "disable": "normal"} disabled={disableButton}>Create</AddProductButton>
        </AddProductForm>
    </AdminMaterialDiv>
  )
}

export default AdminMaterial
