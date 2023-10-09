import { type Request, type Response, type NextFunction } from 'express';

const credentials = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;
  if (origin === 'http://localhost:3000') {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export default credentials;
