import { getActivitiesByID } from '../models/activity';
import { getUserById } from '../models/users';
import { UsersData } from '../types/user';

export async function iterateIDs(userIDs: string[]) {
  const usersData: { [key: string]: any }[] = [];

  for (const userID of userIDs) {
    const User = await getUserById(userID);

    if (User) {
      usersData.push({ [userID]: User });
    }
  }

  return usersData;
}

export function getAllPostsIDs(usersData: UsersData[]): string[] {
  let allPosts: string[] = [];

  usersData.forEach((user) => {
    const userId = Object.keys(user)[0];
    const userPosts = user[userId].statistics.posts;
    allPosts = allPosts.concat(userPosts);
  });

  return allPosts;
}

export async function iterateActivities(activities: string[]) {
  const listOfActivities: { [key: string]: any }[] = [];

  for (const activityId of activities) {
    const activity = await getActivitiesByID(activityId);

    if (activity) {
      listOfActivities.push(activity);
    }
  }

  return listOfActivities;
}

export async function iterateActivitiesFromUser(activities: string[]) {
  const userActivities: { [key: string]: any }[] = [];

  for (const activityId of activities) {
    const activity = await getActivitiesByID(activityId);

    if (activity) {
      userActivities.push({ [activityId]: activity });
    }
  }

  return userActivities;
}
