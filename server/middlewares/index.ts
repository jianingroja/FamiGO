import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // extract cookie
    const sessionToken = req.cookies['TEST'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id');

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if ((currentUserId as string).toString() !== id) {
      return res.sendStatus(403);
    }

    next();
    return;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
