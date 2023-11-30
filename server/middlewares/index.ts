import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';
import { IUser } from '../types';

interface RequestWithUser extends Request {
  identity: IUser;
}

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id');

    if (currentUserId === undefined) {
      return res.sendStatus(403);
    }

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if ((currentUserId as string).toString() !== id) {
      return res.sendStatus(403);
    }

    next();
    return;
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['CookieFamiGO'];
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

// should be used after isAuthenticated middleware
export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identity } = req as RequestWithUser;
    const { username } = req.cookies;

    if (identity.username !== username) {
      res.status(401).end(); // 401 Unauthorized
    }

    return next();
  } catch (error) {
    res.status(400).end();
  }
};

export const cookiesOK = async (_req: Request, res: Response) => {
  res.sendStatus(200);
};
