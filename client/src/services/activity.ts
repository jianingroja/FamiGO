const BASE_URL = import.meta.env.VITE_BASE_URL;

import { Activity, IFormInput, ISavedActivity } from '../types/activity';

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

    return data;
  } catch (error) {
    return;
  }
};

export const getActivity = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/get-activity/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    const { activityInfo } = data;

    return activityInfo;
  } catch (error) {
    console.error(error);
  }
};

export const saveActivityInProfile = async (
  username: string,
  activityID: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/savepost-in-user/${username}/${activityID}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveLike = async (username: string, activityID: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/save-like/${username}/${activityID}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLikes = async (username: string, activityID: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/check-like/${username}/${activityID}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    const { value: hasLiked } = data;

    return hasLiked;
  } catch (error) {
    console.error(error);
  }
};

export const publishComment = async (
  username: string,
  activityID: string,
  text: string
) => {
  const commentObject = {
    username: username,
    activityID: activityID,
    text: text,
  };
  try {
    const url = `${BASE_URL}/post-comment`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(commentObject),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const getComments = async (activityID: string) => {
  try {
    const response = await fetch(`${BASE_URL}/get-comments/${activityID}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    const { comments } = data;

    return comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postGeneratedActivity = async (data: IFormInput): Promise<any> => {
  try {
    const url = `${BASE_URL}/generator`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await response.json();
    return content;
  } catch (error) {
    console.error('Error', error);
    return;
  }
};

export const saveActivity = async (activity: ISavedActivity): Promise<any> => {
  try {
    const url = `${BASE_URL}/save-activity`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });
    return response;
  } catch (error) {
    console.error('Error', error);
  }
};

export const deleteActivity = async (username: string, activityID: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/delete-activity/${username}/${activityID}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in deleteActivity:', error);
    throw error;
  }
};
