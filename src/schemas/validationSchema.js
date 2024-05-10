import * as yup from "yup";

export const registrationValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must have atleast one symbol")
    .matches(/[0-9]/, "Must have atleast one digit")
    .matches(/[a-z]/, "Must have atleast one lower character")
    .matches(/[A-Z]/, "Must have atleast one upper character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must have atleast one symbol")
    .matches(/[0-9]/, "Must have atleast one digit")
    .matches(/[a-z]/, "Must have atleast one lower character")
    .matches(/[A-Z]/, "Must have atleast one upper character")
    .required("Password is required"),
});


