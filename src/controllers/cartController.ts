import { type Request, type Response } from 'express';
import { prisma } from '../libs/prisma';
import { type Product } from '@prisma/client';

export const getCartByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    const cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: { products: true }
    });

    if (cart == null) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cannot get cart' });
  }
};

export const createCartWithProducts = async (req: Request, res: Response): Promise<void> => {
  const { userId, products } = req.body;

  try {
    await prisma.cart.create({
      data: {
        userId: Number(userId),
        products: {
          create: products.map((product: Product) => ({
            name: product.name,
            price: product.price
          }))
        }
      }
    });

    res.status(201).json({ message: 'Cart created with products' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cannot create cart with products' });
  }
};
