import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { endpoint, userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import {Upload} from '@mui/icons-material';

const MaterialEditDiv = styled.div`
  flex: 4;
`;

const ProductTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductTitle = styled.h1``


const ProductTopContainer = styled.div`
    display: flex;
    
`
const ProductTopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin:20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`
const ProductInfoTop = styled.div`
    display: flex;
    align-items: center;
`
const ProductInfoBottom = styled.div`
    margin-top: 10px;
`
const ProductInfoImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 20px;
`

const ProductName = styled.span`
    font-weight: 900;
`
const ProductInfoItem = styled.div`
    width: 300px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
`
const ProductInfoKey = styled.span`
    font-weight: 600;
`
const ProductInfoValue = styled.span`
    font-weight: lighter;
`

const ProductBottomContainer = styled.div`
    padding: 20px;
    margin:20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`

const ProductForm = styled.form`
    display:flex;
    justify-content: space-between;
`
const ProductFormLeft = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 10px;
    color: gray;
`

const Input = styled.input`
        margin-bottom: 10px;
        border: none;
        padding: 5px;
        border-bottom: 1px solid gray;
`

const Select = styled.select`
    margin-bottom: 10px;
`

const ProductFormRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`
const ProductUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`
const ProductUploadButton = styled.button`
    &.normal{
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
    };
    &.disable{
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: #7676f8;
    color: white;
    font-weight: 600;
    cursor: not-allowed;
    }
`
const ErrorDiv = styled.div`
    color: red;
`
const AdminMaterialEdit = () => {
  
    const { id } = useParams();
    const [productData, setProductData] = useState({})
    const [file, setFile]= useState(null)
    const [image, setImage]= useState(null)
    const initialValues = {
        image:"",
        title: "",
        description: "",
        unitsOfMeasurement: "kg",
        price: ""
    };
    const [data, setData] = useState(initialValues)
    const [disableButton, setDisableButton] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async() => {
            const res = await userRequest.get(`/material/getMaterialById/${id}`)
            // console.log(res)
            setProductData({...res.data})
        }
        getData()
    },[updatedProduct])

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
        
        if(image == null) {
            setError(true)
            return;
        }
            setError(false)
            setDisableButton(true)
        const deleteImage = await userRequest.delete(`image/delete/${productData?.imageId}`)
        const form = new FormData()
        form.append("image", image)
        const result = await userRequest.post("image/upload", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(result.data)
        const obj = {...data, image:result.data.name, imageId:result.data.id }
        const updateProduct = await userRequest.put(`/material/updateMaterialById/${productData?._id}`, obj)
        // console.log(updateProduct.data)
        setUpdatedProduct(updateProduct.data)
        toast.success("Product updated successfully")
        setFile(null)
        setData(initialValues)
        setDisableButton(false)
    }

    // console.log(productData)
  return (
    <MaterialEditDiv>
      <ToastContainer autoClose={2000} />
      <ProductTitleContainer>
        <ProductTitle>Material</ProductTitle>
      </ProductTitleContainer>
      <ProductTopContainer>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg
              src={`${endpoint}/api/image/download/${productData?.image}`}
            />
            <ProductName>
              {productData?.title?.charAt(0).toUpperCase()}
                {productData?.title?.slice(1)}
            </ProductName>
            {/* <ProductName>
              {productData?.title}
            </ProductName> */}
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>Id: </ProductInfoKey>
              <ProductInfoValue>{productData?._id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Description:</ProductInfoKey>
              <ProductInfoValue>{productData?.description}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Price:</ProductInfoKey>
              <ProductInfoValue>₹{productData?.price}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Units of Measurement:</ProductInfoKey>
              <ProductInfoValue>{productData?.unitsOfMeasurement}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTopContainer>
      <ProductBottomContainer>
        <ProductForm onSubmit={handleClick}>
          <ProductFormLeft>
            <Label>Material Name</Label>
            <Input
              type="text"
              placeholder="Material Name"
              name="title"
              onChange={handleChange}
              value={data.title}
              required
            />
            
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description}
              required
            />
            
            
            <Label>Price</Label>
            <Input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={data.price}
              required
            />
            <Label>Units of Measurement</Label>
            <Select
              name="unitsOfMeasurement"
              onChange={handleChange}
              value={data.unitsOfMeasurement}
              required
            >
              <option value="kg">Kg</option>
              <option value="pc">Piece</option>
            </Select>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg
                src={
                  file == null
                    ? "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
                    : file
                }
                alt="Material"
              />
              <Label htmlFor="file" >
                <Upload />
              </Label>
              <Input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="file"
                onChange={handleImageChange}
              />
              
            </ProductUpload>
            {error && <ErrorDiv>Image is required</ErrorDiv>}
            <ProductUploadButton
              disabled={disableButton}
              className={disableButton ? "disable" : "normal"}
            //   onClick={handleClick}
            >
              Update
            </ProductUploadButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottomContainer>
    </MaterialEditDiv>
  );
};

export default AdminMaterialEdit;
