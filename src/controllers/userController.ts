import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';
import { type Request as ExpressRequest, type Response } from 'express';
import signToken from '../utils/signToken';

interface Request extends ExpressRequest {
  locals: {
    userId: string
  }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.locals;

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId)
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true
      }
    });

    if (user == null) {
      return res.status(404).json('User not found');
    }

    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not found' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
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
      return res.status(401).json('Email or password is wrong');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);

    if (!validPassword) {
      return res.status(401).json('Email or password is wrong');
    }

    const token = signToken(user.id);

    if (token == null) {
      return res.status(500).json({ message: 'Unknown server error, user not logged in' });
    }

    res.cookie('accessToken', token, {
      httpOnly: true
      // secure: true,
      // sameSite: 'none'
    });

    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not logged in' });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true
      // secure: true,
      // sameSite: 'none'
    });

    return res.status(200).json('User logged out');
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not logged out' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    });

    if (userExists != null) {
      return res.status(409).json('Email already exists');
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

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not created' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
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

    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createUser: user.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not updated' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;

    await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    });
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.json('User deleted');
  } catch (error) {
    return res.status(500).json({ message: 'Unknown server error, user not deleted' });
  }
};
