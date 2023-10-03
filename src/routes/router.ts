import { Router } from 'express';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import productRouter from './productRouter';

const router = Router();

router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter);

export default router;
