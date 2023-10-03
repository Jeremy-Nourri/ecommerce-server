import { type Request, type Response, Router } from 'express';
import { getCategories, getCategory } from '../controllers/categoryController';

const categoryRouter = Router();

// using void because return value and errors are handling in the function

categoryRouter.get('/', (req: Request, res: Response) => {
  void getCategories(req, res);
});

categoryRouter.get('/:id', (req: Request, res: Response) => {
  void getCategory(req, res);
});

export default categoryRouter;
