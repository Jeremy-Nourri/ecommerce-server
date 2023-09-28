import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController';
import authToken from '../middlewares/authToken';

const router = Router();

router.route('/user')
  .post(createUser);

router.route('/user/:id')
  .get(authToken, getUser)
  .put(authToken, updateUser)
  .delete(authToken, deleteUser);

export default router;