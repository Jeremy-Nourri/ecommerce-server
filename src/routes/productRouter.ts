import { type Request, type Response, Router } from 'express';
import { getProducts, getProductByName, getProductsByCategory } from '../controllers/productController';

const productRouter = Router();

// using void because return value and errors are handling in the function

productRouter.get('/products', (req: Request, res: Response) => {
  void getProducts(req, res);
});

productRouter.get('/product/:name', (req: Request, res: Response) => {
  void getProductByName(req, res);
});

productRouter.get('/category/:name', (req: Request, res: Response) => {
  void getProductsByCategory(req, res);
});

export default productRouter;
