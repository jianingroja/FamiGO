import express from 'express';
import {
  createUser,
  getUserByEmail,
  getUserByUserName,
  getUsers,
  getUserById,
} from '../models/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user || !user.authentication) {
      return res.sendStatus(400);
    }

    const expectedHash = user.authentication.salt
      ? authentication(user.authentication.salt, password)
      : null;

    // if (!user) {
    //   return res.sendStatus(400);
    // }

    // const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('TEST', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUserEmail = await getUserByEmail(email);
    const existingUserName = await getUserByUserName(username);

    if (existingUserEmail || existingUserName) {
      return res.sendStatus(400);
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

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updateUsername = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user!.username = username;
    await user!.save();
    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
