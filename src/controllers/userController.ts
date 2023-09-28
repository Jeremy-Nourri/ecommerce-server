import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;



  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
}

export const createUser = async (req: Request, res: Response) => {


  const userExist = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (userExist) {
    return res.status(400).json("Email already exists");
  }


  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json(err);
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        hashedPassword: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      },
    });
    const token = jwt.sign(
      { 
        id: user.id 
      }, 
      process.env.ACCESS_TOKEN_SECRET!, 
      { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
      }
    );
    res.cookie('accessToken', token, {
       httpOnly: true,
       secure: true,
       sameSite: 'none',
      });      
  });




export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: req.body.email,
      hashedPassword: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    },
  });
  res.json(user);
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
}

