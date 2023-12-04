import { Request, Response } from 'express';
import { getUserByUserName } from '../models/users';
import { getActivitiesByID } from '../models/activity';
import { ActivityModel, createActivity } from '../models/activity';
import {
  iterateIDs,
  getAllPostsIDs,
  iterateActivities,
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
    const activityInfo = await getActivitiesByID(id);
    return res.json({ activityInfo }).status(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getUserCollectionByType = async (req: Request, res: Response) => {
  try {
    const { username, type } = req.params;
    const user = await getUserByUserName(username);

    let collectionId;
    switch (type) {
      case 'mine':
        collectionId = user?.statistics?.posts;
        break;
      case 'others':
        collectionId = user?.savedPosts;
        break;
      case 'ai':
        collectionId = user?.savedAIPosts;
        break;

      default:
        break;
    }

    const collection = await iterateActivities(collectionId as string[]);
    collection.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    res.status(200).send({ collection });
    return;
  } catch (error) {
    console.log('get collection by type err -->', error);
    res.status(500).end();
    throw error;
  }
};

export const saveActivity = async (req: Request, res: Response) => {
  try {
    const savedActivityBody = req.body;
    const username = savedActivityBody.userInfo.username;
    const user = await getUserByUserName(username);
    const activity = await createActivity(savedActivityBody);
    const activityID = activity.id;
    if (user && activityID) {
      user.savedAIPosts ??= [];
      user.savedAIPosts.push(activityID);
      await user.save();
      res.status(201).send(activity);
    }
    return;
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
        {
          $match: {
            type: 'published',
          },
        },
        { $sample: { size: limit } },
      ]);

      const result = activities.filter(
        (activity) => activity.userInfo?.username !== username
      );

      res.json({ activities: result }).status(200);
    }
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
};

interface FilterOption {
  label: string;
  value: string;
}

interface FilterCriteria {
  topic?: FilterOption;
  numOfKids?: FilterOption;
  age?: FilterOption;
  difficulty?: FilterOption;
  place?: FilterOption;
  duration?: FilterOption;
}

export const getPostsByFilter = async (req: Request, res: Response) => {
  try {
    const filters: FilterCriteria = req.body;
    const { username } = req.cookies;

    let query: Record<string, any> = {};

    if (filters) {
      Object.entries(filters).forEach(([key, { value }]) => {
        query[`filters.${key}`] = value;
      });
    }

    console.log('query -->', query);

    const limit = 20;
    const filteredActivities = await ActivityModel.find(query)
      .find({ type: 'published' })
      .limit(limit);

    const result = filteredActivities.filter(
      (activity) => activity.userInfo?.username !== username
    );
    console.log('filteredActivities -->', result);

    res.status(200).json({ activities: result });
  } catch (error) {
    console.error('Error fetching filtered posts:', error);
    res.status(500).send('Error fetching posts');
  }
};
