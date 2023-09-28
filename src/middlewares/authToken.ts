import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../libs/prisma";

import getErrorMessage from "../utils/getErrorMessage";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies;
  const accessToken = cookie.accessToken;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json("Access token not found");
  }

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

    if (typeof payload === 'string') {
      return res.status(401).json("Token is not valid");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(404).json("User not found");
    } else {
      res.locals.user = user;
      next();
    }

  } catch (error) {
    return res.status(401).json(getErrorMessage(error));
  }
}

export default authToken;
