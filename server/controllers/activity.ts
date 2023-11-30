import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { getActivitiesByID, getActivitiesFromUser } from '../models/activity';
import { ActivityModel, createActivity } from '../models/activity';
import {
  iterateIDs,
  getAllPostsIDs,
  iterateActivities,
  iterateActivitiesFromUser,
} from '../helpers/activity';

import { ActivityWithUser } from '../types/activity';

export const publishActivity = async (req: Request, res: Response) => {
  try {
    const {
      body: { activity },
    } = req;

    const username = req.cookies['username'];
    const user = await getUserByUserName(username);

    const activityWithUser: ActivityWithUser = {
      ...activity,
      userInfo: {
        username,
      },
    };
    const newActivity = await createActivity(activityWithUser);
    const activityId = newActivity.id;
    console.log('activity id -->', activityId);

    if (user && activityId) {
      user.statistics ??= {};
      user.statistics.posts ??= [];
      user.statistics.posts.push(activityId);

      await user.save();

      res.status(201).send(newActivity); // 201 created
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const activityInfo = await getActivitiesByID(id);
    console.log(activityInfo);
    return res.json({ activityInfo }).status(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getUserData = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const username = user?.username;

    const activitiesFromUser = await getActivitiesFromUser(username);

    const listOfActivities = await iterateActivitiesFromUser(
      activitiesFromUser!.statistics!.posts!
    );
    res.json({ user: user, activities: listOfActivities }).status(200);
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

export const getPostsForFeed = async (req: Request, res: Response) => {
  try {
    const username = req.cookies['username'];
    const user = await getUserByUserName(username);
    const followingUserIDs = user!.statistics!.following!;

    if (followingUserIDs.length > 0) {
      const followingUsersInfo = await iterateIDs(followingUserIDs);

      //iteratee over each object over postsIDs
      const postsIDs = getAllPostsIDs(followingUsersInfo);
      const activities = await iterateActivities(postsIDs);

      //Sort by latest
      activities.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      res.json({ activities });
    }
    //if not following any users goes to else
    else {
      let limit = 20; //will only get 20 posts
      const activities = await ActivityModel.aggregate([
        { $sample: { size: limit } },
      ]);

      res.json({ activities }).status(200);
    }
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};

interface FilterCriteria {
  topic?: {};
  numOfKids?: {};
  age?: {};
  difficulty?: {};
  place?: {};
  duration?: {};
}

export const getPostsByFilter = async (req: Request, res: Response) => {
  try {
    const filters: FilterCriteria = req.body;
    console.log('filters', filters);
    let query: Record<string, any> = {};

    if (filters) {
      Object.entries(filters).forEach(([key, filterObject]) => {
        if (filterObject) {
          query[`filters.${key}`] = filterObject.value;
        }
      });
    }

    const limit = 20;
    console.log('query', query);
    const filteredActivities = await ActivityModel.find(query).limit(limit);
    console.log('filteredActivities', filteredActivities);

    res.status(200).json({ activities: filteredActivities });
  } catch (error) {
    console.error('Error fetching filtered posts:', error);
    res.status(500).send('Error fetching posts');
  }
};
