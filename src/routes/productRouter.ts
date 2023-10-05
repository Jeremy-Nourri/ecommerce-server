import { type Request, type Response, Router } from 'express';
import { getProducts, getProductById, getProductsByCategory } from '../controllers/productController';

const productRouter = Router();

// using void because return value and errors are handling in the function

productRouter.get('/products', (req: Request, res: Response) => {
  void getProducts(req, res);
});

productRouter.get('/product/:id', (req: Request, res: Response) => {
  void getProductById(req, res);
});

productRouter.get('/category/:name', (req: Request, res: Response) => {
  void getProductsByCategory(req, res);
});

export default productRouter;
