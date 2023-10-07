import * as yup from 'yup';

export const userValidationYup = yup.object().shape({
  email: yup
    .string()
    .email('Email valide requis')
    .required('Email requis'),
  password: yup
    .string()
    .min(12, 'min 12 caractères')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/, 'min : 12 caractères, 1 majuscule, 1 minuscule, 1 nombre et un caractère spécial #?!@$%^&*-')
    .required('Mot de passe requis'),
  firstName: yup
    .string()
    .min(2, 'min 2 caractères, max 20 caractères')
    .max(20, 'min 2 caractères, max 20 caractères')
    .matches(/^[A-Za-z -éèâëê]+[^0-9]+$/, 'Prénom invalide')
    .required('Prénom requis'),
  lastName: yup
    .string()
    .min(2, 'min 2 caractères, max 20 caractères')
    .max(20, 'min 2 caractères, max 20 caractères')
    .matches(/^[A-Za-z -éèâëê]+[^0-9]+$/, 'Nom invalide')
    .required('Nom requis'),
  phone: yup
    .string()
    .min(10, 'min 10 chiffres')
    .max(10, 'max 10 chiffres')
    .required('Téléphone requis')
});

export interface User extends yup.InferType<typeof userValidationYup> {}

export const userLoginValidationYup = yup.object().shape({
  email: yup
    .string()
    .email('Email valide requis')
    .required('Email requis'),
  password: yup
    .string()
    .min(12, 'min 12 caractères')
    .required('Mot de passe requis')
});

export interface UserLogin extends yup.InferType<typeof userLoginValidationYup> {}
