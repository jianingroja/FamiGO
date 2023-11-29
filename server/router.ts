import { Router } from 'express';
import multer from 'multer';
import {
  login,
  register,
  updateUserAvatar,
  updateUsername,
  updatePassword,
  getUserInfo,
  googleLogin,
} from './controllers/users';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from './controllers/cloudinary';
import { getAllUsers } from './middlewares/users';
import { cookiesOK, isAuthenticated, isOwner } from './middlewares';

import {
  getUserData,
  publishActivity,
  saveActivity,
  getPostsForFeed,
  getActivity,
  getPostsByFilter,
} from './controllers/activity';
import { generateActivity } from './controllers/generateActivity';

const router = Router();

//Users
router.post('/register', register);
router.post('/login', login);
router.post('/login/google', googleLogin);
router.get('/users', isAuthenticated, getAllUsers);
router.put('/users/:id', isAuthenticated, isOwner, updateUserAvatar);
router.put(
  '/users/user_username/:id',
  isAuthenticated,
  isOwner,
  updateUsername
);
router.put(
  '/users/user_password/:id',
  isAuthenticated,
  isOwner,
  updatePassword
);

router.get('/api/check-auth', isAuthenticated, cookiesOK);

//get User Info (Posts and Stats)
router.get('/profile/:id', isAuthenticated, getUserInfo, getUserData);

//get posts from feed
router.get('/feed', isAuthenticated, getPostsForFeed, getPostsByFilter);

//Activities
router.post('/save-activity', saveActivity);
router.post('/publish-activity', isAuthenticated, publishActivity);
router.get('/get-activity/:id', isAuthenticated, getActivity);
const upload = multer();
router.post('/image', upload.any(), uploadToCloudinary);
router.delete('/image/:publicId', deleteFromCloudinary);

router.post('/generator', generateActivity);
router.get('/generator', generateActivity);

export default router;
