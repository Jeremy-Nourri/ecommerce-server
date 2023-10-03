import { type Request, type Response } from 'express';
import { prisma } from '../libs/prisma';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get product' });
  }
};
