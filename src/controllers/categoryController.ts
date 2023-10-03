import { type Request, type Response } from 'express';
import { prisma } from '../libs/prisma';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.category.findMany();

    if (categories == null) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get categories' });
  }
};

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryName } = req.params;
    const category = await prisma.category.findFirst({ where: { name: categoryName } });

    if (category == null) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get category' });
  }
};
