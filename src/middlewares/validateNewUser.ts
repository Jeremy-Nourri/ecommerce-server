import { type Request, type Response, type NextFunction } from 'express';
import getErrorMessage from '../utils/getErrorMessage';
import { userValidationYup } from '../libs/yup/userValidation';

const validateNewUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Validating new user data:', req.body);
    await userValidationYup.validate(req.body);
    console.log('Validation successful');
    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json(getErrorMessage(error));
  }
};

export default validateNewUser;
