import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import {
  Delete,
  LocationSearching,
  MailOutline,
  PhoneAndroid,
} from "@mui/icons-material";
import { endpoint } from "../requestMethods";
import {  toast } from "react-toastify";

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h3``;


const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const UserShowBottom = styled.div``;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowBottomTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #c9c5c5;
`;
const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const UserShowInfoTitle = styled.span``;

const PhoneAndroidIcon = styled(PhoneAndroid)`
  font-size: 16px !important;
`;

const MailOutlineIcon = styled(MailOutline)`
  font-size: 16px !important;
`;
const LocationSearchingIcon = styled(LocationSearching)`
  font-size: 16px !important;
`;

const UserUpdateButton = styled.button`
  &.normal_button {
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 200px;
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
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: not-allowed;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 80%;
  margin-top: 20px;
  align-items: center;
`;
const LeftDiv = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;
const RightDiv = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

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
  label {
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
  margin: 0px 20px;
`;
const UserUpdateImgInput = styled.input`
  width: 80%;
  text-align: center;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  &.normal_button {
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    width: 200px;
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
    width: 200px;
    justify-content: center;
    margin: 10px;
    cursor: not-allowed;
  }
`;

const ImageUploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: auto;
`;

const TableImage = styled.img`
  width: 50px;
  height: 50px;
`;

const MaterialTypeDiv = styled.div`
  display: flex;
  align-items: center;
`;
const MaterialTypeLabel = styled.label`
  align-items: center;
  margin-top: 10px;
`;

const AddCollectedMaterials = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const initialValue = {
    imageId: null,
    image: "",
    title: "",
    description: "",
    quantity: "",
    price:"",
    unitsOfMeasurement: "kg",
    orderId: id
  };
  const [data, setData] = useState(initialValue);
  const [materialData, setMaterialData] = useState([]);
  const [getMaterial, setGetMaterial] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [existingMaterial, setExistingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const inputFile = useRef(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await userRequest.get(`/order/getOrderById/${id}`);
        setOrderData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetails();
  }, []);

  // console.log(orderData);

  useEffect(() => {
    const getAllMaterials = async () => {
      const res = await userRequest.get("/material/getAllMaterials");
      // console.log(res.data);
      setGetMaterial(res.data);
      setSelectedMaterial(res.data[0]);
    };
    getAllMaterials();
  }, []);

  // console.log(selectedMaterial);

  const handleMaterialType = (e) => {
    // console.log(e.target.name);
    if (e.target.name === "existing") {
      setExistingMaterial(true);
      setNewMaterial(false);
      setData((val) => ({...val,...selectedMaterial}))
    } else if (e.target.name === "new") {
      setExistingMaterial(false);
      setNewMaterial(true);
    }
  };

  // useEffect()

  const onInputChange = (e) => {
    // console.log(e.target)
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    // setData(val => ({...val, image : e.target.files[0]}))
  };

  const handleDataChange = (e) => {  
  if(e.target.name == "quantity" || e.target.name == "price" ){
    const obj = { [e.target.name]: +e.target.value };
    setData((val) => ({ ...val, ...obj }));
  } else {
    const obj = { [e.target.name]: e.target.value };
    setData((val) => ({ ...val, ...obj }));
  }
      
      
  };

  // console.log(data)

  const handleTableUpdate = async (e) => {
    e.preventDefault();
    setDisableButton((val) => !val);
    if (newMaterial) {
      const form = new FormData();
      form.append("image", image);
      // console.log(form.values())
      const result = await userRequest.post("/image/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(result);
      setData((val) => ({
        ...val,
        image: result.data.name,
        imageId: result.data.id,
      }));
      setMaterialData((val) => [...val, {...data, image: result.data.name,
        imageId: result.data.id, totalPrice: data.price * data.quantity}]);
    } 
    if(existingMaterial){
      setMaterialData((val)=> [...val, {...data, totalPrice: data.price * data.quantity}])
    }
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setData(initialValue);
    setDisableButton((val) => !val);
    setFile(null);
    setImage("");
    if(newMaterial){
      inputFile.current.type = "text";
    inputFile.current.type = "file";
    }
    
    // setMaterialData(val => [...val, data])
  };

  // console.log(materialData);

  const handleDelete = async (e, val) => {
    e.preventDefault();
    // console.log(val.imageId);
    setMaterialData(materialData.filter((item) => item.image != val.image));
    if(val.imageId != null){

      const deleteImage = await userRequest.delete(
        `/image/delete/${val.imageId}`
      );
    // console.log(deleteImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableButton((val) => !val);
    const response = await userRequest.post("/soldMaterial/uploadSoldMaterial", {
      userEmail: orderData.email,
      agentEmail: orderData.collectionAgentDetails.email,
      materialSold: materialData,
      orderId: orderData._id
    });
    // console.log(response.data);
    
    toast.success(response.data.message);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setDisableButton((val) => !val);
    setMaterialData([]);
  };

  // console.log(materialData)

  const handleMaterialChange = (e) => {
    const material = getMaterial.filter((val) => val.title === e.target.value);
    // console.log(material[0])
    setSelectedMaterial(material[0]);
    setData((val) => ({...val, ...material[0]}))
  };

  return (
    <div>
      <Topbar />
      <div>
        <UserTitleContainer>
          <UserTitle>Order Details</UserTitle>
        </UserTitleContainer>
        <UserShow>
          <UserShowTop>
            <UserShowTopTitle>
              <UserShowUsername>{orderData?.name}</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
            <UserShowInfo>
              <PhoneAndroidIcon />
              <UserShowInfoTitle>{orderData?.contactNumber}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <MailOutlineIcon />
              <UserShowInfoTitle>{orderData?.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <LocationSearchingIcon />
              <UserShowInfoTitle>{orderData?.address}</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
      </div>
      <ContentWrapper>
        <LeftDiv>
          <table>
            <caption>
              <h4>Material Table</h4>
            </caption>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>S.No</th>
                <th style={{ width: "100px" }}>Image</th>
                <th style={{ width: "100px" }}>Name</th>
                <th style={{ width: "150px" }}>Description</th>
                <th style={{ width: "80px" }}>Quantity</th>
                <th style={{ width: "80px" }}>Price per unit</th>
                <th style={{ width: "80px", padding: "0px 10px" }}>
                  Measuring Units
                </th>
                <th style={{ width: "80px" }}>Total price</th>
                <th style={{ width: "80px", padding: "0px 10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {materialData.map((val, ind) => (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>
                    <TableImage
                      src={`${endpoint}/api/image/download/${val.image}`}
                      alt="Image"
                    />
                  </td>
                  {/* <td><img src= "http://localhost:3000/api/image/download/1717053911301_recycling_images.jpg" alt="Image" /></td> */}
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>{val.quantity}</td>
                  <td>{val.price}</td>
                  <td>{val.unitsOfMeasurement}</td>
                  <td>{val.totalPrice}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={(e) => handleDelete(e, val)}
                    >
                      <Delete />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {materialData.length!=0 && (<tfoot><tr><td colSpan={9}>Grand Total: {materialData.reduce((acc,val) => {
              return acc+val.totalPrice 
            }, 0)}</td></tr></tfoot>)}
          </table>
        </LeftDiv>
        <RightDiv>
          <UserUpdateForm onSubmit={handleTableUpdate}>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>Material Type</label>
                <MaterialTypeDiv>
                  <input
                    name="existing"
                    type="radio"
                    placeholder="Newspaper"
                    onChange={handleMaterialType}
                    checked={existingMaterial}
                  />
                  <MaterialTypeLabel htmlFor="existing">
                    Existing
                  </MaterialTypeLabel>
                  <input
                    name="new"
                    type="radio"
                    placeholder="Newspaper"
                    onChange={handleMaterialType}
                    checked={newMaterial}
                  />
                  <MaterialTypeLabel htmlFor="new">New</MaterialTypeLabel>
                </MaterialTypeDiv>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Material Name</label>
                {existingMaterial ? (
                  <select name="" id="" onChange={handleMaterialChange}>
                    {getMaterial.map((val, ind) => (
                      <option value={val.title} key={ind}>
                        {val.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <UserUpdateInput
                    name="title"
                    type="text"
                    placeholder="Newspaper"
                    onChange={handleDataChange}
                    value={data.title}
                    required
                  />
                )}
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Description</label>
                {existingMaterial ? (
                  <textarea
                    name="description"
                    cols={30}
                    rows={10}
                    value={selectedMaterial.description}
                    required
                  />
                ) : (
                  <textarea
                    name="description"
                    cols={30}
                    rows={10}
                    placeholder="Type your description"
                    onChange={handleDataChange}
                    value={data.description}
                    required
                  />
                )}
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Quantity</label>
                <UserUpdateInput
                  name="quantity"
                  type="number"
                  placeholder="1"
                  onChange={handleDataChange}
                  value={data.quantity}
                  required
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Price(per Unit)</label>
                {existingMaterial ? <UserUpdateInput
                  name="price"
                  type="number"        
                  value={selectedMaterial.price}
                  required
                /> : <UserUpdateInput
                name="price"
                type="number"
                placeholder="30"
                onChange={handleDataChange}
                value={data.price}
                required
              />}
                
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Units of measurement</label>
                {existingMaterial ? (
                  <select name="unitsOfMeasurement">
                    <option value={selectedMaterial.unitsOfMeasurement}>
                      {selectedMaterial.unitsOfMeasurement}
                    </option>
                  </select>
                ) : (
                  <select name="unitsOfMeasurement" onChange={handleDataChange}>
                    <option value="kg">Kg</option>
                    <option value="pc">Piece</option>
                  </select>
                )}
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
              {existingMaterial ? (
                <UserUpdateUpload>
                  <UserUpdateImg
                    src={`${endpoint}/api/image/download/${selectedMaterial.image}`}
                    alt="image"
                  />
                </UserUpdateUpload>
              ) : (
                <UserUpdateUpload>
                  <UserUpdateImg
                    src={file != null ? file : "../upload_image.png"}
                    alt="image"
                  />
                  <div>Upload Material Pic</div>
                  {/* <label htmlFor="file"><ImageUpload/></label> */}
                  <ImageUploadDiv>
                    <UserUpdateImgInput
                      type="file"
                      onChange={onInputChange}
                      accept=".jpg, .jpeg, .png"
                      ref={inputFile}
                      required
                    />
                  </ImageUploadDiv>
                </UserUpdateUpload>
              )}

              <UserUpdateButton
                disabled={disableButton}
                className={disableButton ? "disabled_button" : "normal_button"}
              >
                Update Material Table
              </UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </RightDiv>
      </ContentWrapper>
      <SubmitButton disabled={disableButton} className={disableButton? "disabled_button" : "normal_button"} onClick={handleSubmit}>Submit Request</SubmitButton>
    </div>
  );
};

export default AddCollectedMaterials;
