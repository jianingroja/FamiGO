import { Request, Response } from 'express';
// import { Document } from 'mongoose';
import crypto from 'crypto';
// import bcrypt from 'bcrypt';
import sendResetEmail from '../utils/sendResetEmail';
import { OAuth2Client } from 'google-auth-library';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUserName,
  UserModel,
} from '../models/users';
import { random, authentication } from '../helpers';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );
    if (!user) {
      return res.status(400).send({ message: 'user does not exist' });
    }

    const expectedHash = authentication(user.authentication!.salt!, password);
    if (user.authentication!.password != expectedHash) {
      return res.status(403).send({ message: 'incorrect password' });
    }

    const salt = random();
    user.authentication!.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    // domain is set to undefined in production
    res.cookie('CookieFamiGO', user.authentication!.sessionToken, {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });

    res.cookie('username', user.username, {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400);
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  try {
    console.log('Google login request received');
    const { token } = req.body;
    console.log('Token received:', token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log('Token verified');

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    console.log('Checking user in database', payload.email);
    let user = await getUserByEmail(payload.email as string);
    console.log('User from database', user);

    if (!user) {
      const salt = random();
      const newUser = new UserModel({
        email: payload.email,
        username: payload!.email!.split('@')[0],
        authentication: {
          salt: salt,
          password: authentication(salt, 'defaultPassword'),
        },
      });

      user = await newUser.save();
    }

    const newSessionToken = authentication(
      user!.authentication!.salt!,
      user!._id.toString()
    );
    user!.authentication!.sessionToken = newSessionToken;
    await user!.save();

    res.cookie('CookieFamiGO', user.authentication!.sessionToken, {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });

    res.cookie('username', user.username, {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });

    return res.status(200).json({ user: user, token: newSessionToken });
  } catch (error) {
    console.error('Error in googleLogin:', error);
    return res.status(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const existingUserEmail = await getUserByEmail(email);
    const existingUserName = await getUserByUserName(username);

    if (existingUserEmail || existingUserName) {
      return res.status(400).send({ message: 'user already exist' });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { newUsername, avatar, description, password } = req.body;

    const user = await getUserByUserName(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (newUsername) user.username = newUsername;
    if (avatar) user.avatar = avatar;
    if (description) user.description = description;
    if (password) {
      const salt = random();
      user.authentication!.salt! = salt;
      user.authentication!.password! = authentication(salt, password);
      await user.save();
    }

    await user.save();
    if (newUsername) {
      res.cookie('username', newUsername, {
        domain: process.env.COOKIE_DOMAIN || undefined,
        secure: true,
        sameSite: 'none',
        path: '/',
        httpOnly: true,
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const newSalt = random();
    const hashedPassword = authentication(newSalt, password);

    user.authentication!.salt = newSalt;
    user.authentication!.password = hashedPassword;

    await user.save();

    return res.status(200).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await getUserByUserName(username);

    if (user) {
      return res.status(200).send(user);
    } else {
      throw new Error('can not find error');
    }
  } catch (error) {
    console.error('getUserInfo err -->', error);
    return res.sendStatus(400);
  }
};

export const followAndUnfollow = async (req: Request, res: Response) => {
  try {
    const { usernameToFollow, usernameFollowing } = req.body;

    const userToFollow = await getUserByUserName(usernameToFollow);
    const userFollowing = await getUserByUserName(usernameFollowing);

    const userToFollowID = userToFollow?._id?.toString();
    const userFollowingID = userFollowing?._id?.toString();

    console.log(userToFollowID, userFollowingID);

    if (userToFollow?.statistics?.followers?.includes(userFollowingID || '')) {
      await UserModel.findOneAndUpdate(
        { username: usernameFollowing },
        { $pull: { 'statistics.following': userToFollowID } },
        { new: true }
      );

      await UserModel.findOneAndUpdate(
        { username: usernameToFollow },
        { $pull: { 'statistics.followers': userFollowingID } },
        { new: true }
      );
    } else {
      await UserModel.findOneAndUpdate(
        { username: usernameFollowing },
        { $push: { 'statistics.following': userToFollowID } },
        { new: true }
      );
      await UserModel.findOneAndUpdate(
        { username: usernameToFollow },
        { $push: { 'statistics.followers': userFollowingID } },
        { new: true }
      );
    }

    return res.status(200).json({ userToFollow, userFollowing });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const checkFollowing = async (req: Request, res: Response) => {
  try {
    const { usernameFollowing, usernameToFollow } = req.params;
    const userFollowingData = await getUserByUserName(usernameFollowing);
    const userToFollowData = await getUserByUserName(usernameToFollow);

    const userFollowingID = userFollowingData?._id.toString();

    if (
      userToFollowData?.statistics?.followers?.includes(userFollowingID || '')
    ) {
      return res.status(200).json({ following: true });
    } else {
      return res.status(200).json({ following: false });
    }
  } catch (error) {
    return res.status(403).end();
  }
};

export const toggleRelationship = async (req: Request, res: Response) => {
  try {
    const { username, relationship } = req.params;
    const { follower: followerName } = req.body;

    const receiver = await getUserByUserName(username);
    const follower = await getUserByUserName(followerName);

    if (relationship === 'follow') {
      receiver?.statistics?.followers?.push(follower?.id);
      follower?.statistics?.following?.push(receiver?.id);

      await receiver?.save();
      await follower?.save();

      return res.status(201).send({ receiver, user: follower });
    }

    if (relationship === 'unfollow') {
      const receiver = await UserModel.findOneAndUpdate(
        { username: username },
        { $pull: { 'statistics.followers': follower?.id } },
        { new: true }
      );

      const user = await UserModel.findOneAndUpdate(
        { username: followerName },
        { $pull: { 'statistics.following': receiver?.id } },
        { new: true }
      );

      return res.status(201).send({ receiver, user });
    }

    return;
  } catch (error) {
    res.status(500).send(error);
    throw error;
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie('CookieFamiGO', {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });
    res.clearCookie('username', {
      domain: process.env.COOKIE_DOMAIN || undefined,
      secure: true,
      sameSite: 'none',
      path: '/',
      httpOnly: true,
    });

    res.status(200).end();
  } catch (error) {
    res.status(400).json({ ERROR: error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await user.save();

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    await sendResetEmail(email, resetLink);

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    const newSalt = random();

    const hashedPassword = authentication(newSalt, newPassword);

    user.authentication!.password = hashedPassword;
    user.authentication!.salt = newSalt;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password successfully changed' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
