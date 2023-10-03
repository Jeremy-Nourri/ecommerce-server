import { type Request, type Response } from 'express';
import { prisma } from '../libs/prisma';
import { type Address } from '@prisma/client';

export const getAddressByUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;
    const address = await prisma.address.findMany({ where: { userId: Number(userId) } });
    return res.json(address);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot get address' });
  }
};

export const createAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, number, street, city, zipCode, country }: Address = req.body;
    const address = await prisma.address.create({
      data: {
        userId: Number(userId),
        number,
        street,
        city,
        zipCode,
        country
      }
    });
    return res.json(address);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot create address' });
  }
};

export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, number, street, city, zipCode, country }: Address = req.body;
    const address = await prisma.address.update({
      where: { userId: Number(userId) },
      data: {
        number,
        street,
        city,
        zipCode,
        country
      }
    });
    return res.json(address);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot update address' });
  }
};

export const deleteAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;
    await prisma.address.delete({ where: { userId: Number(userId) } });
    return res.json({ message: 'Address deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Cannot delete address' });
  }
};
