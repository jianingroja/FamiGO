import { Router } from 'express';
import multer from 'multer';
import {
  login,
  register,
  updatePassword,
  getUserInfo,
  googleLogin,
  updateUserInfo,
  toggleRelationship,
  logout,
  forgotPassword,
  resetPassword,
  getFollowers,
  getFollowing,
} from './controllers/users';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from './controllers/cloudinary';
import { getAllUsers } from './middlewares/users';
import {
  isAuthenticated,
  isOwner,
  isAuthorized,
  isOwnerEdit,
} from './middlewares/index';

import {
  publishActivity,
  saveActivity,
  getPostsForFeed,
  getActivity,
  getPostsByFilter,
  getUserCollectionByType,
} from './controllers/activity';
import { generateActivity } from './controllers/generateActivity';
import {
  checkLike,
  createComment,
  getComments,
  likeActivity,
  saveActivityInProfile,
  deleteActivity,
} from './controllers/activityInteraction';

const router = Router();

//Users
router.post('/register', register);
router.post('/login', login);
router.post('/login/google', googleLogin);
router.get('/users', isAuthenticated, getAllUsers);

router.put(
  '/users/user_password/:id',
  isAuthenticated,
  isOwner,
  updatePassword
);
router.put('/profile/:username', isAuthenticated, isOwnerEdit, updateUserInfo);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//get posts from feed
router.get('/feed', isAuthenticated, isAuthorized, getPostsForFeed);
router.post('/feed', getPostsByFilter);

//Activities
router.post('/save-activity', saveActivity);
router.post('/publish-activity', isAuthenticated, publishActivity);
router.get('/get-activity/:id', isAuthenticated, getActivity);

// cloudinary
const upload = multer();
router.post('/image', upload.any(), uploadToCloudinary);
router.delete('/image/:publicId', deleteFromCloudinary);

router.post('/generator', generateActivity);
router.get('/generator', generateActivity);

// interactions
router.post('/savepost-in-user/:username/:id', saveActivityInProfile);
router.post('/save-like/:username/:id', likeActivity);
router.get('/check-like/:username/:id', checkLike);

// get plain user info
router.get('/user/:username', isAuthenticated, getUserInfo);
router.post('/post-comment', createComment);
router.get('/get-comments/:activityID', getComments);

router.post('/user/:username/:relationship', toggleRelationship);

router.get(
  '/collection/:username/:type',
  isAuthenticated,
  getUserCollectionByType
);

router.delete('/delete-activity/:username/:id', deleteActivity);

router.get('/logout', isAuthenticated, logout);

router.get('/get-followers/:username', getFollowers);
router.get('/get-following/:username', getFollowing);

export default router;
