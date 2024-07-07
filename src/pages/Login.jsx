import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import {loginValidationSchema} from "../schemas/validationSchema";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { login } from "../redux/userRedux";
import { useNavigate, Link } from "react-router-dom";

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const LoginContainer = styled.div`
  padding: 20px;
  width: 25%;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`;

const Title = styled.h3`
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Input = styled.input`
  flex:1;
  margin: 10px 0px;
  min-width: 40%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`

const Button = styled.button`
  &.normal-button {
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-image: linear-gradient(to right, #c004e6, #ff0061);
    color: white;
    cursor: pointer;
    margin: 10px auto;
    border-radius: 5px;
  }
  &.disabled-button {
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: lightgray;
    color: white;
    cursor: not-allowed;
    margin: 10px auto;
    border-radius: 5px;
  }
`

const LinkPage = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  padding: 5px;
  margin: auto;
`

const Error = styled.div`
  color: red;
  font-size: 14px;
`;

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  window.addEventListener("popstate", function(e){
    navigate(-2)
  })

  const onSubmit = async(values,actions ) => {
    
    try {
      const loginResponse = await publicRequest.post("/user/login", values)
      // console.log(loginResponse.data)
       dispatch(login(loginResponse.data.data))
       if(loginResponse.data.message == "Login Successful"){
        navigate("/")
        await new Promise((resolve) => setTimeout(resolve,1000))
        window.location.reload()
       }
      
    //  return redirect("/")
    } catch (error) {
      console.log(error)
      actions.setErrors(error.response.data)
    }
    
  }

  const {values, handleSubmit, touched, handleBlur, handleChange,errors, isSubmitting} = useFormik({
    initialValues:{
      email: "",
      password: ""
    },
    validationSchema: loginValidationSchema,
    onSubmit: onSubmit
  })


  return (
    <MainDiv>
      <LoginContainer>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="email" id="email" value={values.email} placeholder="Email address" onChange={handleChange} onBlur={handleBlur}/>
          {errors.email&& touched.email && (<Error>{errors.email}</Error>)}
          <Input type="password" id="password" value={values.password} placeholder="Password" onChange={handleChange} onBlur={handleBlur}/>
          {errors.password&& touched.password && (<Error>{errors.password}</Error>)}
          {errors.message && (<Error>{errors.message}</Error>)}
          <Button
            disabled={isSubmitting}
            className={isSubmitting ? "disabled-button" : "normal-button"}>Login</Button>
          {/* <LinkPage>DO NOT REMEMBER PASSWORD?</LinkPage> */}
          <LinkPage to="/register">CREATE NEW ACCOUNT</LinkPage>
        </Form>
      </LoginContainer>
    </MainDiv>
  );
};

export default Login;
