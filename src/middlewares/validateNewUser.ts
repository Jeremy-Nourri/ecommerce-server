import { type Request, type Response, type NextFunction } from 'express';
import { userValidationYup } from '../libs/yup/userValidation';

const validateNewUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Validating new user data:', req.body);
    await userValidationYup.validate(req.body);
    console.log('Validation successful');
    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Validation error', details: error });
  }
};

export default validateNewUser;
