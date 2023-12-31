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

export const getProductByName = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.params;
    const product = await prisma.product.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        price: true,
        shortDescription: true,
        fullDescription: true,
        composition: true,
        parfum: true,
        weight: true,
        category: {
          select: {
            name: true
          }
        },
        pictures: {
          select: {
            id: true,
            url: true
          }
        }
      }

    });

    if (product == null) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get product' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.params;
    const products = await prisma.product.findMany({
      where: {
        category: {
          name
        }
      },
      select: {
        id: true,
        name: true,
        price: true,
        shortDescription: true,
        fullDescription: true,
        composition: true,
        parfum: true,
        weight: true,
        pictures: {
          select: {
            id: true,
            url: true
          }
        }
      }
    });

    if (products == null) {
      return res.status(404).json({ error: 'Products not found' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get products' });
  }
};
