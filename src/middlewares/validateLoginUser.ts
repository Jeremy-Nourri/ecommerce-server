import { type Request, type Response, type NextFunction } from 'express';

import { userLoginValidationYup } from '../libs/yup/userValidation';

const validateLoginUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userLoginValidationYup.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: 'Validation error', details: error });
  }
};

export default validateLoginUser;
