import * as yup from 'yup';

const addressValidationYup = yup.object().shape({
  number: yup
    .string()
    .max(10)
    .required('Your number is required, max 10 characters'),
  street: yup
    .string()
    .max(70)
    .required('Street is required, max 70 characters'),
  city: yup
    .string()
    .max(70)
    .required('City is required, max 70 characters'),
  zipCode: yup
    .string()
    .max(10)
    .required('Zip code is required, max 10 characters'),
  country: yup
    .string()
    .max(30)
    .required('Country is required, max 30 characters')
});

export interface Address extends yup.InferType<typeof addressValidationYup> {}

export default addressValidationYup;
