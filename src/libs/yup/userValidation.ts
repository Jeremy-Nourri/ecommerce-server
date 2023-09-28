import * as yup from 'yup';

export const userValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(12)
    .required(),
  firstName: yup
    .string()
    .min(2)
    .required()
    .matches(/^[A-Za-z -]+$/),
  lastName: yup
    .string()
    .min(2)
    .required()
    .matches(/^[A-Za-z -]+$/),
  phone: yup
    .string()
    .length(10)
    .required(),
});

export const userLoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(12)
    .required(),
});