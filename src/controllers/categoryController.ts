import { Request, Response } from "express";
import { prisma } from "../libs/prisma";


export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(category);
};