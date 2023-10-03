import * as yup from 'yup';

export const userValidationYup = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(12)
    .required('Password is required'),
  firstName: yup
    .string()
    .min(2)
    .required('First name is required')
    .matches(/^[A-Za-z -]+$/),
  lastName: yup
    .string()
    .min(2)
    .required('Last name is required')
    .matches(/^[A-Za-z -]+$/),
  phone: yup
    .string()
    .length(10)
    .required('Phone is required')
});

export interface User extends yup.InferType<typeof userValidationYup> {}

export const userLoginValidationYup = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(12)
    .required()
});

export interface UserLogin extends yup.InferType<typeof userLoginValidationYup> {}
