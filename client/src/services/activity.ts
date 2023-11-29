const BASE_URL = import.meta.env.VITE_BASE_URL;

import { Activity } from '../types/activity';

export const publishActivity = async (info: Activity) => {
  try {
    const activity = {
      ...info,
    };

    const url = `${BASE_URL}/publish-activity`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activity }),
    });

    if (res.status !== 201) {
      throw 'published failed';
    }

    const data = await res.json();
    console.log('data returned -->', data);

    return data;
  } catch (error) {
    console.log('publish activity errrr -->', error);
    return;
  }
};
