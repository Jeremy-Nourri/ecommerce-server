import { type Request as ExpressRequest, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type ProcessEnv from '../@types/env';

interface DecodedJwtPayload extends JwtPayload {
  id: string
}

interface Request extends ExpressRequest {
  locals: {
    userId: string
  }
}

const authToken = (req: Request, res: Response, next: NextFunction): void => {
  const cookie = req.cookies;
  const accessToken = cookie.accessToken;

  if (accessToken === undefined || accessToken === null) {
    res.status(401).json('Access token not found');
  } else {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as ProcessEnv['JWT_SECRET'],
      (err: jwt.VerifyErrors | null, decoded: DecodedJwtPayload) => {
        if (err != null) {
          res.status(401).json({ message: 'Access not authorized' });
        } else {
          req.locals = { userId: decoded.id };
          next();
        }
      }
    );
  }
};

export default authToken;
