import React from "react";
import styled from "styled-components";
import {registrationValidationSchema} from "../schemas/validationSchema";
import { useFormik } from "formik";
import { publicRequest } from "../requestMethods";
import { useNavigate,Link } from "react-router-dom";

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
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 10px 0px;
  min-width: 40%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  &.input-error {
    border-color: red;
  }
`;

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
`;

const LinkPage = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin: auto;
  color: #002680;
`;
const Error = styled.div`
  color: red;
  font-size: 14px;
`;

const Register = () => {

  const navigate = useNavigate()

  const onSubmit = async (values, actions, errors) => {
    try {
     
    const res = await publicRequest.post("/user/register", values)
    alert(res.data.message)
    
    actions.resetForm();
    navigate("/login")

    } catch (error) {
      console.log(error)
      actions.setErrors(error.response.data)
    }
    
  };

  const {
    values,
    handleBlur,
    touched,
    isSubmitting,
    handleChange,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: onSubmit,
  });

  return (
    <MainDiv>
      <LoginContainer>
        <Title>REGISTER</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && <Error>{errors.name}</Error>}
          <Input
            type="text"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && <Error>{errors.email}</Error>}
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <Error>{errors.password}</Error>
          )}
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword  && (
            <Error>{errors.confirmPassword}</Error>
          )}
          {errors.message && (
            <Error>{errors.message}</Error>
          )}
          <Button
            disabled={isSubmitting}
            className={isSubmitting ? "disabled-button" : "normal-button"}
          >
            CREATE
          </Button>
          <LinkPage to="/login">LOGIN TO THE ACCOUNT</LinkPage>
        </Form>
      </LoginContainer>
    </MainDiv>
  );
};

export default Register;
