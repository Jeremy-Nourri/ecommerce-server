import { type Request, type Response, Router } from 'express';
import { getCartByUser, createCartWithProducts } from '../controllers/cartController';

const cartRouter = Router();

// using void because return value and errors are handling in the function

cartRouter.get('/cart', (req: Request, res: Response) => {
  void getCartByUser(req, res);
});

cartRouter.post('/cart/create', (req: Request, res: Response) => {
  void createCartWithProducts(req, res);
});

export default cartRouter;
