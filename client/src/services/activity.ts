const BASE_URL = 'http://localhost:3000';

import { Activity } from '../types/activity';

export const publishActivity = async (info: Activity) => {
  try {
    const activity = {
      ...info,
    };

    const url = `${BASE_URL}/publish-activity`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    // todo
    // save data to redux, go to feed, render  new activity

    return;
  } catch (error) {
    console.log('publish activity errrr -->', error);
  }
};
