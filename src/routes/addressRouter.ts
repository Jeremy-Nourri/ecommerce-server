import { type Request, type Response, Router, type NextFunction } from 'express';
import authToken from '../middlewares/authToken';
import validateAddress from '../middlewares/validateAddress';
import {
  getAddressByUser,
  createAddress,
  updateAddress,
  deleteAddress
} from '../controllers/addressController';

const addressRouter = Router();

// using void because return value and errors are handling in the function

addressRouter.get('/address',
  authToken,
  (req: Request, res: Response) => {
    void getAddressByUser(req, res);
  }
);

addressRouter.post('/address/create',
  authToken,
  (req: Request, res: Response, next: NextFunction) => {
    void validateAddress()(req, res, next);
  },
  (req: Request, res: Response) => {
    void createAddress(req, res);
  }
);

addressRouter.put('/address/update',
  authToken,
  (req: Request, res: Response, next: NextFunction) => {
    void validateAddress()(req, res, next);
  },
  (req: Request, res: Response) => {
    void updateAddress(req, res);
  }
);

addressRouter.delete('/address/delete/:id',
  authToken,
  (req: Request, res: Response) => {
    void deleteAddress(req, res);
  }
);

export default addressRouter;
