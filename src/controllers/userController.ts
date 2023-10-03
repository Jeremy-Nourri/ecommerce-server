import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';
import { type Request, type Response } from 'express';
import signToken from '../utils/signToken';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        hashedPassword: true,
        createdAt: true
      }
    });

    if (user == null) {
      res.status(400).json('Email or password is wrong');
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);

    if (!validPassword) {
      res.status(400).json('Email or password is wrong');
      return;
    }

    const token = signToken(user.id);

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    });

    if (userExists != null) {
      res.status(400).json('Email already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.create({
      data: {
        email: req.body.email,
        hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
      }
    });

    res.status(200).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.update({
      where: {
        id: Number(userId)
      },
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        hashedPassword
      }
    });

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createUser: user.createdAt
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    });
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0)
    });

    res.json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
