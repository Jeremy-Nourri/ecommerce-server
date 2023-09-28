import { Request, Response } from "express";
import { prisma } from "../libs/prisma";


export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(product);
};

