import { type Request, type Response, type NextFunction, Router } from 'express';
import { loginUser, createUser, updateUser, deleteUser } from '../controllers/userController';
import authToken from '../middlewares/authToken';
import validateNewUser from '../middlewares/validateNewUser';
import validateLoginUser from '../middlewares/validateLoginUser';

const userRouter = Router();

// using void because return value and errors are handling in the function

userRouter.post('/signup',
  (req: Request, res: Response, next: NextFunction) => {
    void validateNewUser()(req, res, next);
  },
  (req: Request, res: Response) => {
    void createUser(req, res);
  });

userRouter.post('/login',
  (req: Request, res: Response, next: NextFunction) => {
    void validateLoginUser()(req, res, next);
  },
  (req: Request, res: Response) => {
    void loginUser(req, res);
  }
);

userRouter.put('/update', authToken, (req: Request, res: Response) => {
  void updateUser(req, res);
});

userRouter.delete('/delete', authToken, (req: Request, res: Response) => {
  void deleteUser(req, res);
});

export default userRouter;
