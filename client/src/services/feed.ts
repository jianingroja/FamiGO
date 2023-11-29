import { FeedActivity, FeedResponseData } from '../types/feed';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// only random feed now
export const getFeed = async (): Promise<FeedActivity[] | void> => {
  try {
    const url = `${BASE_URL}/feed`;
    const res = await fetch(url);
    // const res = fetch('url', { credentials: 'include' });

    const data = (await res.json()) as FeedResponseData;
    console.log('feed data -->', data);

    const { randomActivities } = data;

    return randomActivities;
  } catch (error) {
    console.log('get feed errrr -->', error);
    return;
  }
};
