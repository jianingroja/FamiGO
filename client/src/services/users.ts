import { IUser, UserInfoUpdate, CollectionResponseData } from '../types/user';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserCollectionByType = async (
  username: string,
  type: string,
  signal?: AbortSignal
) => {
  try {
    const url = `${BASE_URL}/collection/${username}/${type}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      signal,
    });

    const data = (await response.json()) as CollectionResponseData;
    const { collection } = data;

    return collection;
  } catch (error) {
    console.error('get user coll client service err-->', error);
    throw error;
  }
};

// plain info
export const getUserPlainInfo = async (username: string) => {
  try {
    const url = `${BASE_URL}/user/${username}`;

    // get the info of cookie user
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as IUser;
    return data;
  } catch (error) {
    console.error('get plain user info client err -->', error);
    throw error;
  }
};

export const updateUserInfo = async (
  username: string,
  updates: UserInfoUpdate
) => {
  try {
    const url = `${BASE_URL}/profile/${username}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers,
      body: JSON.stringify(updates),
    });

    const data = (await response.json()) as IUser;
    return data;
  } catch (error) {
    console.error('Error in updateUserInfo', error);
    throw error;
  }
};

export const handleRelationship = async (
  receiver: string,
  follower: string,
  type: string
) => {
  try {
    const url = `${BASE_URL}/user/${receiver}/${type}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const res = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        follower,
      }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getFollowers = async (username: string) => {
  try {
    const url = `${BASE_URL}/get-followers/${username}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting followers', error);
    throw error;
  }
};

export const getFollowing = async (username: string) => {
  try {
    const url = `${BASE_URL}/get-following/${username}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting followers', error);
    throw error;
  }
};
