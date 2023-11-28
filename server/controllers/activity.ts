import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { getActivitiesByID, getActivitiesFromUser } from '../models/activity';
import { ActivityModel } from '../models/activity';

export const publishActivity = async (req: Request, res: Response) => {
  try {
    const activityBody = req.body;
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);

    activityBody.userInfo.username = user!.username;

    const activity = await new ActivityModel(activityBody).save();
    console.log(user?.statistics?.posts);
    console.log(activity);
    const activityID = await ActivityModel.findById(activity._id);

    if (user && activityID) {
      user.statistics ??= {};
      user.statistics.posts ??= [];
      user.statistics.posts.push(activityID._id.toString());

      await user!.save();

      res.json(activity).status(200);
      return;
    }
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getUserData = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const username = user?.username;

    const activitiesFromUser = await getActivitiesFromUser(username);

    const arrayToName: { [key: string]: any }[] = [];

    async function iterateActivities(activities: string[]) {
      for (const activityId of activities) {
        const activity = await getActivitiesByID(activityId);

        if (activity !== null) {
          arrayToName.push({ [activityId]: activity });
        }
      }
    }

    await iterateActivities(activitiesFromUser!.statistics!.posts!);
    res.json({ user: user, activities: arrayToName }).status(200);
    return;
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const saveActivity = async (req: Request, res: Response) => {
  try {
    const savedActivityBody = req.body;

    const username = req.cookies['username'];
    const user = await getUserByUserName(username);
    savedActivityBody.userInfo.username = user!.username;

    const activity = await new ActivityModel(savedActivityBody).save();
    return res.status(200).json(activity);
  } catch (error) {
    console.error('Error saving activity:', error);
    return res.sendStatus(400).send(error);
  }
};
