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
    .max(20)
    .required('First name is required, min 2 characters, max 20 characters')
    .matches(/^[A-Za-z -]+$/),
  lastName: yup
    .string()
    .min(2)
    .max(20)
    .required('Last name is required, min 2 characters, max 20 characters')
    .matches(/^[A-Za-z -]+$/),
  phone: yup
    .string()
    .length(10)
    .required('Phone is required, 10 characters')
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
