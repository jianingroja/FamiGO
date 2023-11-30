import {
  FeedActivity,
  FeedResponseData,
  FiltersWithOptions,
} from '../types/feed';

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

export const getFilteredFeed = async (
  filters: FiltersWithOptions
): Promise<FeedActivity[] | void> => {
  try {
    const url = `${BASE_URL}/feed`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(filters),
      credentials: 'include',
    });

    // json stringify will take out the undefined property
    // only given filters will be included in the body

    const data = (await res.json()) as FeedResponseData;
    console.log('filtered data -->', data);

    const { activities } = data;

    return activities;
  } catch (error) {
    console.log('get filter errrr -->', error);
    return;
  }
};
