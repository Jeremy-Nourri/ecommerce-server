import { type Request, type Response } from 'express';
import { prisma } from '../libs/prisma';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get categories' });
  }
};

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id: Number(id) } });
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get category' });
  }
};
