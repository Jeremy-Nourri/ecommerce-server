import { type Request, type Response, type NextFunction } from 'express';

import addressValidationYup from '../libs/yup/addressValidation';

const validateAddress = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await addressValidationYup.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: 'Validation error', details: error });
  }
};

export default validateAddress;
