import { FeedActivity, FeedResponseData } from '../types/feed';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getFeed = async (): Promise<FeedActivity[] | null> => {
  try {
    const url = `${BASE_URL}/feed`;
    const res = await fetch(url, { credentials: 'include' });

    const data = (await res.json()) as FeedResponseData;
    console.log('feed data -->', data);

    const { activities } = data;

    return activities;
  } catch (error) {
    console.log('get feed errrr -->', error);

    return null;
  }
};
