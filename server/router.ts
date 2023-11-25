import { Router } from 'express';
import {
  register,
  login,
  getAllUsers,
  updateUsername,
  updatePassword,
} from './controllers/users';
import { isAuthenticated, isOwner } from './middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', isAuthenticated, getAllUsers);
router.put('/users/:id', isAuthenticated, isOwner, updateUsername);
router.put('/users/:id', isAuthenticated, isOwner, updatePassword);

export default router;
